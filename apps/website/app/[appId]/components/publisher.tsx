import { avatarURL } from "@yz13/api/lib/avatar-url";
import { getUserById } from "@yz13/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/components/avatar";
import { Badge } from "@yz13/ui/components/badge";
import { Skeleton } from "@yz13/ui/components/skeleton";

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
