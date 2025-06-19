"use client";

import useTimeStore from "@/components/live/time.store";
import { cn } from "@yz13/ui/cn";
import { format } from "date-fns";
import { useEffect, useState, type ComponentPropsWithoutRef } from "react";


export default function ({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  const time = useTimeStore(state => state.time);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, [])
  return <span
    className={cn("", className)}
    {...props}
  >
    {loaded ? format(time, "HH:mm") : "00:00"}
  </span>;
}
