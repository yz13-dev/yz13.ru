import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const works = new Hono();

works.get("/", async (c) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("works").select("*");
  if (error) {
    return c.json({ status: "error", error: error.message });
  } else return c.json(data);
});

works.get("/:id", async (c) => {
  const cookieStore = cookies();
  const id = c.req.param("id");
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();
  if (error) {
    return c.json({ status: "error", error: error.message });
  } else return c.json(data);
});

works.post("/", async (c) => {
  const cookieStore = cookies();
  const body = await c.req.json();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("works")
    .insert({
      icon: body.icon,
      description: body.description,
      type: body.type || "app",
      name: body.name,
      stage: body.stage || "in_plans",
    })
    .select();
  if (error) {
    return c.json({ status: "error", error: error.message });
  } else return c.json(data);
});

works.put("/:id", async (c) => {
  const cookieStore = cookies();
  const id = c.req.param("id");
  const body = await c.req.json();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("works")
    .update({
      icon: body.icon,
      description: body.description,
      type: body.type || "app",
      name: body.name,
      stage: body.stage || "in_plans",
    })
    .eq("id", id)
    .select();
  if (error) {
    return c.json({ status: "error", error: error.message });
  } else return c.json(data);
});

works.delete("/:id", async (c) => {
  const cookieStore = cookies();
  const id = c.req.param("id");
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("works")
    .delete()
    .eq("id", id)
    .select();
  if (error) {
    return c.json({ status: "error", error: error.message });
  } else return c.json(data);
});
