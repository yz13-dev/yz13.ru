import { avatarURL } from "@yz13/api/lib/avatar-url";
import { getPosition } from "@yz13/api/positions";
import { getUserById } from "@yz13/api/user";
import { Avatar, AvatarFallback, AvatarImage } from "@yz13/ui/components/avatar";




export default async function ({ userId, showName = false }: { userId: string, showName?: boolean }) {

  const { data: user } = await getUserById(userId);

  const { data: position } = await getPosition("ru", user?.position ?? "")

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
              {position?.label}
            </span>
          }
        </div>
      }
    </div>
  )
}
