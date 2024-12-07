import { auth } from "@/lib/auth";
import { User as USER } from "@supabase/supabase-js";
import { UserIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import Link from "next/link";
import { cn } from "yz13/cn";


type Props = {
  providedUser?: USER | null
  size?: "sm" | "md" | "lg"
}
const User = async ({ providedUser, size = "md" }: Props) => {
  const user = providedUser ?? (await auth())

  if (!user) return (
    <Button className="rounded-full" variant="outline" size={size} asChild>
      <Link href="/auth/login">
        Sign in
      </Link>
    </Button>
  )
  const avatarUrl = user.user_metadata.avatar_url
  return (
    <Link href="/account" className={cn(
      "size-8 flex items-center justify-center rounded-full border relative",
      size === "sm" ? "size-8" : size === "md" ? "size-12" : "size-16"
    )}>
      {
        avatarUrl
          ? <Image src={avatarUrl} alt="avatar" fill className="rounded-full" />
          : <UserIcon size={18} />
      }
    </Link>
  )
}
export default User
