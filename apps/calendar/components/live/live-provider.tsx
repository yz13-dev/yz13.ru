"use client";
import { useInterval } from "ahooks";
import useTimeStore, { getNewTime } from "./time.store";
import { useEffect, useState } from "react";

export default function LiveTimeProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { time, setTime } = useTimeStore();
  const [ready, setReady] = useState<boolean>(false);
  const [last, setLast] = useState(time.format("HH:mm"));
  const getTime = () => {
    return getNewTime();
  };
  useInterval(
    () => {
      const time = getTime();
      const same = last === time.format("HH:mm");
      if (same) return;
      else {
        setTime(time);
        setLast(time.format("HH:mm"));
      }
    },
    ready ? 1000 : undefined,
  );
  useEffect(() => {
    setReady(true);
  }, []);
  return <>{children}</>;
}
