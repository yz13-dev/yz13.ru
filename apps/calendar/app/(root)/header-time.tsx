"use client";

import useTimeStore from "@/components/live/time.store";

export default function HeaderTime() {
  const time = useTimeStore((state) => state.time);
  return <span className="text-2xl font-medium">{time.format("HH:mm")}</span>;
}
