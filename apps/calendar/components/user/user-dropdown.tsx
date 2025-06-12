"use client";
import type { UserObject } from "@yz13/api/types/user";
import { createClient } from "@yz13/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@yz13/ui/components/dropdown-menu";
import { LogOutIcon, SettingsIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  const positionOrEmail = user.email ?? user.role;
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
          <span className="text-xs text-muted-foreground font-normal">
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
