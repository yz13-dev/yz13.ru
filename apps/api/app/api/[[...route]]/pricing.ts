import { redis } from "@/extensions/redis";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const pricing = new Hono();

pricing.get("/", async (c) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("pricing").select("*");
  const cache = await redis.get("pricing");
  if (cache) return c.json(cache);
  if (error) return c.json(error);
  else {
    redis.set("pricing", JSON.stringify(data), { ex: 3600 * 24 });
    return c.json(data);
  }
});

pricing.get("/short", async (c) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("pricing")
    .select("id, price, created_at, name, description, type");
  const cache = await redis.get("pricing/short");
  if (cache) return c.json(cache);
  if (error) return c.json(error);
  else {
    redis.set("pricing/short", JSON.stringify(data), { ex: 3600 * 24 });
    return c.json(data);
  }
});
