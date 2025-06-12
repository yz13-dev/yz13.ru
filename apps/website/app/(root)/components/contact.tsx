import { getSchedule } from "@yz13/api/calendar/schedule";
import type { DaySchedule } from "@yz13/api/types/calendar";
import { cn } from "@yz13/ui/cn";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { addDays, eachDayOfInterval, format, isPast, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { TimerIcon } from "lucide-react";

export const ContactSkeleton = () => {
  const days = Array.from({ length: 7 }, (_, i) => i);
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="w-1/3 h-8 rounded-full" />
      <div className="flex items-center gap-3 h-[52px]">
        {days.map((day) => (
          <Skeleton
            key={`day-${day}`}
            className="min-w-10 h-full rounded-lg"
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <TimerIcon size={18} />
        <span className="text-base">00:00-00:00</span>
      </div>
    </div>
  );
};

export default async function () {
  const uid = "929e8f4f-ff0b-4802-8381-4cb5f73630f6";
  // const available = await availableForWork();
  const { data } = await getSchedule(uid);
  const today = new Date();
  const weekday = format(today, "eeeeeee").toLowerCase();
  const schedule = (data?.[weekday as keyof typeof data] ??
    []) as DaySchedule[];
  // const chat_url = "https://t.me/yz13_dev";
  const previousDays = 1;
  const nextDays = 5;
  const start = addDays(today, -previousDays);
  const end = addDays(today, nextDays);
  const week = eachDayOfInterval({ start, end });
  return (
    <div className="flex flex-col w-full gap-4">
      <span className="text-2xl font-medium capitalize">
        {format(today, "EEEE, d MMMM", { locale: ru })}
      </span>
      <div className="flex w-full items-center overflow-hidden gap-3">
        {week.map((day) => {
          const isDayIsToday = isToday(day);
          const isPastDate = isPast(day);
          const weekday = format(day, "eeeeee", { locale: ru }).toLowerCase();
          const fullweekday = format(day, "eeeeeee").toLowerCase();
          const date = format(day, "d");
          const noSchedule =
            data?.[fullweekday as keyof typeof data]?.length === 0;
          const disabled = (!isDayIsToday && isPastDate) ?? noSchedule;
          return (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={cn(
                "flex min-w-10 flex-col gap-0 py-1 px-2",
                isDayIsToday ? "rounded-lg bg-secondary" : "",
                disabled && "opacity-50",
              )}
            >
              <span className="text-sm capitalize text-muted-foreground">
                {weekday}
              </span>
              <span className="text-base">{date}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <TimerIcon size={18} />
        {schedule.length !== 0 ? (
          schedule.map((item, index, arr) => {
            const isLast = index === arr.length - 1;
            return (
              <span key={`schedule-${index}`} className="text-base">
                {item.start}-{item.end}
                {!isLast && ", "}
              </span>
            );
          })
        ) : (
          <span className="text-base">Нет доступного времени</span>
        )}
      </div>
    </div>
  );
}
