"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/components/avatar";
import { Skeleton } from "@yz13/ui/components/skeleton";
import { useEffect, useState } from "react";
import { avatarURL } from "@yz13/api/lib/avatar-url";
import { getPosition } from "@yz13/api/positions";
import type { UserObject } from "@yz13/api/types/user";
import { getUserById } from "@yz13/api/user";




export default function ({ userId, showName = false }: { userId: string, showName?: boolean }) {

  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserObject | null>(null);
  const [position, setPosition] = useState<string | null>(null);


  useEffect(() => {
    getUserById(userId)
      .then(user => setUser(user.data))
      .finally(() => setLoading(false))
    if (user?.position)
      getPosition("ru", user?.position ?? "")
        .then(position => setPosition(position.data?.label ?? null))
  }, [userId, user?.position])

  if (loading) return <Skeleton className="size-9 inline-block rounded-full" />
  if (!showName) return (
    <Avatar className="inline-block size-9">
      <AvatarImage
        src={user?.avatar_url ? avatarURL(user.avatar_url) : undefined}
      />
      <AvatarFallback className="uppercase">
        {(user?.username ?? "Username").slice(0, 2)}
      </AvatarFallback>
    </Avatar>
  )
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar className="size-9">
        <AvatarImage
          src={user?.avatar_url ? avatarURL(user.avatar_url) : undefined}
        />
        <AvatarFallback className="uppercase">
          {(user?.username ?? "Username").slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      {
        showName &&
        <div className="flex flex-col">
          <span className="text-sm font-medium text-foreground">
            {user?.username ?? "Пользователь"}
          </span>
          {
            position &&
            <span className="text-xs text-muted-foreground">
              {position}
            </span>
          }
        </div>
      }
    </div>
  )
}
