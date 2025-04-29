import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
import { getUser } from "../user";

export const schedule = new Hono();

schedule.post("/:uid", async (c) => {
  const uid = c.req.param("uid");
  const user = await getUser(uid);
  if (!user) return c.json(null);
  const body = await c.req.json();
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_schedule")
      .insert(body)
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    }
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
