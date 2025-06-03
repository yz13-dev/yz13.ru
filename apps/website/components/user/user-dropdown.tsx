"use client";
import { LogOutIcon, UserCircleIcon } from "lucide-react";
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
import type { UserObject } from "rest-api/types/user";
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
  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  const username = user.username || "Пользователь";
  const positionOrEmail = user.email;
  const isAdmin = user.role === "admin";
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
            {username}
          </span>
          <span className="text-xs text-foreground font-normal">
            {positionOrEmail}
          </span>
        </DropdownMenuLabel>
        {isAdmin && (
          <DropdownMenuItem className="justify-between" asChild>
            <Link href={`/u/${user.id}`}>
              Профиль
              <UserCircleIcon size={16} />
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="justify-between rounded-xl"
          onClick={handleSignOut}
        >
          Выйти из аккаунта
          <LogOutIcon size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
