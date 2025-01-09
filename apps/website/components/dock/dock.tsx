"use client";
import { User } from "@supabase/supabase-js";
import { useNetwork } from "ahooks";
import {
  ChevronDownIcon,
  LayoutGridIcon,
  MenuIcon,
  SearchIcon,
  SettingsIcon,
  StickerIcon,
  WifiIcon,
  WifiOff,
  XIcon,
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
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/client";
import UserCircle from "../user/user-circle";

const Items = ({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (state: boolean) => void;
}) => {
  return (
    <div className="flex flex-row items-center *:!px-3">
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-r-none rounded-l-xl gap-2"
        asChild
      >
        <Link href="/discover">
          <LayoutGridIcon size={18} />
          Обзор
        </Link>
      </Button>
      {/* <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-none gap-2"
        asChild
      >
        <Link href="/terminal">
          <TerminalSquareIcon size={18} />
          Terminal
        </Link>
      </Button> */}
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-none gap-2"
        asChild
      >
        <Link href="/releases">
          <StickerIcon size={18} />
          Релизы
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="lg"
        className="w-fit !rounded-none gap-2"
        disabled
        asChild
      >
        <Link href="/search">
          <SearchIcon size={18} />
        </Link>
      </Button>
      <Button
        disabled={!onOpenChange}
        onClick={() => onOpenChange && onOpenChange(!open)}
        variant="ghost"
        size="lg"
        className="w-fit !rounded-l-none rounded-r-xl gap-2"
      >
        {open ? <XIcon size={18} /> : <MenuIcon size={18} />}
      </Button>
    </div>
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
  const [user, setUser] = useState<User | null>(null);
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
        "rounded-2xl bg-background absolute left-0 right-0 mx-auto bottom-16 border",
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
  if (networkState.online) return <WifiIcon size={size} />;
  else return <WifiOff size={size} />;
};

const Dock = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {isOpen && <Menu onOpenChange={setIsOpen} open={isOpen} />}
      </AnimatePresence>
      <div
        className={cn(
          "h-fit w-fit flex flex-row fixed left-0 right-0 mx-auto sm:!bottom-3 bottom-0 items-center justify-center",
          "bg-background border rounded-xl max-w-full",
        )}
      >
        <Items onOpenChange={setIsOpen} open={isOpen} />
      </div>
    </>
  );
};

export default Dock;
