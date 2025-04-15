"use client";

import useTimeStore, { getTime } from "@/components/live/time.store";
import { Dayjs } from "dayjs";
import { isEqual } from "lodash";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "yz13/cn";

const GAP = 2;
const PX_PER_SECOND = 1;
const LINE_WIDTH = 1;
const LINE_PER_SECOND = 1;

const formatTime = (hour: number, minute: number) => {
  const hourStr = hour.toString().padStart(2, "0");
  const minuteStr = minute.toString().padStart(2, "0");
  return `${hourStr}:${minuteStr}`;
};

type TimeRange = [number, number];
const makeDayline = (
  date: Dayjs,
  range: TimeRange = [0, 24],
  current?: { hour: number; minute: number },
) => {
  const day = date.date();
  const month = date.month();
  const year = date.year();
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  return hours
    .map((hour) => {
      const inRange = range[0] <= hour && hour <= range[1];
      if (!inRange) return [];
      else
        return minutes.map((minute) => {
          const active = current
            ? current.hour === hour && current.minute === minute
            : false;
          return {
            active,
            day,
            month,
            year,
            hour,
            minute,
          };
        });
    })
    .flat();
};

const makeKey = (
  day: number,
  month: number,
  year: number,
  hour: number,
  minute: number,
) => {
  return `${day}-${month}-${year}/${hour}-${minute}`;
};

type Timeline = {
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
};

type TimelineProps = {
  focusAlign?: "left" | "center" | "right";
  align?: "top" | "center" | "bottom";
};

const Timeline = ({
  align = "center",
  focusAlign = "center",
}: TimelineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const time = useTimeStore((state) => state.time);
  const timeStr = useMemo(() => time.format("YYYY-MM-DD HH:mm"), [time]);
  const [timeline, setTimeline] = useState<Timeline>({
    day: getTime().date(),
    month: getTime().month(),
    year: getTime().year(),
    hour: getTime().hour(),
    minute: getTime().minute(),
  });
  const lines = useMemo(() => {
    const yesterday = makeDayline(time.subtract(1, "day"), [18, 23]);
    const tomorrow = makeDayline(time.add(1, "day"), [0, 5]);
    const today = makeDayline(time, [0, 23], {
      hour: timeline.hour,
      minute: timeline.minute,
    });
    return [...yesterday, ...today, ...tomorrow];
  }, [timeline]);
  useEffect(() => {
    const newTimeline = {
      day: time.date(),
      month: time.month(),
      year: time.year(),
      hour: time.hour(),
      minute: time.minute(),
    };
    const isSame = isEqual(timeline, newTimeline);
    if (isSame) return;
    else setTimeline(newTimeline);
  }, [timeStr]);
  const handleScroll = () => {
    const div = ref.current;
    if (!div) return;
    const timestamp = makeKey(
      timeline.day,
      timeline.month,
      timeline.year,
      timeline.hour,
      timeline.minute,
    );
    const getCurrentTimeStamp = document.getElementById(timestamp);
    if (!getCurrentTimeStamp) return;
    const width = div.clientWidth;
    const side =
      focusAlign === "center"
        ? width / 2
        : focusAlign === "right"
          ? width - width / 4
          : width / 4;
    const left = getCurrentTimeStamp.offsetLeft - GAP - side;
    requestAnimationFrame(() => {
      div.scrollTo({
        left,
        behavior: "smooth",
      });
    });
  };
  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [timeline]);
  return (
    <>
      <div
        ref={ref}
        className={cn(
          "w-full h-full marquee flex flex-row  gap-1 relative",
          align === "top" && "items-start",
          align === "center" && "items-center",
          align === "bottom" && "items-end",
        )}
      >
        {lines.map((line) => {
          const { hour, minute, day, month, year, active } = line;
          const intervalOfFifty = minute % 15 === 0;
          const isZero = minute === 0;
          const timestamp = formatTime(hour, minute);
          const showTime = isZero || active;
          const intervalOfFive = minute % 5 === 0;
          const isCloseToZero = hour - 1 === timeline.hour && timeline.minute >= 50 ||
            hour === timeline.hour && timeline.minute <= 10
          const height = active
            ? "50%"
            : isZero
              ? "50%"
              : intervalOfFifty
                ? "35%"
                : intervalOfFive
                  ? "25%"
                  : "15%";
          const delay = 0;
          return (
            <Line
              id={makeKey(day, month, year, hour, minute)}
              key={makeKey(day, month, year, hour, minute)}
              height={height}
              time={timestamp}
              showTime={showTime}
              active={active}
              align={align}
              nearZero={isCloseToZero}
            />
          );
        })}
      </div>
    </>
  );
};

type LineProps = {
  height: string;
  showTime?: boolean;
  active?: boolean;
  time: string;
  id: string;
  nearZero?: boolean;
  align?: "top" | "center" | "bottom";
};
const Line = ({
  active = false,
  height,
  id,
  time,
  nearZero = false,
  align = "center",
  showTime = false,
}: LineProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const isCloseToZero = !active && nearZero;
  return (
    <div
      ref={ref}
      id={id}
      data-active={active}
      data-visible={inView}
      className={cn(
        "w-px h-full relative flex flex-col items-center",
        "data-[visible=true]:opacity-100 opacity-0",
        align === "top" && "justify-start",
        align === "center" && "justify-center",
        align === "bottom" && "justify-end",
      )}
    >
      <AnimatePresence>
        {showTime && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
            data-active={active}
            data-align={align}
            className={cn(
              "text-sm absolute text-center px-0.5",
              "text-muted-foreground data-[active=true]:text-foreground",
              "data-[active=true]:z-10 data-[active=true]:backdrop-blur-sm",
              "data-[align=top]:bottom-2 data-[align=center]:-top-1 data-[align=bottom]:top-3",
              isCloseToZero &&
              "data-[align=top]:bottom-2 data-[align=center]:-top-1 data-[align=bottom]:-top-1",
            )}
          >
            {time}
          </motion.span>
        )}
      </AnimatePresence>
      <div
        style={{ height }}
        data-active={active}
        className={cn(
          "w-px",
          "data-[active=true]:bg-foreground bg-secondary",
        )}
      />
    </div>
  );
};

export default Timeline;
