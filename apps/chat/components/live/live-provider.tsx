"use client";
import { useInterval } from "ahooks";
import useTimeStore, { getNewTime } from "./time.store";
import { useState } from "react";

const LiveTimeProvider = ({ children }: { children?: React.ReactNode }) => {
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
  return <>{children}</>;
};

export default LiveTimeProvider;
