"use client"
import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Skeleton } from "mono/components/skeleton";
import { useEffect, useState } from "react";
import { avatarURL } from "rest-api/lib/avatar-url";
import { getPosition } from "rest-api/positions";
import type { UserObject } from "rest-api/types/user";
import { getUserById } from "rest-api/user";




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

  if (loading) return (
    <div className="flex flex-row items-center gap-2">
      <Skeleton className="size-8 rounded-full" />

      {
        showName &&
        <div className="flex flex-col">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      }
    </div>
  )
  return (
    <div className="flex flex-row items-center gap-2">
      <Avatar>
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
