"use client";
import AutoTextarea from "@/components/auto-textarea";
import useTimeStore from "@/components/live/time.store";
import { useTz } from "@/hooks/use-tz";
import { tz, TZDate } from "@date-fns/tz";
import { format, formatISO, isPast, isToday, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { Calendar } from "mono/components/calendar";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "mono/components/tabs";
import { motion } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { createEvent } from "rest-api/calendar";
import type { NewEvent, ScheduleAvailability } from "rest-api/types/calendar";
import { cn } from "yz13/cn";
import { useUserStore } from "./user.store";

export default function form({
  uid,
  className = "",
  availability,
}: {
  uid: string;
  className?: string;
  availability?: ScheduleAvailability;
}) {
  // const currentTime = useTimeStore((state) => state.time);
  const searchParams = useSearchParams();
  const [continueLink] = useQueryState("continue");
  const user = useUserStore((state) => state.user);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useQueryState("date", { shallow: false });
  const [time] = useQueryState("time");
  const timezone = useTz();
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date(), {
    in: tz("UTC"),
  });
  const durations = Object.keys(availability?.availability ?? {});
  const [duration, setDuration] = useState<string | null>(durations[0] ?? null);
  const validateEmail = (email: string): boolean => {
    // Простое регулярное выражение для проверки email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  const handleSelect = (date?: Date) => {
    if (!date) return;
    setDate(format(date, "yyyy-MM-dd"));
  };
  const isValidEmail = validateEmail(email);
  const [loading, setLoading] = useState<boolean>(false);
  const disabled =
    loading ||
    duration === null ||
    time === null ||
    !isValidEmail ||
    name === "" ||
    !user;
  const router = useRouter();
  const handleCreateAppointment = async () => {
    if (!time) return;
    if (!duration) return;
    if (!user) return;
    setLoading(true);
    try {
      const organizer = uid;
      const date_start = new TZDate(parsedDate, timezone);
      const appointmentTime = parse(time, "HH:mm", new Date());
      date_start.setHours(appointmentTime.getHours());
      date_start.setMinutes(appointmentTime.getMinutes());

      const parsedDuration = parse(duration, "HH:mm", new Date());

      let durationMinutes =
        parsedDuration.getMinutes() + parsedDuration.getHours() * 60;

      // Корректируем продолжительность при переходе через полночь
      if (durationMinutes < 0) {
        durationMinutes += 24 * 60; // Добавляем 24 часа в минутах
      }

      // Создаем конечную дату
      const date_end = new TZDate(date_start, timezone);
      date_end.setMinutes(date_start.getMinutes() + durationMinutes);

      const userIdisOrganizer = user.id === organizer;

      const start = formatISO(date_start, {
        in: tz("UTC"),
      })

      const end = formatISO(date_end, {
        in: tz("UTC"),
      })

      const event: NewEvent = {
        date_start: start,
        date_end: end,
        organizer_id: organizer,
        guests: userIdisOrganizer ? [user.id] : [user.id, organizer],
        duration,
        description: note,
        status: "TENTATIVE",
        type: "appointment",
        summary: `Созвон с ${name}`,
      };
      const { data: created } = await createEvent(event);
      if (created) {
        const callPage = `/call/${created.id}${continueLink ? `?continue=${continueLink}` : ""}`;
        router.push(callPage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      if (user.username) setName(user.username);
    }
  }, [user]);
  useEffect(() => {
    if (!date) {
      setDate(defaultDate);
    }
    if (date) {
      const parsedDate = parse(date, "yyyy-MM-dd", new Date(), {
        in: tz(timezone),
      });
      if (isPast(parsedDate)) setDate(defaultDate);
    }
  }, [date]);
  // useEffect(() => {
  //   if (duration) {
  //     setTimeout(() => {
  //       handleDurationScroll();
  //     }, 2000)
  //   }
  // }, [duration]);
  return (
    <>
      <div className={cn("w-full divide-y", className)}>
        <div className="flex divide-x md:flex-row flex-col">
          <div className="md:w-2/3 p-6 w-full space-y-6">
            <Calendar
              disabled={(date) => {
                if (isToday(date)) return false;
                return isPast(date);
              }}
              mode="single"
              className="p-0"
              locale={ru}
              selected={parsedDate}
              onSelect={(date) => handleSelect(date)}
            />
            <Separator />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Имя *</span>
                <Input
                  className="!bg-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">Почта *</span>
                <Input
                  type="email"
                  className="!bg-transparent"
                  aria-invalid={!isValidEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-muted-foreground">
                  Заметка к созвону
                </span>
                <AutoTextarea
                  className="!bg-transparent border rounded-3xl px-3 py-2 min-h-16"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="md:w-1/3 max-h-[75dvh] overflow-auto w-full flex md:flex-col flex-row *:w-full">
            {
              date &&
              <Tabs value={duration ?? undefined} className="gap-0" onValueChange={setDuration}>
                <div className="w-full p-6 overflow-x-auto bg-card md:sticky static top-0 z-10 shrink-0 h-[84px]">
                  <DurationsTabs durations={durations} />
                </div>
                {durations.map((duration) => {
                  const times = availability?.availability[duration] ?? [];
                  return (
                    <TabsContent
                      key={duration}
                      value={duration}
                      className="px-6 pb-6"
                    >
                      <DurationsTimeList times={times} />
                    </TabsContent>
                  );
                })}
              </Tabs>
            }
          </div>
        </div>
        <div className="w-full flex justify-end px-6 py-3">
          <Button onClick={handleCreateAppointment} disabled={disabled}>
            {loading && <Loader2Icon size={16} className="animate-spin" />}
            {loading ? "Подтверждение..." : "Подтвердить"}
          </Button>
        </div>
      </div>
    </>
  );
}


const DurationsTabs = ({ durations }: { durations: string[] }) => {
  return (
    <TabsList className="md:w-fit w-full">
      {durations
        .sort((a, b) => a.localeCompare(b))
        .map((duration) => {
          return (
            <TabsTrigger
              id={duration}
              key={duration}
              value={duration}
            >
              {duration}
            </TabsTrigger>
          );
        })}
    </TabsList>
  )
}

const DurationsTimeList = ({ times }: { times: string[] }) => {
  const currentTime = useTimeStore((state) => state.time);
  const [date] = useQueryState("date");
  const [time, setTime] = useQueryState("time");
  const defaultDate = format(currentTime, "yyyy-MM-dd");
  const timezone = useTz();
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date(), {
    in: tz(timezone),
  });
  const dateIsToday = isToday(parsedDate);
  if (!date) return null;
  return (
    <motion.ul
      className="w-full space-y-3"
    >
      {times.map((availableTime, index) => {
        const currentInUTC = new TZDate(currentTime, "UTC");
        const timeDateString = `${date} ${availableTime}`;
        const currentAsMinutes =
          currentInUTC.getHours() * 60 +
          currentInUTC.getMinutes();
        const parsedAvailableTime = parse(
          timeDateString,
          "yyyy-MM-dd HH:mm",
          new Date(),
          {
            in: tz("UTC")
          }
        );
        const availableTimeAsMinutes =
          parsedAvailableTime.getHours() * 60 +
          parsedAvailableTime.getMinutes();

        const timeDisabled = dateIsToday && currentAsMinutes >= availableTimeAsMinutes;

        // if (timeDisabled) return null;
        const formatted = format(parsedAvailableTime, "HH:mm", {
          in: tz(timezone)
        });
        const selected = formatted === time;
        return (
          <motion.li
            key={availableTime}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              delay: 0.05 * index,
            }}
            className={timeDisabled ? "hidden" : ""}
          >
            <TimeButton
              formatted={formatted}
              disabled={timeDisabled}
              selected={selected}
            />
          </motion.li>
        );
      })}
    </motion.ul >
  )
}
const TimeButton = ({
  formatted,
  disabled = false,
  selected = false
}: {
  selected?: boolean;
  disabled?: boolean;
  formatted: string;

}) => {
  const [_, setTime] = useQueryState("time");

  useEffect(() => {
    if (selected && disabled) setTime(null);
  }, [selected, disabled])
  if (disabled) return null;
  return (
    <Button
      disabled={disabled}
      variant={selected ? "default" : "outline"}
      className="w-full"
      onClick={() => {
        if (selected) setTime(null);
        else setTime(formatted);
      }}
    >
      {formatted}
    </Button>
  )
}
