"use client";
import { useInterval } from "ahooks";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ru";
import { PlusIcon } from "lucide-react";
import { Separator } from "mono/components/separator";
import { useMemo, useState } from "react";
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

const Timeline = () => {
  const hour = 48;
  const minute = hour / 60;
  const second = minute / 60;
  const lineHeight = 18;
  const initialMargin = 8;
  const updateTime = () => {
    return dayjs().locale("ru");
  };
  const [time, setTime] = useState<Dayjs>(updateTime());
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
  useInterval(() => {
    setTime(updateTime());
  }, 1000);
  return (
    <div
      style={{ top: `${top}px` }}
      className="w-full absolute flex items-center h-[18px] select-none pointer-events-none"
    >
      <div className="w-full h-px bg-red-foreground relative w-full" />
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
  const today = dayjs().locale("ru");
  const day = dayjs(date).locale("ru");
  const isToday =
    today.isSame(day, "D") && today.isSame(day, "M") && today.isSame(day, "y");
  const todayFormatted = day.format("DD MMMM");
  const rangeLength = range.length;
  const [enableEventRange, setEnableEventRange] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<number[]>([]);
  const isInRange = (item: number) => timeRange.includes(item);
  const handleRange = (item: number) => {
    const isIn = isInRange(item);
    if (isIn) {
      setTimeRange(timeRange.filter((time) => time !== item));
    } else {
      setTimeRange([...timeRange, item]);
    }
  };
  const getSortedRange = () => timeRange.sort((a, b) => a - b);
  const isLast = (item: number) => getSortedRange().at(-1) === item;
  const isFirst = (item: number) => getSortedRange()[0] === item;
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
        <div className="absolute w-full top-0 left-0 relative">
          {showTimeline && <Timeline />}
          <div
            onPointerDown={(e) => {
              console.log("pointer down");
              setEnableEventRange(true);
              if (timeRange.length !== 0) setTimeRange([]);
            }}
            onPointerLeave={() => setEnableEventRange(false)}
            onPointerUp={() => {
              console.log("pointer up");
              setEnableEventRange(false);
              if (timeRange.length <= 1) setTimeRange([]);
            }}
          >
            {range.map((time, index) => {
              const formatted = `${time <= 9 ? "0" : ""}${time}:00`;
              const isIn = isInRange(time);
              const last = isLast(time);
              const first = isFirst(time);
              return (
                <div
                  key={"today/" + index}
                  className="w-full group h-12"
                  data-selected={isIn}
                  onPointerOver={() => {
                    if (enableEventRange) {
                      console.log("is-over", formatted);
                      if (!isIn) handleRange(time);
                    }
                  }}
                >
                  <div className="w-full flex items-start gap-2 h-full">
                    <span className="text-xs w-8 text-secondary select-none">
                      {formatted}
                    </span>
                    <div className="w-[calc(100%-2.5rem-0.5rem)] h-full">
                      {isIn ? (
                        <div
                          className={cn(
                            "w-full h-full flex gap-2 items-center justify-center",
                            first && "rounded-t-lg border",
                            last && "rounded-b-lg border",
                            !first && !last && "rounded-none border-x",
                          )}
                        >
                          {first && (
                            <span className="text-xs text-secondary select-none">
                              Начало - {formatted}
                            </span>
                          )}
                          {last && (
                            <span className="text-xs text-secondary select-none">
                              Конец - {formatted}
                            </span>
                          )}
                        </div>
                      ) : (
                        <>
                          <Separator className="group-hover:hidden mt-2" />
                          <div className="w-full h-full group-hover:flex gap-2 hidden items-center justify-center border rounded-lg">
                            <PlusIcon size={16} className="text-secondary" />
                            <span className="text-xs text-secondary select-none">
                              Нажмите и проведите для добавления события
                            </span>
                          </div>
                        </>
                      )}
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
  timeline = { date: dayjs().format() },
}: CalendarProps) => {
  const today = dayjs().locale("ru");
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
        const day = today.add(date, "days");
        return (
          <Day
            {...timeline}
            key={"today/" + index}
            range={range}
            date={day.format()}
          />
        );
      })}
    </div>
  );
};

export default DayTimeline;
