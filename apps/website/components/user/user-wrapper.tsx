"use client";
import { useUserStore } from "@/app/account/settings/user.store";
import UserCircle from "@/components/user/user-circle";
import UserDropdown from "@/components/user/user-dropdown";
import { getV1AuthCurrent } from "@yz13/api";
import { GetV1UserUid200 } from "@yz13/api/types";
import { createClient } from "@yz13/supabase/client";
import { cn } from "@yz13/ui/cn";
import { Button } from "@yz13/ui/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";

type WrapperProps = {
  defaultUser?: GetV1UserUid200;
  sideOffset?: number
  className?: string
};

const UserWrapper = ({ className = "", defaultUser, sideOffset }: WrapperProps) => {
  const [user, setUser] = useState<GetV1UserUid200 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const setUserInStore = useUserStore(state => state.setUser);
  const refreshUser = async () => {
    const user = await getV1AuthCurrent()
    if (user) {
      setUser(user);
      setUserInStore(user);
    }
  }
  useEffect(() => {
    if (!defaultUser) {
      const supabase = createClient();
      supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          refreshUser()
          // const user = makeUserObj(session.user);
          // setUser(user);
        } else {
          setUser(null);
        }
      });
      setLoading(false);
    }
  }, [defaultUser]);
  useEffect(() => {
    if (defaultUser) {
      setUser(defaultUser);
      setLoading(false);
    }
  }, [defaultUser])
  if (loading) return <div className={cn("rounded-full bg-neutral-200 size-9", className)} />;
  if (user) return <Authorized sideOffset={sideOffset} className={className} />;
  return <Unauthorized />;
};

const Authorized = ({ sideOffset, className = "" }: { className?: string, sideOffset?: number }) => {

  const user = useUserStore(state => state.user);

  if (!user) return null;
  return (
    <UserDropdown user={user} sideOffset={sideOffset}>
      <UserCircle user={user} className={cn("bg-background", className)} />
    </UserDropdown>
  )
}

const Unauthorized = () => {
  return (
    <div className="flex items-center gap-2">
      <Button><Link href="/login">Войти</Link></Button>
    </div>
  )
}


export { Authorized, Unauthorized };
export default UserWrapper;
