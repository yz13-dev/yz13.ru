"use client";

import useTimeStore from "@/components/live/time.store";
import { cn } from "@yz13/ui/cn";
import { format } from "date-fns";
import type { ComponentPropsWithoutRef } from "react";


export default function ({ className, ...props }: ComponentPropsWithoutRef<"span">) {
  const time = useTimeStore(state => state.time);
  return <span
    className={cn("", className)}
    {...props}
  >
    {format(time, "HH:mm")}
  </span>;
}
