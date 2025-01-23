"use client";
import { isDev } from "@/app/login/get-url";
import User from "@/app/user";
import { useNetwork } from "ahooks";
import { HomeIcon, Loader2, WifiIcon, WifiOff } from "lucide-react";
import { Skeleton } from "mono/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import { AnimatePresence } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { cn } from "yz13/cn";
import useDockMenuStore, { menu, Placeholder } from "./menus/menu.store";
const LiveTime = dynamic(() => import("../live/live-time"), {
  ssr: false,
  loading: () => (
    <span className="h-7 w-12 text-center text-lg font-medium text-secondary/50">
      00:00
    </span>
  ),
});
const RadioPlayer = dynamic(() => import("@/components/radio-player"), {
  ssr: false,
  loading: () => <Skeleton className="size-12 rounded-xl" />,
});

const Items = () => {
  const [unMuteReminder, setUnMuteReminder] = useState<boolean>(true);
  return (
    <>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        <div className="size-12 rounded-xl border flex relative items-center justify-center">
          <Link href="/" className="absolute left-0 top-0 w-full h-full" />
          <HomeIcon size={18} className="text-foreground" />
        </div>
        {/* {isDev && (
          <div className="size-12 rounded-xl border flex relative items-center justify-center">
            <Link
              href="/canvas"
              className="absolute left-0 top-0 w-full h-full"
            />
            <BrushIcon size={18} className="text-foreground" />
          </div>
        )} */}
      </div>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        <Tooltip delayDuration={100} open={unMuteReminder}>
          <TooltipTrigger asChild>
            <div
              className="h-12 rounded-xl border transition-all w-fit"
              onMouseEnter={() => setUnMuteReminder(false)}
            >
              <RadioPlayer />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" sideOffset={12} className="border">
            По умолчанию у радио выключен звук.
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex flex-row items-center space-x-1 *:shrink-0 *:bg-background">
        <div className="h-12 px-3 rounded-xl border flex items-center justify-center">
          <LiveTime className="text-lg w-12 text-center font-medium select-none" />
        </div>
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

export const ConnectionStatus = ({ size = 16 }: { size?: number }) => {
  const networkState = useNetwork();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) return <Loader2 size={size} className="animate-spin" />;
  if (networkState.online) return <WifiIcon size={size} />;
  else return <WifiOff size={size} />;
};

const Dock = ({ className = "" }: { className?: string }) => {
  const menuId = useDockMenuStore((state) => state.menuId);
  const menuItem = menuId ? menu[menuId] : null;
  const Menu = menuId && menuItem ? menuItem : Placeholder;
  // Добавить враппер для второго слоя элементов, и вывести высоту враппера в переменную, которую надо будет добавлять в боди
  return (
    <>
      <AnimatePresence>{menuId && <Menu />}</AnimatePresence>
      <div
        className={cn(
          "fixed left-0 right-0 mx-auto bottom-3",
          "flex flex-row items-center justify-center gap-1",
          "bg-background-back/60 backdrop-blur border rounded-2xl",
          "max-w-full h-fit w-fit p-1 max-w-dvw shrink-0 overflow-x-auto z-20",
          className,
        )}
      >
        <Items />
      </div>
    </>
  );
};

export default Dock;
