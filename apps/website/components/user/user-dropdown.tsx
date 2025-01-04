"use client";
import { User } from "@supabase/supabase-js";
import { LogOutIcon, SettingsIcon, UserCircleIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "mono/components/dropdown-menu";
import ThemeSwitcher from "../theme/theme-switcher";

const UserDropdown = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium">
            {user.user_metadata.nickname ?? "Username"}
          </span>
          <span className="text-xs text-foreground font-normal">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="justify-between">
          Profile
          <UserCircleIcon size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-between">
          Account settings
          <SettingsIcon size={16} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Workspace</DropdownMenuItem>
        <DropdownMenuLabel className="flex flex-row items-center justify-between">
          <span className="text-sm font-normal">Theme</span>
          <ThemeSwitcher />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-between">
          Sign out
          <LogOutIcon size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
