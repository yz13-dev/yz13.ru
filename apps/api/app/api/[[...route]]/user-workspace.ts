import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const user_workspace = new Hono();

user_workspace.get("/", async (c) => {
  const uid = c.req.param("uid");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    // @ts-expect-error
    .from("workspaces")
    .select("*")
    // @ts-expect-error
    .eq("user", uid)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) return c.json(error, 404);
  return c.json(data);
});

user_workspace.get("/:wid", async (c) => {
  const uid = c.req.param("uid");
  const wid = c.req.param("wid");

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    // @ts-expect-error
    .from("workspaces")
    .select("*")
    .eq("id", wid)
    // @ts-expect-error
    .eq("user", uid)
    .limit(1)
    .maybeSingle();

  if (error) return c.json(error, 404);
  return c.json(data);
});
