import { User } from "@supabase/supabase-js";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "yz13/cn";

const UserCircle = ({
  user,
  className = "",
}: {
  user: User;
  className?: string;
}) => {
  const avatarUrl = user.user_metadata.avatar_url;
  if (!user) return;
  return (
    <Link
      href="/account"
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
    </Link>
  );
};

export default UserCircle;
