"use client";
import { useInterval } from "ahooks";
import { format } from "date-fns";
import { useState } from "react";
import useTimeStore, { getNewTime } from "./time.store";

const LiveTimeProvider = ({ children }: { children?: React.ReactNode }) => {
  const { time, setTime } = useTimeStore();
  const [last, setLast] = useState(format(time, "HH:mm"));
  const getTime = () => {
    return getNewTime();
  };
  useInterval(() => {
    const time = getTime();
    const same = last === format(time, "HH:mm");
    if (same) return;
    setTime(time);
    setLast(format(time, "HH:mm"));
  }, 1000);
  return children;
};

export default LiveTimeProvider;
