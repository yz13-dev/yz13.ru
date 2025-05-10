"use client";
import AutoTextarea from "@/components/auto-textarea";
import { useTz } from "@/hooks/use-tz";
import { tz } from "@date-fns/tz";
import { useDebounceEffect } from "ahooks";
import { format, formatISO, parse } from "date-fns";
import { ru } from "date-fns/locale";
import { Loader2Icon } from "lucide-react";
import { Button } from "mono/components/button";
import { Calendar } from "mono/components/calendar";
import { Input } from "mono/components/input";
import { Separator } from "mono/components/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "mono/components/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { createEvent } from "rest-api/calendar";
import { NewEvent, ScheduleAvailability } from "rest-api/types/calendar";
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
  const searchParams = useSearchParams();
  const user = useUserStore((state) => state.user);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const defaultDate = format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useQueryState("date", { shallow: false });
  const timezone = useTz();
  const [time, setTime] = useQueryState("time");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date(), {
    in: tz(timezone),
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
      const date_start = parsedDate;
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
      const date_end = new Date(date_start);
      date_end.setMinutes(date_start.getMinutes() + durationMinutes);

      const event: NewEvent = {
        date_start: formatISO(date_start, {
          in: tz(timezone),
        }),
        date_end: formatISO(date_end, {
          in: tz(timezone),
        }),
        organizer_id: organizer,
        guests: [user.id],
        duration,
        description: note,
        type: "appointment",
        summary: `Созвон с ${name}`,
      };
      console.log(event);
      const { data: created } = await createEvent(event);
      if (created) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleDurationScroll = () => {
    if (!duration) return;
    const target = document.getElementById(duration);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };
  useEffect(() => {
    if (user) {
      if (user.email) setEmail(user.email);
      if (user.username) setName(user.username);
    }
  }, [user]);
  useDebounceEffect(
    () => {
      const url = new URL("/login", "https://yz13.ru");
      const urlSearchParams = url.searchParams;
      searchParams.forEach((value, key) => urlSearchParams.set(key, value));
      urlSearchParams.set(
        "continue",
        `https://calendar.yz13.ru/booking/${uid}`,
      );
      const authLink = url.toString();
      if (!user) router.push(authLink);
    },
    [user, searchParams],
    { wait: 1000 },
  );
  useEffect(() => {
    if (duration) handleDurationScroll();
  }, [duration]);
  return (
    <>
      <div className="w-full divide-y">
        <div className="flex divide-x md:flex-row flex-col-reverse">
          <div className="md:w-2/3 p-6 w-full space-y-6">
            <Calendar
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
          <div className="md:w-1/3 max-h-[60dvh] overflow-auto w-full flex md:flex-col flex-row *:w-full">
            <Tabs value={duration ?? undefined} onValueChange={setDuration}>
              <div className="w-full p-6 overflow-x-auto bg-background-secondary md:sticky static top-0 z-10 shrink-0 h-[84px]">
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
              </div>
              {durations.map((duration) => {
                const times = availability?.availability[duration] ?? [];
                return (
                  <TabsContent
                    key={duration}
                    value={duration}
                    className="px-6 pb-6"
                  >
                    <ul className="w-full space-y-3">
                      {times.map((availableTime) => {
                        const selected = availableTime === time;
                        return (
                          <li key={availableTime}>
                            <Button
                              variant={selected ? "default" : "outline"}
                              className="w-full"
                              onClick={() => {
                                if (selected) setTime(null);
                                else setTime(availableTime);
                              }}
                            >
                              {availableTime}
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  </TabsContent>
                );
              })}
            </Tabs>
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
