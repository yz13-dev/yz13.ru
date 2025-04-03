"use client";
import { useInterval } from "ahooks";
import useTimeStore, { getNewTime } from "./time.store";

const LiveTimeProvider = ({ children }: { children?: React.ReactNode }) => {
  const { time, setTime } = useTimeStore();
  const getTime = () => {
    return getNewTime();
  };
  useInterval(() => {
    setTime(getTime());
  }, 1000);
  return <>{children}</>;
};

export default LiveTimeProvider;
