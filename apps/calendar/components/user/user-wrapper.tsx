"use client";
import UserCircle from "@/components/user/user-circle";
import UserDropdown from "@/components/user/user-dropdown";
import { getV1AuthCurrent } from "@yz13/api";
import { GetV1UserUid200 } from "@yz13/api/types";
import { createClient } from "@yz13/supabase/client";
import { Button } from "@yz13/ui/components/button";
import Link from "next/link";
import { useEffect, useState } from "react";

type WrapperProps = {
  defaultUser?: GetV1UserUid200;
  sideOffset?: number
};

const UserWrapper = ({ defaultUser, sideOffset }: WrapperProps) => {
  const [user, setUser] = useState<GetV1UserUid200 | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const refreshUser = async () => {
    const user = await getV1AuthCurrent()
    if (user) {
      setUser(user);
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
  if (loading) return <div className="rounded-full bg-neutral-200 size-9" />;
  if (user) return <Authorized sideOffset={sideOffset} user={user} />
  return <Unauthorized />;
};

const Authorized = ({ user, sideOffset }: { user?: GetV1UserUid200, sideOffset?: number }) => {

  if (!user) return null;
  return (
    <UserDropdown user={user} sideOffset={sideOffset}>
      <UserCircle user={user} className="bg-background" />
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
