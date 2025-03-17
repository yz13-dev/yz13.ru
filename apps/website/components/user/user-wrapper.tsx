"use client";
import { getAuthorizedUser } from "@/actions/user/user";
import { User } from "@supabase/supabase-js";
import { ReactElement, useEffect, useState } from "react";
import SignInButton from "./sign-in-button";
import UserCircle from "./user-circle";
import UserDropdown from "./user-dropdown";

type WrapperProps = {
  authorized?: (
    user: User,
  ) =>
    | ReactElement<typeof UserCircle>
    | ReactElement<typeof SignInButton>
    | ReactElement<typeof UserDropdown>;
  unauthorized?: ReactElement<typeof SignInButton>;
};
const UserWrapper = ({ authorized, unauthorized }: WrapperProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getAuthorizedUser().then((user) => setUser(user));
    setLoading(false);
  }, []);
  if (loading) return <div className="rounded-full bg-neutral-200 size-9" />;
  if (!authorized && !unauthorized) return;
  if (user && authorized) return authorized(user);
  else return unauthorized;
};

export default UserWrapper;
