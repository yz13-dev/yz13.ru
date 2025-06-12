"use server";
import { makeUserObj } from "@yz13/api/lib/make-user-obj";
import { UserObject } from "@yz13/api/types/user";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";

export const auth = async (): Promise<UserObject | null> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  } else {
    if (!user) return null;
    else return makeUserObj(user);
  }
};

export const authorized = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return false;
  } else {
    return !!user;
  }
};
