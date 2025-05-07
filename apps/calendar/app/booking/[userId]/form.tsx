"use client";
import AutoTextarea from "@/components/auto-textarea";
import { appId } from "@/const/app-id";
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
import { createAppointment } from "rest-api/calendar/appointments";
import { NewAppointment, ScheduleAvailability } from "rest-api/types/calendar";
import { isDev } from "yz13/env";
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
  const [time, setTime] = useQueryState("time");
  const parsedDate = parse(date ?? defaultDate, "yyyy-MM-dd", new Date());
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
    name === "";
  const router = useRouter();
  const handleCreateAppointment = async () => {
    if (!date) return;
    if (!time) return;
    if (!duration) return;
    if (!user) return;
    setLoading(true);
    try {
      const organizer = user.id;
      const appointmentDate = parse(date, "yyyy-MM-dd", new Date());
      const appointmentTime = parse(time, "HH:mm", new Date());
      appointmentDate.setHours(appointmentTime.getHours());
      appointmentDate.setMinutes(appointmentTime.getMinutes());
      const appointment: NewAppointment = {
        date: formatISO(appointmentDate),
        organizer,
        duration,
        name,
        email,
        note,
      };
      const { data: created } = await createAppointment(uid, appointment);
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
  useDebounceEffect(
    () => {
      const searchParamsAsString = searchParams.toString();
      const authDomain = isDev
        ? "https://localhost:3001/login"
        : "https://yz13.ru/login";
      const returnDomain = isDev
        ? "https://localhost:3001"
        : "https://calendar.yz13.ru";
      const returnLink = `${returnDomain}/booking/${uid}?${searchParamsAsString}`;
      const authLink = `${authDomain}?continue=${encodeURIComponent(returnLink)}&appId=${appId}`;
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
