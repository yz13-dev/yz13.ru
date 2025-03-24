"use client";
import UserDropdown from "@/components/user/user-dropdown";
import { useUser } from "@/hooks/use-user";
import { ChevronDownIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { useSidebar } from "mono/components/sidebar";
import { Skeleton } from "mono/components/skeleton";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";

const Header = () => {
  const { setOpen } = useSidebar();
  const [user, loading] = useUser();
  const [open, setOpenDropdown] = useState<boolean>(false);
  useEffect(() => {
    if (!loading && !user) setOpen(false);
  }, [user, loading]);
  const UserInfo = () => {
    return (
      <div
        className={cn(
          "w-full p-2 flex items-center rounded-2xl border justify-between gap-2",
          open && "bg-background-secondary",
        )}
      >
        <div className="flex items-center gap-2">
          <Avatar className="size-10 rounded-full border bg-background">
            <AvatarImage src={user?.avatar_url ?? undefined} />
            <AvatarFallback className="p-0.5">
              <UserIcon />
            </AvatarFallback>
          </Avatar>
          {loading ? (
            <Skeleton className="w-1/2 h-9" />
          ) : (
            <div className="flex flex-col">
              <span className="text-sm text-start font-medium">
                {user?.username}
              </span>
              <span className="text-xs text-secondary">{user?.email}</span>
            </div>
          )}
        </div>
        <ChevronDownIcon
          size={16}
          className={cn("mx-2", open ? "rotate-180" : "")}
        />
      </div>
    );
  };
  if (!user) return <UserInfo />;
  return (
    <UserDropdown
      user={user}
      sideOffset={12}
      open={open}
      onOpenChange={setOpenDropdown}
      className="var(--radix-dropdown-menu-trigger)"
    >
      <UserInfo />
    </UserDropdown>
  );
};
export default Header;
