"use client";

import { UserIcon } from "lucide-react";
import { useMemo } from "react";
import { cn } from "yz13/cn";
import { useMultiplayerApi } from "./multiplayer.api";

const RoomUsers = ({ className = "" }: { className?: string }) => {
  const users = useMultiplayerApi((state) => state.users);
  const keys = useMemo(() => Object.keys(users), [users]);
  return (
    <div className={cn("h-9 -space-x-4", className)}>
      {keys.map((key) => (
        <div
          key={key}
          className="size-9 inline-flex border rounded-full items-center justify-center bg-background"
        >
          <UserIcon size={16} />
        </div>
      ))}
    </div>
  );
};

export default RoomUsers;
