"use client";

import { getUser } from "@/actions/user";
import { User } from "@supabase/supabase-js";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "yz13/cn";
import { createClient } from "yz13/supabase/client";

const RoomUsers = () => {
  const [users, setUsers] = useState<string[]>([]);
  const pushUser = (user: string) => {
    setUsers((prev) => [...prev, user]);
  };
  useEffect(() => {
    const client = createClient();

    const room = client.channel("canvas");
    room
      .on("presence", { event: "sync" }, () => {
        const state = room.presenceState();
        const keys = Object.keys(state);
        setUsers(keys);
      })
      .subscribe();
  }, []);
  if (users.length === 0) return null;
  return (
    <div className="absolute right-3 top-3 w-fit p-2 rounded-full border bg-background h-fit">
      {users.map((user) => (
        <RoomUser key={user} uid={user} className="size-6" />
      ))}
    </div>
  );
};

const RoomUser = ({
  uid,
  className = "",
}: {
  uid: string;
  className?: string;
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    getUser(uid).then(setUser);
  }, [uid]);
  return (
    <div
      className={cn(
        "size-8 flex flex-row rounded-full bg-background-back border items-center justify-center",
        className,
      )}
    >
      {user?.user_metadata?.avatar_url ? (
        <Image
          fill
          src={user?.user_metadata?.avatar_url}
          alt="avatar"
          className="rounded-full"
        />
      ) : (
        <UserIcon size={14} />
      )}
    </div>
  );
};

export default RoomUsers;
