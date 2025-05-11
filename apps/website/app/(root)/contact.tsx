import { availableForWork } from "@/const/flags";
import { addDays, eachDayOfInterval, format, isPast, isToday } from "date-fns";
import { ru } from "date-fns/locale";
import { SendIcon, TimerIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Button } from "mono/components/button";
import { Skeleton } from "mono/components/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import { getSchedule } from "rest-api/calendar/schedule";
import { avatarURL } from "rest-api/lib/avatar-url";
import { DaySchedule } from "rest-api/types/calendar";
import { getUserById } from "rest-api/user";
import { cn } from "yz13/cn";
import CallToAction, { CallToActionSkeleton } from "./call-to-action";

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
          ></Skeleton>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <TimerIcon size={18} />
        <span className="text-base">00:00-00:00</span>
      </div>
      <div className="flex items-center mt-6 gap-2">
        <CallToActionSkeleton />
      </div>
    </div>
  );
};

export default async function () {
  const uid = "929e8f4f-ff0b-4802-8381-4cb5f73630f6";
  const busy = await availableForWork();
  const { data } = await getSchedule(uid);
  const today = new Date();
  const weekday = format(today, "eeeeeee").toLowerCase();
  const schedule = (data?.[weekday as keyof typeof data] ??
    []) as DaySchedule[];
  const chat_url = "https://t.me/yz13_dev";
  const start = addDays(today, -1);
  const end = addDays(today, 5);
  const week = eachDayOfInterval({ start, end });
  return (
    <div className="flex flex-col gap-4">
      <span className="text-2xl font-medium capitalize">
        {format(today, "EEEE, d MMMM", { locale: ru })}
      </span>
      <div className="flex items-center gap-3">
        {week.map((day) => {
          const isDayIsToday = isToday(day);
          const isPastDate = isPast(day);
          const weekday = format(day, "eeeeee", { locale: ru }).toLowerCase();
          const fullweekday = format(day, "eeeeeee").toLowerCase();
          const date = format(day, "d");
          const noSchedule =
            data?.[fullweekday as keyof typeof data]?.length === 0;
          const disabled = (!isDayIsToday && isPastDate) || noSchedule;
          return (
            <div
              key={format(day, "yyyy-MM-dd")}
              className={cn(
                "flex min-w-10 flex-col gap-0 py-1 px-2",
                isDayIsToday ? "rounded-lg bg-background-secondary" : "",
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
                {item.start.time}-{item.end.time}
                {!isLast && ", "}
              </span>
            );
          })
        ) : (
          <span className="text-base">Нет доступного времени</span>
        )}
      </div>
      <div className="flex items-center mt-6 gap-2">
        <Suspense fallback={<CallToActionSkeleton />}>
          <CallToAction busy={busy} />
        </Suspense>
        <Button variant="ghost" asChild>
          <Link href={chat_url}>
            <SendIcon size={16} />
            Чат
          </Link>
        </Button>
      </div>
    </div>
  );
}

const User = async ({ uid }: { uid: string }) => {
  const { data: user } = await getUserById(uid);
  const username = user?.username ?? "Username";
  const email = user?.email;
  const avatar_url = user?.avatar_url;
  return (
    <div className="flex items-center gap-2">
      <Avatar className="ring-ring ring-2 ring-offset-2">
        <AvatarImage src={avatar_url ? avatarURL(avatar_url) : undefined} />
        <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-medium">{username}</span>
        <span className="text-xs text-muted-foreground">{email}</span>
      </div>
    </div>
  );
};
