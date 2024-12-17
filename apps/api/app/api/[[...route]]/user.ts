import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createAdminClient } from "yz13/supabase/admin";
import { createClient } from "yz13/supabase/server";

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
  return c.json(user);
});

user.post("/:uid/workspace", async (c) => {
  const uid = c.req.param("uid");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    // @ts-expect-error
    .from("workspaces")
    // @ts-expect-error
    .insert([{ user: uid }])
    .select();
  if (error) {
    return c.json(null);
  } else {
    return c.json(data);
  }
});

user.get("/:uid/workspaces", async (c) => {
  const uid = c.req.param("uid");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    // @ts-expect-error
    .from("workspaces")
    .select()
    .eq("user", uid);
  if (error) {
    return c.json([]);
  } else {
    return c.json(data);
  }
});

user.get("/:uid/lists", async (c) => {
  const uid = c.req.param("uid");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    // @ts-expect-error
    .from("lists")
    .select()
    .eq("user", uid);
  if (error) {
    return c.json([]);
  } else {
    return c.json(data);
  }
});
