"use client";

import useTimeStore from "@/components/live/time.store";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function DayInfo() {
  const date = useTimeStore((state) => state.time);
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Link
          href={`/${date.format("YYYY-MM-DD")}`}
          className="text-lg font-medium capitalize"
        >
          {date.format("MMMM DD, YYYY")}
        </Link>
        <ArrowRightIcon size={16} />
      </div>
      <span className="text-base text-secondary capitalize">
        {date.format("dddd")}
      </span>
    </div>
  );
}
