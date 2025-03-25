import { UserIcon } from "lucide-react";
import Image from "next/image";
import { UserObject } from "types/user";
import { cn } from "yz13/cn";

const UserCircle = ({
  user,
  className = "",
}: {
  user: UserObject;
  className?: string;
}) => {
  const avatarUrl = user.avatar_url;
  if (!user)
    return (
      <div
        className={cn(
          "size-9 flex items-center justify-center rounded-full border relative",
          className,
        )}
      ></div>
    );
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
