"use server";
import { makeUserObj } from "@yz13/api/lib/make-user-obj";
import type { UserObject } from "@yz13/api/types/user";
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
  }
  if (!user) return null;
  return makeUserObj(user);
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
  }
  return !!user;
};
