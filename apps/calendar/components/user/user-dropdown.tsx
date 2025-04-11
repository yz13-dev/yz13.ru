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
import { UserObject } from "rest-api/types/user";
import { createClient } from "yz13/supabase/client";

const UserDropdown = ({
  user,
  children,
  sideOffset = 4,
}: {
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
  const positionOrEmail = user.role ?? user.email;
  // const isAdmin = user.role === "admin";
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
            {user.username ?? "Username"}
          </span>
          <span className="text-xs text-secondary font-normal">
            {positionOrEmail}
          </span>
        </DropdownMenuLabel>
        {false && (
          <>
            <DropdownMenuItem className="justify-between" asChild>
              <Link href="/account">
                Профиль
                <UserCircleIcon size={16} />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-between" asChild>
              <Link href="/account/settings">
                Настройки аккаунта
                <SettingsIcon size={16} />
              </Link>
            </DropdownMenuItem>
          </>
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
