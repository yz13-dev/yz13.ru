"use client";
import { HomeIcon } from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ReactNode, Suspense, useState } from "react";
import { cn } from "yz13/cn";
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

const Item = ({
  children,
  as = "button",
  className = "",
}: {
  as?: keyof HTMLElementTagNameMap;
  children?: ReactNode;
  className?: string;
}) => {
  const Component = as ?? "button";
  return (
    <Component
      className={cn(
        "h-12 rounded-xl border gap-2 bg-background flex relative items-center justify-center",
        "hover:bg-card/60 active:bg-card/80 transition-colors",
        className,
      )}
    >
      {children}
    </Component>
  );
};

export default function Items({ showUser = false }: DockItemsProps) {
  const [unMuteReminder, setUnMuteReminder] = useState<boolean>(true);
  return (
    <>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        {/* <ItemsGroup /> */}
        <Item className="size-12">
          <Link href="/" className="absolute left-0 top-0 w-full h-full" />
          <HomeIcon size={20} className="shrink-0 text-foreground" />
        </Item>
      </div>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        <CalendarPopover>
          <Item className="px-4">
            <LiveTime className="text-lg w-12 text-center font-medium select-none" />
          </Item>
        </CalendarPopover>
        {/* <button
          onClick={() => toggleMenu("dock")}
          className="size-12 px-3 rounded-xl border flex items-center justify-center"
        >
          <LayoutGridIcon size={18} />
        </button> */}
        {showUser && (
          <Item className="size-12" as="div">
            <Suspense fallback={<Skeleton className="size-12 rounded-full" />}>
              <User sideOffset={12} asSquare />
            </Suspense>
          </Item>
        )}
      </div>
    </>
  );
}
