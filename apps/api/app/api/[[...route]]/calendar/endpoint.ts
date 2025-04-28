import { isValid, parse } from "date-fns";
import { Hono } from "hono";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const calendar = new Hono();

calendar.get("/date/:date", async (c) => {
  const date = c.req.param("date");
  if (!date)
    return c.json({ error: "date is required, example: 2023-12-01" }, 400);

  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const valid = isValid(parsedDate);
  if (!valid)
    return c.json({ error: "invalid date, example: 2023-12-01" }, 400);
  return c.json({ date });
});

calendar.get("/user/:uid", async (c) => {
  const uid = c.req.param("uid");
  if (!uid) return c.json({ error: "uid is required" }, 400);
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_events")
      .select()
      .eq("uid", uid)
      .limit(10);
    if (error) {
      console.log(error);
      return c.json([], 400);
    } else return c.json(data);
  } catch (error) {
    return c.json([], 400);
  }
});

calendar.post("/", async (c) => {
  const body = await c.req.json();
  if (!body) return c.json(null, 400);
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("calendar_events")
      .insert(body)
      .select()
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null, 400);
    } else return c.json(data);
  } catch (error) {
    return c.json(null, 400);
  }
});
