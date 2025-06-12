"use client";

import { Event } from "@yz13/api/types/calendar";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { ru as locale } from "date-fns/locale/ru";
import * as React from "react";
import { cn } from "@yz13/ui/cn";

interface FullScreenCalendarProps {
  data?: Event[];
  className?: string;
  gridClassName?: string;
}

const colStartClasses = [
  "",
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
];

export default function FullScreenCalendar({
  data = [],
  className = "",
  gridClassName = "",
}: FullScreenCalendarProps) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = React.useState(today);
  const [currentMonth, setCurrentMonth] = React.useState(
    format(today, "MMM-yyyy", { locale, weekStartsOn: 1 }),
  );
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date(), {
    locale,
    weekStartsOn: 1,
  });
  // const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  const startDate = startOfWeek(firstDayCurrentMonth, {
    weekStartsOn: 1,
    locale,
  });
  const endDate = endOfWeek(endOfMonth(firstDayCurrentMonth), {
    weekStartsOn: 1,
    locale,
  });

  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  return (
    <div className={cn("flex flex-1 flex-col", className)}>
      <div className={cn("flex w-full h-full flex-col", gridClassName)}>
        {/* Week Days Header */}
        <div className="grid grid-cols-7 border-x text-center text-xs font-semibold leading-6">
          <div className="border-r py-2.5">Пн</div>
          <div className="border-r py-2.5">Вт</div>
          <div className="border-r py-2.5">Ср</div>
          <div className="border-r py-2.5">Чт</div>
          <div className="border-r py-2.5">Пт</div>
          <div className="border-r py-2.5">Сб</div>
          <div className="py-2.5">Вс</div>
        </div>

        {/* Calendar Days */}
        <div className="flex text-xs leading-6 w-full h-full">
          <div className="w-full border-x grid grid-cols-7 grid-rows-5">
            {days.map((day, dayIdx) => {
              const maxVisible = 3;
              const dayEvents = data.filter((event) =>
                isSameDay(event.date_start, day),
              );
              const dayEventsCount = dayEvents.length;
              return (
                <div
                  key={dayIdx}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    dayIdx === 1 && colStartClasses[getDay(day)],
                    !isEqual(day, selectedDay) &&
                    !isToday(day) &&
                    !isSameMonth(day, firstDayCurrentMonth) &&
                    "bg-secondary/50 text-muted-foreground",
                    "relative flex flex-col border-b border-r hover:bg-secondary/40 focus:z-10",
                    !isEqual(day, selectedDay) && "hover:bg-secondary/40",
                  )}
                >
                  <header className="flex items-center justify-between p-2.5">
                    <button
                      type="button"
                      className={cn(
                        isEqual(day, selectedDay) && "text-primary-foreground",
                        !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        "text-foreground",
                        !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        "text-muted-foreground",
                        isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "border-none bg-primary text-primary-foreground",
                        isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-foreground text-background",
                        (isEqual(day, selectedDay) || isToday(day)) &&
                        "font-semibold",
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs hover:border",
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>
                        {format(day, "d", { locale, weekStartsOn: 1 })}
                      </time>
                    </button>
                  </header>
                  <div className="flex-1 space-y-2 p-2.5">
                    {dayEvents.map((day) => {
                      const start = parseISO(day.date_start);
                      const end = day.date_end ? parseISO(day.date_end) : null;
                      return (
                        <div key={day.id} className="space-y-1.5">
                          <div className="flex flex-row items-center justify-between gap-1 rounded-lg border bg-muted/50 p-2 text-xs leading-tight">
                            <p className="font-medium line-clamp-1 leading-none">
                              {day.summary}
                            </p>
                            <p className="leading-none text-muted-foreground">
                              {format(start, "HH:mm")}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    {dayEvents.length > maxVisible && (
                      <div className="text-xs text-muted-foreground">
                        + {dayEventsCount - maxVisible} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
