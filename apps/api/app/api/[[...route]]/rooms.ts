import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const rooms = new Hono();

rooms.get("/:id", async (c) => {
  const id = c.req.param("id");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return c.json({ error });
  }

  return c.json(data);
});
