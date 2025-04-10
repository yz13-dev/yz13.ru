"use client";
import useTimeStore from "@/components/live/time.store";
import { FlameIcon } from "lucide-react";
import { Checkbox } from "mono/components/checkbox";
import { Label } from "mono/components/label";
import { useMemo } from "react";
import { cn } from "yz13/cn";

const WAKEUP_TIME = 7;
const WORK_TIME_START = 9;
const WORK_TIME_END = 18;
const SLEEP_TIME = 22;

const PLACEHOLDER_HEIGHT = 84;

const formatNumber = (num: number) => {
  return num <= 9 ? `0${num}` : num;
};

type TaskListProps = {
  className?: string;
};
export default function TaskList({ className = "" }: TaskListProps) {
  const time = useTimeStore((state) => state.time);
  const isWeekend = useMemo(() => time.day() === 0 || time.day() === 6, [time]);
  const isWakeUp = useMemo(() => time.hour() >= WAKEUP_TIME, [time]);
  const isWork = useMemo(() => {
    const isLaterThanStart = time.hour() >= WORK_TIME_START;
    const isEarlierThanEnd = time.hour() < WORK_TIME_END;
    const isLaterThanEnd = time.hour() >= WORK_TIME_END;
    return isLaterThanEnd ? true : isLaterThanStart && isEarlierThanEnd;
  }, [time]);
  const isSleep = useMemo(() => time.hour() >= SLEEP_TIME, [time]);
  return (
    <div
      className={cn(
        "max-w-sm w-full rounded-3xl bg-background/80 backdrop-blur-sm border h-fit p-4",
        className,
      )}
    >
      <div className="w-full text-secondary px-2 py-1.5 flex items-center gap-2 rounded-md bg-neutral-200">
        <FlameIcon size={16} />
        <span className="text-sm font-medium">Сегодня</span>
      </div>
      {isWeekend ? (
        <div
          style={{ height: PLACEHOLDER_HEIGHT }}
          className="w-full flex items-center justify-center rounded-2xl"
        >
          <span className="text-secondary text-sm">Выходной</span>
        </div>
      ) : (
        <ul className="w-full py-3 space-y-3">
          <li
            aria-checked={isWakeUp}
            className="px-2 flex items-center gap-2 group"
          >
            <Checkbox id="wakeup" checked={isWakeUp} />
            <Label
              htmllFor="wakeup"
              className="text-sm group-aria-checked:line-through group-aria-checked:text-secondary text-foreground/60"
            >
              Проснуться
            </Label>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-secondary">
                {formatNumber(WAKEUP_TIME)}:00
              </span>
            </div>
          </li>
          <li
            aria-checked={isWork}
            className="px-2 flex items-center gap-2 group"
          >
            <Checkbox id="work" checked={isWork} />
            <Label
              htmllFor="work"
              className="text-sm group-aria-checked:line-through group-aria-checked:text-secondary text-foreground/60"
            >
              Поработать
            </Label>
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-xs text-secondary">
                {formatNumber(WORK_TIME_START)}:00 -{" "}
                {formatNumber(WORK_TIME_END)}
                :00
              </span>
            </div>
          </li>
          <li
            aria-checked={isSleep}
            className="px-2 flex items-center gap-2 group"
          >
            <Checkbox id="sleep" checked={isSleep} />
            <Label
              htmllFor="sleep"
              className="text-sm group-aria-checked:line-through group-aria-checked:text-secondary text-foreground/60"
            >
              Поспать
            </Label>
            <div className="flex ml-auto items-center gap-1">
              <span className="text-xs text-secondary">
                {formatNumber(SLEEP_TIME)}:00
              </span>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
