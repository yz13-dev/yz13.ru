"use client";
import useTimeStore from "@/components/live/time.store";
import { addDays, format, formatISO, isSameDay, parseISO } from "date-fns";
import { Separator } from "mono/components/separator";
import { useEffect, useMemo, useState } from "react";
import { cn } from "yz13/cn";

type TimeRange = [number, number];

type CalendarProps = {
  timeRange?: TimeRange;
  dateRange?: number[];
  className?: string;
  timeline?: Partial<DayTimelineProps>;
};

type DayTimelineProps = {
  range?: number[];
  date: string;
  showTimeline?: boolean;
  showLabel?: boolean;
};

const Timeline = ({ className = "" }: { className?: string }) => {
  const [ready, setReady] = useState<boolean>(false);
  const hour = 48;
  const minute = hour / 60;
  const second = minute / 60;
  const lineHeight = 18;
  const initialMargin = 0;
  const time = useTimeStore((state) => state.time);
  const top = useMemo(() => {
    const hours = time.hour();
    const minutes = time.minute();
    const seconds = time.second();
    const hourHeight = hours * 48;
    const minutesHeight = minutes * minute;
    const secondsHeight = seconds * second;
    const line = lineHeight / 2;
    return initialMargin + hourHeight + minutesHeight + secondsHeight - line;
  }, [time, hour, initialMargin]);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return null;
  else
    return (
      <div
        style={{ top: `${top}px` }}
        className={cn(
          "w-full absolute flex items-center h-[18px] select-none pointer-events-none",
          className,
        )}
      >
        <div className="w-full h-px bg-red-foreground relative" />
        <span className="text-xs w-fit right-2 relative z-10 px-2 py-0 rounded-full bg-red-background text-red-foreground border border-red-foreground">
          {time.format("HH:mm")}
        </span>
      </div>
    );
};

const Day = ({
  range = [],
  date,
  showTimeline = true,
  showLabel = true,
}: DayTimelineProps) => {
  const today = new Date();
  const day = parseISO(date);
  const isToday = isSameDay(today, day);
  const todayFormatted = format(today, "dd MMMM");
  const rangeLength = range.length;
  return (
    <div>
      {showLabel && (
        <span className="uppercase text-sm block">
          {isToday && "сегодня, "}
          {todayFormatted}
        </span>
      )}
      <div
        style={{
          height: rangeLength * 48,
        }}
        className="w-full relative *:w-full"
      >
        <div className="absolute w-full top-0 left-0">
          {isToday && showTimeline && (
            <Timeline className="w-[calc(100%-32px-8px)] right-0" />
          )}
          <div>
            {range.map((time, index) => {
              const formatted = `${time <= 9 ? "0" : ""}${time}:00`;
              return (
                <div key={"today/" + index} className="w-full group h-12">
                  <div className="w-full flex items-start gap-2 h-full">
                    <span className="text-xs relative -top-2 w-8 text-muted-foreground select-none">
                      {formatted}
                    </span>
                    <div className="w-[calc(100%-2.5rem-0.5rem)] h-full">
                      <Separator />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const DayTimeline = ({
  timeRange = [9, 16],
  dateRange = [0, 1],
  className = "",
  timeline = { date: formatISO(new Date()) },
}: CalendarProps) => {
  const today = new Date();
  const calculateRange = (range: TimeRange) => {
    const length = range[1] - range[0];
    const result: number[] = [];
    for (let i = 0; i < length; i++) {
      result.push(range[0] + i);
    }
    return result;
  };
  const range = calculateRange(timeRange);
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(${dateRange.length}, 1fr)`,
      }}
      className={cn("w-full h-fit grid gap-4 relative *:space-y-4", className)}
    >
      {dateRange.map((date, index) => {
        const day = addDays(today, date);
        return (
          <Day
            {...timeline}
            key={"today/" + index}
            range={range}
            date={formatISO(day)}
          />
        );
      })}
    </div>
  );
};

export default DayTimeline;
