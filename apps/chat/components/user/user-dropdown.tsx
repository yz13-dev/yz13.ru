"use client";
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
import { UserObject } from "types/user";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/client";

const UserDropdown = ({
  open,
  onOpenChange,
  user,
  children,
  sideOffset = 4,
  className = "",
}: {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  user: UserObject;
  sideOffset?: number;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const handleSignOut = () => {
    const supabase = createClient();
    supabase.auth.signOut();
    router.refresh();
  };
  const positionOrEmail = user.email;
  const isAdmin = user.role === "admin";
  return (
    <DropdownMenu open={open} onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn("w-56 rounded-xl", className)}
        sideOffset={sideOffset}
      >
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium">
            {user.username || "Пользователь"}
          </span>
          <span className="text-xs text-secondary font-normal">
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
