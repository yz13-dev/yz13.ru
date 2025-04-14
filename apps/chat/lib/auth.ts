"use server";
import { cookies } from "next/headers";
import { makeUserObj } from "rest-api/lib/make-user-obj";
import { UserObject } from "rest-api/types/user";
import { createClient } from "yz13/supabase/server";

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
