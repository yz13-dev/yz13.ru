"use client";
import { useInterval } from "ahooks";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { cn } from "yz13/cn";
import useTimeStore, { getNewTime } from "./time.store";
import { useState } from "react";

dayjs.extend(timezone);
dayjs.extend(utc);

type LiveTimeProps = {
  className?: string;
  showSeconds?: boolean;
};

const LiveTime = ({ className = "", showSeconds = false }: LiveTimeProps) => {
  const { time, setTime } = useTimeStore();
  const [last, setLast] = useState(time.format("HH:mm"));
  const getTime = () => {
    return getNewTime();
  };
  useInterval(() => {
    const time = getTime();
    const same = last === time.format("HH:mm");
    if (same) return;
    else {
      setTime(time);
      setLast(time.format("HH:mm"));
    }
  }, 1000);
  return (
    <span className={cn("text-sm", className)}>
      {showSeconds ? time.format("HH:mm:ss") : time.format("HH:mm")}
    </span>
  );
};

export default LiveTime;
