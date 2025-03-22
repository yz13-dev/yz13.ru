import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const news = new Hono();

news.get("/news-sources", async (c) => {
  const country_code = c.req.query("country_code");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  if (country_code) {
    const { data, error } = await supabase
      .from("news_sources")
      .select()
      .eq("country_code", country_code.toUpperCase());
    if (error) {
      return c.json([]);
    } else return c.json(data);
  } else {
    const { data, error } = await supabase.from("news_sources").select();
    if (error) {
      return c.json([]);
    } else return c.json(data);
  }
});
news.get("/news-sources/:source_id", async (c) => {
  const source_id = c.req.param("source_id");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news_sources")
    .select()
    .eq("id", source_id)
    .limit(1)
    .maybeSingle();
  if (error) {
    return c.json(null);
  } else return c.json(data);
});

news.get("/parse-rules/:source_id", async (c) => {
  const source_id = c.req.param("source_id");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("parse_rules")
    .select()
    .eq("source_id", source_id)
    .limit(1)
    .maybeSingle();
  if (error) {
    return c.json(null);
  } else return c.json(data);
});
news.get("/articles/:source_id", async (c) => {
  const source_id = c.req.param("source_id");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news")
    .select()
    .eq("source_id", source_id);
  if (error) {
    return c.json([]);
  } else return c.json(data);
});

news.get("/codes", async (c) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news_sources")
    .select("country_code");
  if (error) {
    return c.json([]);
  } else {
    const codes = data.map(({ country_code }) => country_code);
    const unique = [...new Set(codes)];
    return c.json(unique);
  }
});

news.post("/articles/new", async (c) => {
  const token = c.req.header("Authorization");
  if (!token) {
    return c.json({ error: "Unauthorized" }, 401);
  } else {
    const NEWS_API_TOKEN = process.env.NEWS_API_TOKEN;
    const tokenValid = token.replace("Bearer ", "") === NEWS_API_TOKEN;
    if (!tokenValid) {
      return c.json({ error: "Unauthorized" }, 401);
    } else {
      const article = await c.req.json();
      return c.json(article);
    }
  }
});
