"use client";
import { useUserStore } from "@/app/account/settings/user.store";
import { getAuthorizedUser } from "@yz13/api/auth";
import type { UserObject } from "@yz13/api/types/user";
import { createClient } from "@yz13/supabase/client";
import { type ReactElement, useEffect, useState } from "react";
import type SignInButton from "./sign-in-button";
import type UserCircle from "./user-circle";
import type UserDropdown from "./user-dropdown";

type WrapperProps = {
  authorized?: (
    user: UserObject,
  ) =>
    | ReactElement<typeof UserCircle>
    | ReactElement<typeof SignInButton>
    | ReactElement<typeof UserDropdown>;
  unauthorized?: ReactElement<typeof SignInButton>;
};

const UserWrapper = ({ authorized, unauthorized }: WrapperProps) => {
  const [user, setUser] = useState<UserObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const setUserInStore = useUserStore(state => state.setUser);
  const refreshUser = async () => {
    const { data: user } = await getAuthorizedUser()
    if (user) {
      setUser(user);
      setUserInStore(user);
    }
  }
  useEffect(() => {
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
  }, []);
  if (loading) return <div className="rounded-full bg-neutral-200 size-9" />;
  if (!authorized && !unauthorized) return;
  if (user && authorized) return authorized(user);
  return unauthorized;
};

export default UserWrapper;
