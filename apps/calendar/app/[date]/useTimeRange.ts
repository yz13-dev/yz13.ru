"use client";

import { Duration } from "date-fns";
import { useState } from "react";

export function useTimeRange() {
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [duration, setDuration] = useState<Duration>({
    hours: 0,
    minutes: 0,
  });

  return {
    startTime,
    duration,
    setStartTime,
    setDuration,
  };
}
