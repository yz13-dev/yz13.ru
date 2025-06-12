"use client";

import { useUserStore } from "@/app/account/settings/user.store";
import UserCircle from "@/components/user/user-circle";
import { Button } from "@yz13/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@yz13/ui/components/command";
import { ChevronDownIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import ConntectionStatus from "../components/connection-status";
import MenuWrapper from "./menu-wrapper";
import { setMenuId } from "./menu.store";

const DockMenu = () => {
  const user = useUserStore((state) => state.user);
  return (
    <MenuWrapper>
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
          {/* <div className="size-8 rounded-full bg-neutral-200" /> */}
          {/* <span className="text-sm text-foreground">YZ13</span> */}
        </div>
        <div className="flex flex-row gap-2 w-fit items-center">
          <Button
            size="icon"
            variant="ghost"
            className="p-1 size-7"
            onClick={() => setMenuId(null)}
          >
            <ChevronDownIcon size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="p-1 size-7">
            <ConntectionStatus size={18} />
          </Button>
          <Button size="icon" variant="ghost" className="p-1 size-7" asChild>
            <Link href="/settings">
              <SettingsIcon size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </MenuWrapper>
  );
};

export default DockMenu;
