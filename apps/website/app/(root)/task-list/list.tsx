"use client";
import useTimeStore from "@/components/live/time.store";
import { FlameIcon } from "lucide-react";
import { useMemo } from "react";
import { cn } from "yz13/cn";
import DefaultList from "./default-list";

const PLACEHOLDER_HEIGHT = 84;

export const formatNumber = (num: number) => {
  return num <= 9 ? `0${num}` : num;
};

type TaskListProps = {
  className?: string;
};
export default function TaskList({ className = "" }: TaskListProps) {
  const time = useTimeStore((state) => state.time);
  const isWeekend = useMemo(() => time.day() === 0 || time.day() === 6, [time]);
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
        <DefaultList />
      )}
    </div>
  );
}
