import { User } from "@supabase/supabase-js";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const auth = new Hono();

export const makeUserObj = (user: User) => {
  const role = user.user_metadata.role as string;
  const username = user.user_metadata.username as string;
  return {
    id: user.id,
    email: user.email,
    email_confirmed_at: user.email_confirmed_at,
    phone: user.phone,
    created_at: user.created_at,
    updated_at: user.updated_at,
    last_signin_at: user.last_sign_in_at,
    role,
    username,
  };
};
auth.get("/current", async (c) => {
  try {
    const cookieStore = cookies();
    console.log(cookieStore.toString());
    // const cookie = getCookie(c);
    const supabase = createClient(cookieStore);
    const auth = supabase.auth;
    // console.log(cookieStore.getAll(), cookie);
    const {
      data: { user },
      error,
    } = await auth.getUser();
    if (error) {
      // console.log(error);
      return c.json(null);
    } else {
      if (user) {
        return c.json(makeUserObj(user));
      } else return c.json(null);
    }
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
