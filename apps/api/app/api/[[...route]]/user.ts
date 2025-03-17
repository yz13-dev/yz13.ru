import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createAdminClient } from "yz13/supabase/admin";
import { makeUserObj } from "./auth";

export const user = new Hono();

user.get("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const cookieStore = cookies();
  const supabase = createAdminClient(cookieStore);
  const {
    data: { user },
    error,
  } = await supabase.auth.admin.getUserById(uid);
  if (error) return c.json(error, 404);
  if (!user) return c.json(null);
  else return c.json(makeUserObj(user));
});
