"use client";
import { User } from "@supabase/supabase-js";
import {
  FolderIcon,
  LogOutIcon,
  SettingsIcon,
  UserCircleIcon,
} from "lucide-react";
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
}: {
  user: User;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const handleSignOut = () => {
    const supabase = createClient();
    supabase.auth.signOut();
    router.refresh();
  };
  const positionOrEmail = user.user_metadata.position ?? user.email;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium">
            {user.user_metadata.username ?? "Username"}
          </span>
          <span className="text-xs text-foreground font-normal">
            {positionOrEmail}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuItem className="justify-between">
          Профиль
          <UserCircleIcon size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem className="justify-between" asChild>
          <Link href="/account">
            Настройки аккаунта
            <SettingsIcon size={16} />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-between" asChild>
          <Link href="/workspace">
            Рабочее пространство
            <FolderIcon size={16} />
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuLabel className="flex flex-row items-center justify-between">
          <span className="text-sm font-normal">Тема</span>
          <ThemeSwitcher />
        </DropdownMenuLabel> */}
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
