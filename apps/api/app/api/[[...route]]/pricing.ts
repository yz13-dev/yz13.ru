import { expire, redis } from "@/extensions/redis";
import { createClient } from "@yz13/supabase/server";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";

export const pricing = new Hono();

pricing.get("/", async (c) => {
  const key = "pricing";
  try {
    const cache = await redis.get(key);
    if (cache) return c.json(cache);

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.from("pricing").select("*");
    if (error) return c.json(error);
    else {
      redis.set(key, JSON.stringify(data), { ex: expire.day });
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});

pricing.get("/short", async (c) => {
  const key = "pricing/short";
  try {
    const cache = await redis.get(key);
    if (cache) return c.json(cache);
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from("pricing")
      .select("id, price, created_at, name, description, type");
    if (error) return c.json(error);
    else {
      redis.set(key, JSON.stringify(data), { ex: expire.day });
      return c.json(data);
    }
  } catch (error) {
    console.log(error);
    return c.json([]);
  }
});
