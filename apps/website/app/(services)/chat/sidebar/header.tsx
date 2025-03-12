"use client";

import useTimeStore from "@/components/live/time.store";
import { useUser } from "@/lib/use-auth";
import { Skeleton } from "mono/components/skeleton";

const Header = () => {
  const [user, loading] = useUser();
  const time = useTimeStore((state) => state.time);
  return (
    <div className="w-full px-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {loading ? (
            <Skeleton className="h-5 w-full" />
          ) : (
            <span className="text-sm font-medium text-foreground">
              Привет, {user?.user_metadata?.username}
            </span>
          )}
          <span className="text-xs capitalize text-secondary">
            {time.format("dddd, DD MMMM")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-10 rounded-md flex items-center justify-center text-secondary">
            <span className="font-medium text-xs">{time.format("HH:mm")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
