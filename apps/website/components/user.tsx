import { auth } from "@/lib/auth";
import { User as USER } from "@supabase/supabase-js";
import { UserIcon } from "lucide-react";
import { Button } from "mono/components/button";
import Image from "next/image";
import Link from "next/link";


type Props = {
  providedUser?: USER | null
}
const User = async ({ providedUser }: Props) => {
  const user = providedUser ?? (await auth())

  if (!user) return (
    <Button className="rounded-full" variant="outline" size="sm" asChild>
      <Link href="/auth/login">
        Sign in
      </Link>
    </Button>
  )
  const avatarUrl = user.user_metadata.avatar_url
  return (
    <Link href="/account" className="size-8 flex items-center justify-center rounded-full border">
      {
        avatarUrl
          ? <Image src={avatarUrl} alt="avatar" width={32} height={32} className="rounded-full" />
          : <UserIcon size={18} />
      }
    </Link>
  )
}
export default User