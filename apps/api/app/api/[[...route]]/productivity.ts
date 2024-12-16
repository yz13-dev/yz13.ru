import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const lists = new Hono();
export const todo = new Hono();

lists.get("/:listId", async (c) => {
  const listId = c.req.param("listId");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    // @ts-expect-error
    .from("lists")
    .select()
    .eq("id", listId)
    .limit(1)
    .maybeSingle();
  if (error) {
    return c.json(null);
  } else {
    return c.json(data);
  }
});

lists.get("/:listId/all", async (c) => {
  const listId = c.req.param("listId");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    // @ts-expect-error
    .from("tasks")
    .select()
    .eq("list_id", listId);
  if (error) {
    return c.json(null);
  } else {
    return c.json(data);
  }
});
