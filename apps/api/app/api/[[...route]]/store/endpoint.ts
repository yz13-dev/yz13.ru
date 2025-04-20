import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const store = new Hono();

store.get("/", async (c) => {
  const cookieStore = await cookies();
  try {
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .limit(10);
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    return c.json({ status: "error" });
  }
});

store.post("/", async (c) => {
  const body = await c.req.json();
  const cookieStore = await cookies();
  try {
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("publications").insert(body);
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    return c.json({ status: "error" });
  }
});

store.get("/:id", async (c) => {
  const cookieStore = await cookies();
  const id = c.req.param("id");
  try {
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) {
      console.log(error);
      return c.json(null);
    } else return c.json(data);
  } catch (error) {
    return c.json({ status: "error" });
  }
});
