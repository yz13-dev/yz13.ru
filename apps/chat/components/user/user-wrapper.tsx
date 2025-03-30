"use client";
import { makeUserObj } from "@/lib/make-user-obj";
import { ReactElement, useEffect, useState } from "react";
import { UserObject } from "rest-api/types/user";
import { createClient } from "yz13/supabase/client";
import SignInButton from "./sign-in-button";
import UserCircle from "./user-circle";
import UserDropdown from "./user-dropdown";

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
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setUser(null);
        return;
      }
      const { user } = session;
      if (user) setUser(makeUserObj(user));
      if (!user) setUser(null);
    });
    setLoading(false);
  }, []);
  if (loading) return <div className="rounded-full bg-neutral-200 size-9" />;
  if (!authorized && !unauthorized) return;
  if (user && authorized) return authorized(user);
  else return unauthorized;
};

export default UserWrapper;
