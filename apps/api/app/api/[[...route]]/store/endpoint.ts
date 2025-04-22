import { expire, redis } from "@/extensions/redis";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const store = new Hono();

store.get("/", async (c) => {
  const key = `store/10`;
  const cookieStore = await cookies();
  try {
    const cache = await redis.get(key);
    console.log(cache);
    if (cache) {
      return c.json(cache);
    } else {
      const supabase = createClient(cookieStore);

      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) {
        return c.json([]);
      } else {
        await redis.set(key, data, { ex: expire.hour });
        return c.json(data);
      }
    }
  } catch (error) {
    console.log(error);
    return c.json([]);
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
  const key = `store/${id}`;
  try {
    const cache = await redis.get(key);
    if (cache) {
      return c.json(cache);
    } else {
      const supabase = createClient(cookieStore);
      const { data, error } = await supabase
        .from("publications")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) {
        console.log(error);
        return c.json(null);
      } else {
        await redis.set(key, data, { ex: expire.hour });
        return c.json(data);
      }
    }
  } catch (error) {
    return c.json({ status: "error" });
  }
});
