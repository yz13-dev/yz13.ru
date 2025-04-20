"use server";

import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { makeUserObj } from "./make-user-obj";

export async function isAdmin() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) return false;
  if (!user) return false;
  const obj = makeUserObj(user);
  return obj.role === "admin";
}
