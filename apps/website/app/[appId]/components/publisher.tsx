import { Avatar, AvatarFallback, AvatarImage } from "mono/components/avatar";
import { Badge } from "mono/components/badge";
import { Skeleton } from "mono/components/skeleton";
import { avatarURL } from "rest-api/lib/avatar-url";
import { getUserById } from "rest-api/user";

export function UserPublisherSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="rounded-full size-8" />
      <Skeleton className="rounded-full h-6 w-20" />
    </div>
  );
}
export async function UserPublisher({ uid }: { uid: string }) {
  const { data: user } = await getUserById(uid);
  const username = user?.username ?? "";
  const usernameFallback = username?.slice(0, 2);
  const avatarUrl = user?.avatar_url ?? "";
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-6">
        <AvatarImage src={avatarURL(avatarUrl)} />
        <AvatarFallback>{usernameFallback}</AvatarFallback>
      </Avatar>
      <Badge variant="secondary" className="h-6 text-sm">
        {username}
      </Badge>
    </div>
  );
}
