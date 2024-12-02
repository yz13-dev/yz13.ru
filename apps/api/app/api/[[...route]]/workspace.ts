import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const workspace = new Hono();

workspace.get("/:wid", async (c) => {
  const wid = c.req.param("wid");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    // @ts-expect-error
    .from("workspaces")
    .select("*")
    .eq("id", wid)
    .limit(1)
    .maybeSingle();

  if (error) return c.json(error, 404);
  return c.json(data);
});
