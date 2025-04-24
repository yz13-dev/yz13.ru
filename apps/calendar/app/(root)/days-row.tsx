"use client";
import { addDays, format, getDaysInMonth } from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect } from "react";
import { cn } from "yz13/cn";

export default function DaysRow({ className = "" }: { className?: string }) {
  const DAYS = getDaysInMonth(new Date());
  const DAYS_AS_ARRAY = Array.from({ length: DAYS }, (_, i) => {
    const middle = DAYS / 2;
    return i - middle;
  });
  const today = new Date();
  const createDates = (days: number[]) => {
    return DAYS_AS_ARRAY.map((day) => addDays(today, day));
  };
  const days = createDates(DAYS_AS_ARRAY);

  const handleScroll = () => {
    const todayElement = document.getElementById(format(today, "yyyy-MM-dd"));
    const parentElement = document.getElementById("days-row");
    if (!todayElement || !parentElement) return;
    const left =
      todayElement.offsetLeft -
      parentElement.scrollWidth / 2 -
      parentElement.clientWidth / 2 -
      todayElement.clientWidth / 2;
    parentElement.scrollTo({ left, behavior: "smooth" });
  };
  useEffect(() => {
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);
  return (
    <div
      id="days-row"
      className={cn(
        "flex w-full items-center gap-3 overflow-x-auto",
        className,
      )}
    >
      {days.map((day) => {
        const todayKey = format(today, "yyyy-MM-dd");
        const key = format(day, "yyyy-MM-dd");
        const isToday = key === todayKey;
        return (
          <div
            id={key}
            key={key}
            data-active={isToday}
            className={cn(
              "w-12 h-full group py-2 gap-0.5 px-3 flex flex-col justify-center items-center shrink-0 rounded-lg border",
              isToday && "bg-foreground border-foreground",
            )}
          >
            <span className="text-base font-medium group-data-[active=true]:text-background text-foreground">
              {format(day, "dd")}
            </span>
            <span className="text-xs uppercase group-data-[active=true]:text-background/60 text-muted-foreground">
              {format(day, "EEEEEE", { locale: ru })}
            </span>
          </div>
        );
      })}
    </div>
  );
}
