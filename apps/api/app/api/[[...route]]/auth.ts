import { makeUserObj } from "@/lib/make-user-obj";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const auth = new Hono();

auth.get("/current", async (c) => {
  try {
    const cookieStore = cookies();
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
