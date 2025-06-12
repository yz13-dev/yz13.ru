import { UserIcon } from "lucide-react";
import Image from "next/image";
// import { avatarURL } from "@yz13/api/lib/avatar-url";
import type { UserObject } from "@yz13/api/types/user";
import { cn } from "@yz13/ui/cn";
import { getAvatarURL } from "@yz13/utils/avatar-url";

const UserCircle = ({
  user,
  className = "",
}: {
  user: UserObject;
  className?: string;
}) => {
  const avatarUrl = user.avatar_url ? getAvatarURL(user.avatar_url) : null;
  if (!user) return;
  return (
    <div
      className={cn(
        "size-9 flex items-center justify-center rounded-full border relative",
        className,
      )}
    >
      {avatarUrl ? (
        <Image src={avatarUrl} alt="avatar" fill className="rounded-full" />
      ) : (
        <UserIcon size={18} />
      )}
    </div>
  );
};

export default UserCircle;
