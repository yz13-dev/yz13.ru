import { UserIcon } from "lucide-react";
import { Button } from "mono/components/button";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "yz13/supabase/server";


const User = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

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