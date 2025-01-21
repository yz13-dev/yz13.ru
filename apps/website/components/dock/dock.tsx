"use client";
import { isDev } from "@/app/login/get-url";
import User from "@/app/user";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useNetwork } from "ahooks";
import {
  BrushIcon,
  ChevronDownIcon,
  HomeIcon,
  Loader2,
  SettingsIcon,
  WifiIcon,
  WifiOff,
} from "lucide-react";
import { Button } from "mono/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "mono/components/command";
import { Skeleton } from "mono/components/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "mono/components/tooltip";
import { AnimatePresence, motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/client";
import UserCircle from "../user/user-circle";
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

const Items = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}) => {
  const [unMuteReminder, setUnMuteReminder] = useState<boolean>(true);
  return (
    <>
      <div className="flex flex-row items-center space-x-1 *:bg-background">
        <div className="size-12 rounded-xl border flex relative items-center justify-center">
          <Link href="/" className="absolute left-0 top-0 w-full h-full" />
          <HomeIcon size={18} className="text-foreground" />
        </div>
        {isDev && (
          <div className="size-12 rounded-xl border flex relative items-center justify-center">
            <Link
              href="/canvas"
              className="absolute left-0 top-0 w-full h-full"
            />
            <BrushIcon size={18} className="text-foreground" />
          </div>
        )}
      </div>
      <div className="flex flex-row items-center space-x-1 *:bg-background">
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
      <div className="flex flex-row items-center space-x-1 *:bg-background">
        <div className="h-12 px-3 rounded-xl border flex items-center justify-center">
          <LiveTime className="text-lg w-12 text-center font-medium select-none" />
        </div>
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

const Menu = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}) => {
  const supabase = createClient();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  useEffect(() => {
    supabase.auth.onAuthStateChange((state, session) => {
      setUser(session?.user ?? null);
    });
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 25, width: "75%" }}
      animate={{ opacity: 1, y: 0, width: "100%" }}
      exit={{ opacity: 0, y: 25, width: "75%" }}
      transition={{ delay: 0.1, duration: 0.4, type: "spring" }}
      className={cn(
        "max-w-md h-fit flex flex-col justify-between gap-2 p-2",
        "rounded-2xl z-20 bg-background absolute left-0 right-0 mx-auto bottom-16 border",
      )}
    >
      <Command>
        <CommandInput placeholder="Введите команду или поиск..." />
        <CommandList>
          <CommandEmpty>Пусто.</CommandEmpty>
          <CommandGroup heading="Releases">
            <CommandItem>Открыть релизы</CommandItem>
            <CommandItem>Открыть финансы</CommandItem>
            <CommandItem>Открыть черновики</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Быстрые действия">
            <CommandItem>Создать черновик</CommandItem>
            <CommandItem>Создать карту финансов</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <div className="flex flex-row gap-2 w-full justify-between p-2 rounded-xl border bg-background-back">
        <div className="flex flex-row gap-2 w-fit items-center">
          {user ? (
            <>
              <UserCircle user={user} className="size-8" />
            </>
          ) : (
            <Button variant="secondary" size="sm">
              Войти
            </Button>
          )}
          {/* <div className="size-8 rounded-full bg-yz-neutral-200" /> */}
          {/* <span className="text-sm text-foreground">YZ13</span> */}
        </div>
        <div className="flex flex-row gap-2 w-fit items-center">
          <Button
            size="icon"
            variant="ghost"
            className="p-1 size-7"
            onClick={() => onOpenChange && onOpenChange(false)}
          >
            <ChevronDownIcon size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="p-1 size-7">
            <ConnectionStatus size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="p-1 size-7" asChild>
            <Link href="/settings">
              <SettingsIcon size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const ConnectionStatus = ({ size = 16 }: { size?: number }) => {
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {isOpen && <Menu onOpenChange={setIsOpen} open={isOpen} />}
      </AnimatePresence>
      <div
        className={cn(
          "h-fit w-fit flex flex-row fixed left-0 right-0 mx-auto bottom-3 items-center justify-center",
          "bg-background-back bg-opacity-60 backdrop-blur border rounded-2xl max-w-full gap-1 p-1",
          className,
        )}
      >
        <Items onOpenChange={setIsOpen} open={isOpen} />
      </div>
    </>
  );
};

export default Dock;
