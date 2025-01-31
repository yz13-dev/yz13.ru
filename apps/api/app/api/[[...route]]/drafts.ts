import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";
dayjs.extend(utc);

export const drafts = new Hono();

drafts.get("/", async (c) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("drafts").select("*");
  if (error) {
    return c.json(error);
  } else return c.json(data);
});

drafts.get("/:id", async (c) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const id = c.req.param("id");
  const { data, error } = await supabase
    .from("drafts")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return c.json(error);
  } else return c.json(data);
});

drafts.post("/", async (c) => {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const body = await c.req.json();
    const published_at = dayjs().utc().toISOString();
    const { data, error } = await supabase
      .from("drafts")
      .insert({
        title: body.title,
        description: body.description,
        animated: body.animated,
        tags: body.tags,
        by: body.by,
        published_at,
      })
      .select("*");
    if (error) {
      return c.json(error);
    } else return c.json(data);
  } catch (error) {
    return c.json(error as any);
  }
});
