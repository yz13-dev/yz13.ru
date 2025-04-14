"use client";
import { HomeIcon } from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useState } from "react";
import CalendarPopover from "./popovers/calendar";
import User from "./user";
const LiveTime = dynamic(() => import("../live/live-time"), {
  loading: () => (
    <span className="h-7 w-12 text-center text-lg font-medium text-foreground/50">
      00:00
    </span>
  ),
});

type DockItemsProps = {
  showUser?: boolean;
};

export default function Items({ showUser = false }: DockItemsProps) {
  const [unMuteReminder, setUnMuteReminder] = useState<boolean>(true);
  return (
    <>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        {/* <ItemsGroup /> */}
        <button className="size-12 rounded-xl border gap-2 bg-background flex relative items-center justify-center">
          <Link href="/" className="absolute left-0 top-0 w-full h-full" />
          <HomeIcon size={20} className="shrink-0 text-foreground" />
        </button>
      </div>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        <CalendarPopover>
          <button className="h-12 px-3 rounded-xl border flex items-center justify-center">
            <LiveTime className="text-lg w-12 text-center font-medium select-none" />
          </button>
        </CalendarPopover>
        {/* <button
          onClick={() => toggleMenu("dock")}
          className="size-12 px-3 rounded-xl border flex items-center justify-center"
        >
          <LayoutGridIcon size={18} />
        </button> */}
        {showUser && (
          <div className="size-12 rounded-xl border flex items-center justify-center">
            <Suspense fallback={<Skeleton className="size-12 rounded-full" />}>
              <User sideOffset={12} asSquare />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
}
