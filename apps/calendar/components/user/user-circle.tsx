import { GetV1UserUid200 } from "@yz13/api/types";
import { cn } from "@yz13/ui/cn";
import { UserIcon } from "lucide-react";
import Image from "next/image";

const UserCircle = ({
  user,
  className = "",
}: {
  user: NonNullable<GetV1UserUid200>;
  className?: string;
}) => {
  const avatarUrl = user.avatar_url;
  if (!user) return;
  return (
    <div
      className={cn(
        "size-9 flex items-center justify-center rounded-full border relative",
        className,
      )}
    >
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt="avatar"
          fill
          className="size-9 rounded-full"
        />
      ) : (
        <UserIcon size={18} />
      )}
    </div>
  );
};

export default UserCircle;
