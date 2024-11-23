"use server";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const auth = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    return null;
  } else {
    return user;
  }
};
