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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "yz13/supabase/client";

const UserDropdown = ({
  user,
  children,
  sideOffset = 4,
}: {
  user: User;
  sideOffset?: number;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const handleSignOut = () => {
    const supabase = createClient();
    supabase.auth.signOut();
  };
  const positionOrEmail = user.user_metadata.position ?? user.email;
  const isAdmin = user.user_metadata.role === "admin";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl"
        sideOffset={sideOffset}
      >
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium">
            {user.user_metadata.username ?? "Username"}
          </span>
          <span className="text-xs text-foreground font-normal">
            {positionOrEmail}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="justify-between" asChild>
          <Link href="/account">
            Профиль
            <UserCircleIcon size={16} />
          </Link>
        </DropdownMenuItem>
        {process.env.NODE_ENV === "development" && (
          <DropdownMenuItem className="justify-between" asChild>
            <Link href="/account/settings">
              Настройки аккаунта
              <SettingsIcon size={16} />
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-between" onClick={handleSignOut}>
          Выйти из аккаунта
          <LogOutIcon size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
