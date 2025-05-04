"use client";

import useTimeStore from "@/components/live/time.store";
import { useEffect, useState } from "react";

export default function HeaderTime() {
  const [ready, setReady] = useState<boolean>(false);
  const time = useTimeStore((state) => state.time);
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <>
      <span className="text-2xl font-medium">
        {ready ? time.format("HH:mm") : "00:00"}
      </span>
      <span className="text-base text-muted-foreground">{tz}</span>
    </>
  );
}
