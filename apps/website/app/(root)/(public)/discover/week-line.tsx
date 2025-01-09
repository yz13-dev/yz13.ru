"use client";
import useTimeStore from "@/components/live/time.store";
import { useDebounceEffect } from "ahooks";
import { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "yz13/cn";

type WeekLineProps = {
  link?: string;
};

const WeekLine = ({ link }: WeekLineProps) => {
  const router = useRouter();
  const time = useTimeStore((state) => state.time);
  const [day, setDay] = useState(time.date());
  const ref = useRef<HTMLDivElement>(null);

  const scrollTo = (date: Dayjs) => {
    const div = ref.current;
    if (div) {
      const target = div.querySelector(`#d-${date.format("YYYY-MM-DD")}`);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  };
  const getRange = () => {
    const length = 13;
    const range = Array.from({ length })
      .map((_, i) => i - length / 2)
      .sort((a, b) => a - b)
      .map((index) => {
        const date = time.add(index, "day");
        return date;
      });
    return range;
  };
  const [range, setRange] = useState<Dayjs[]>(getRange());
  useEffect(() => {
    const range = getRange();
    setRange(range);
    const withDay = time.set("date", day);
    scrollTo(withDay);
  }, [day]);
  useDebounceEffect(
    () => {
      if (time.date() === day) return;
      else {
        setDay(time.date());
      }
    },
    [time, ref],
    { wait: 250, maxWait: 3000 },
  );
  return (
    <div
      ref={ref}
      onClick={() => {
        if (link) {
          router.push(link);
        }
      }}
      className={cn(
        "w-full shrink-0 h-20 p-2 flex items-center overflow-hidden gap-4",
        "relative rounded-xl ",
        link ? "hover:bg-yz-neutral-200 cursor-pointer" : "",
      )}
    >
      {range.map((date, i) => {
        return (
          <div
            key={date.format("YYYY-MM-DD")}
            id={"d-" + date.format("YYYY-MM-DD")}
            className={cn(
              "w-14 shrink-0 rounded-xl flex items-center justify-center border gap-0 flex-col h-full transition-all",
              date.isSame(time, "day")
                ? "bg-foreground text-background border-foreground mx-2"
                : "scale-90",
            )}
          >
            <span className="text-sm text-secondary">{date.format("dd")}</span>
            <span className="font-medium text-lg">{date.format("DD")}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WeekLine;
