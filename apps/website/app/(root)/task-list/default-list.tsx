"use client";
import useTimeStore from "@/components/live/time.store";
import { Checkbox } from "mono/components/checkbox";
import { Label } from "mono/components/label";
import { useMemo } from "react";
import { formatNumber } from "./list";

const WAKEUP_TIME = 7;
const WORK_TIME_START = 9;
const WORK_TIME_END = 18;
const SLEEP_TIME = 22;

export default function DefaultList() {
  const time = useTimeStore((state) => state.time);
  const isWakeUp = useMemo(() => time.hour() >= WAKEUP_TIME, [time]);
  const isWork = useMemo(() => {
    const isLaterThanStart = time.hour() >= WORK_TIME_START;
    const isEarlierThanEnd = time.hour() < WORK_TIME_END;
    const isLaterThanEnd = time.hour() >= WORK_TIME_END;
    return isLaterThanEnd ? true : isLaterThanStart && isEarlierThanEnd;
  }, [time]);
  const isSleep = useMemo(() => time.hour() >= SLEEP_TIME, [time]);
  return (
    <ul className="w-full py-3 space-y-3">
      <li
        aria-checked={isWakeUp}
        className="px-2 flex items-center gap-2 group"
      >
        <Checkbox id="wakeup" checked={isWakeUp} />
        <Label
          htmlFor="wakeup"
          className="text-sm group-aria-checked:line-through group-aria-checked:text-foreground text-muted-foreground"
        >
          Проснуться
        </Label>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs text-foreground">
            {formatNumber(WAKEUP_TIME)}:00
          </span>
        </div>
      </li>
      <li aria-checked={isWork} className="px-2 flex items-center gap-2 group">
        <Checkbox id="work" checked={isWork} />
        <Label
          htmlFor="work"
          className="text-sm group-aria-checked:line-through group-aria-checked:text-foreground text-muted-foreground"
        >
          Поработать
        </Label>
        <div className="flex items-center gap-1 ml-auto">
          <span className="text-xs text-foreground">
            {formatNumber(WORK_TIME_START)}:00 - {formatNumber(WORK_TIME_END)}
            :00
          </span>
        </div>
      </li>
      <li aria-checked={isSleep} className="px-2 flex items-center gap-2 group">
        <Checkbox id="sleep" checked={isSleep} />
        <Label
          htmlFor="sleep"
          className="text-sm group-aria-checked:line-through group-aria-checked:text-foreground text-muted-foreground"
        >
          Поспать
        </Label>
        <div className="flex ml-auto items-center gap-1">
          <span className="text-xs text-foreground">
            {formatNumber(SLEEP_TIME)}:00
          </span>
        </div>
      </li>
    </ul>
  );
}
