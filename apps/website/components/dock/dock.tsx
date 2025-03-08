"use client";
import { isDev } from "@/app/login/get-url";
import User from "@/components/dock/user";
import {
  BriefcaseBusinessIcon,
  ChevronDownIcon,
  FolderIcon,
  HomeIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "mono/components/popover";
import { Skeleton } from "mono/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useState } from "react";
import { cn } from "yz13/cn";
import DockWrapper, { DockWidgets } from "./dock-wrapper";
import useDockMenuStore, { menu, Placeholder } from "./menus/menu.store";
import Overlay from "./overlay";
import CalendarPopover from "./popovers/calendar";
const LiveTime = dynamic(() => import("../live/live-time"), {
  ssr: false,
  loading: () => (
    <span className="h-7 w-12 text-center text-lg font-medium text-secondary/50">
      00:00
    </span>
  ),
});
const RadioPlayer = dynamic(() => import("./components/radio-player"), {
  ssr: false,
  loading: () => <Skeleton className="h-[26px] w-[100px] rounded-full" />,
});

const ItemsGroup = ({ className = "" }: { className?: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "size-12 gap-2 px-2 rounded-xl border flex relative items-center justify-center",
            className,
          )}
        >
          <ChevronDownIcon
            size={18}
            className={cn(
              "text-foreground transition-transform",
              open ? "rotate-180" : "rotate-0",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="rounded-xl w-fit flex flex-col items-center gap-2 p-0 bg-transparent border-none"
      >
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button className="size-12 rounded-xl border gap-2 bg-background flex relative items-center justify-center">
              <Link
                href="/projects"
                className="absolute left-0 top-0 w-full h-full"
              />
              <FolderIcon size={18} className="text-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" align="center" className="border">
            Проекты
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <button className="size-12 rounded-xl border gap-2 bg-background flex relative items-center justify-center">
              <Link
                href="/services"
                className="absolute left-0 top-0 w-full h-full"
              />
              <BriefcaseBusinessIcon size={18} className="text-foreground" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" align="center" className="border">
            Услуги
          </TooltipContent>
        </Tooltip>
      </PopoverContent>
    </Popover>
  );
};

const Items = () => {
  const [unMuteReminder, setUnMuteReminder] = useState<boolean>(true);
  return (
    <>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        <ItemsGroup />
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
        {isDev && (
          <div className="size-12 rounded-xl border flex items-center justify-center">
            <Suspense fallback={<Skeleton className="size-12 rounded-full" />}>
              <User sideOffset={12} asSquare />
            </Suspense>
          </div>
        )}
      </div>
    </>
  );
};

export const DockSkeleton = () => {
  return (
    <Skeleton className="h-[58px] w-64 border rounded-2xl fixed left-0 right-0 mx-auto bottom-3 z-20" />
  );
};

const Dock = ({ className = "" }: { className?: string }) => {
  const useOverlay = useDockMenuStore((state) => state.withOverlay);
  const menuId = useDockMenuStore((state) => state.menuId);
  const menuItem = menuId ? menu[menuId] : null;
  const Menu = menuId && menuItem ? menuItem : Placeholder;
  // Добавить враппер для второго слоя элементов, и вывести высоту враппера в переменную, которую надо будет добавлять в боди
  return (
    <>
      {useOverlay && <Overlay />}
      <AnimatePresence>{menuId && <Menu />}</AnimatePresence>
      <DockWrapper>
        <DockWidgets>
          <RadioPlayer />
        </DockWidgets>
        <Items />
      </DockWrapper>
    </>
  );
};

export default Dock;
