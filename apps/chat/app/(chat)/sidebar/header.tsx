"use client";
import UserDropdown from "@/components/user/user-dropdown";
import { ChevronDownIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { useSidebar } from "mono/components/sidebar";
import { useState } from "react";
import { avatarURL } from "rest-api/lib/avatar-url";
import { UserObject } from "rest-api/types/user";
import { cn } from "yz13/cn";

const Header = ({ user }: { user: UserObject }) => {
  const { setOpen } = useSidebar();
  const [open, setOpenDropdown] = useState<boolean>(false);
  return (
    <UserDropdown
      user={user}
      sideOffset={12}
      open={open}
      onOpenChange={setOpenDropdown}
      className="var(--radix-dropdown-menu-trigger)"
    >
      <div
        className={cn(
          "w-full p-2 flex items-center rounded-2xl border justify-between gap-2",
          open && "bg-background-secondary",
        )}
      >
        <div className="flex items-center gap-2">
          <Avatar className="size-10 rounded-full border bg-background">
            <AvatarImage
              src={user.avatar_url ? avatarURL(user?.avatar_url) : undefined}
            />
            <AvatarFallback className="p-0.5">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm text-start font-medium">
              {user?.username}
            </span>
            <span className="text-xs text-foreground">{user?.email}</span>
          </div>
        </div>
        <ChevronDownIcon
          size={16}
          className={cn("mx-2", open ? "rotate-180" : "")}
        />
      </div>
    </UserDropdown>
  );
};
export default Header;
