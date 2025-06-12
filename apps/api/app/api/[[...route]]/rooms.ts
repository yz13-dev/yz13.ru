import { createClient } from "@yz13/supabase/server";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";

export const rooms = new Hono();

rooms.get("/:id", async (c) => {
  const id = c.req.param("id");
  const cookieStore = await cookies();
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

rooms.post("/new", async (c) => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const body = await c.req.json();

    const { data, error } = await supabase
      .from("rooms")
      .insert({
        max_members: body.max_members,
        name: body.name,
        public: body.public,
        owner: body.owner,
      })
      .select()
      .limit(1)
      .single();
    if (error) {
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
