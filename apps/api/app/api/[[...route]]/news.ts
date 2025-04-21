import { sourcesWithObjectTags } from "@/const/sources-rules";
import { GeoMiddleware } from "hono-geo-middleware";
import { Hono } from "hono/quick";
import { cookies } from "next/headers";
import { createClient } from "yz13/supabase/server";

export const news = new Hono();

news.use(
  "/*",
  GeoMiddleware({
    extractors: ["vercel", "cloudflare", "cloudflare-worker"],
  }),
);

const parseObjTags = (tags: string[]): string[] => {
  const other = tags
    .filter((tag) => tag !== null)
    .filter((tag) => !tag.startsWith("{") && !tag.endsWith("}"));
  const obj = tags
    .filter((tag) => tag !== null)
    .filter((tag) => tag.startsWith("{") && tag.endsWith("}"))
    .map((tag) => JSON.parse(tag))
    .map((tag) => tag._);
  const union = [...new Set(obj.concat(other))];
  return union;
};

news.get("/news-sources", async (c) => {
  const country_code = c.req.query("country_code");
  const cookieStore = await cookies();
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
  const cookieStore = await cookies();
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

news.get("/country/:code/sources", async (c) => {
  const code = c.req.param("code");
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news_sources")
    .select()
    .eq("country_code", code);
  if (error) {
    return c.json([]);
  } else return c.json(data);
});

news.get("/articles", async (c) => {
  const offset = parseInt(c.req.query("offset") || "0");
  const limit = 10;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news")
    .select()
    .order("published_at", { ascending: false })
    .range(offset, offset + limit);
  if (error) {
    return c.json([]);
  } else return c.json(data);
});

news.get("/articles/:source_id", async (c) => {
  const source_id = c.req.param("source_id");
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news")
    .select()
    .eq("source_id", source_id);
  if (error) {
    return c.json([]);
  } else return c.json(data);
});

news.get("/country/:code/articles", async (c) => {
  const offset = parseInt(c.req.query("offset") || "0");
  const limit = parseInt(c.req.query("limit") || "30");
  const code = String(c.req.param("code")).toUpperCase();
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news_sources")
    .select("id")
    .eq("country_code", code);
  const sources = (data ?? []).map(({ id }) => id);
  const { data: articles, error: articlesError } = await supabase
    .from("news")
    .select()
    .in("source_id", sources)
    .order("published_at", { ascending: false })
    .range(offset, offset + limit);
  if (articlesError) {
    return c.json([]);
  } else return c.json(articles);
});

news.get("/article/:article_id", async (c) => {
  const article_id = c.req.param("article_id");
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("news")
    .select()
    .eq("id", article_id)
    .maybeSingle();
  if (error) {
    return c.json(null);
  } else {
    const tags: string[] = data ? data.tags || [] : [];
    const parsedTags = parseObjTags(tags);
    return c.json({
      ...data,
      tags: parsedTags,
    });
  }
});

news.get("/codes", async (c) => {
  const cookieStore = await cookies();
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

news.get("/categories", async (c) => {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("news").select("tags");
  if (error) {
    return c.json([]);
  } else {
    const tags = data
      .map(({ tags }) => tags)
      .flat()
      .filter((tag) => tag !== null);
    const parsedTags = parseObjTags(tags);
    return c.json(parsedTags);
  }
});

news.patch("/repatch", async (c) => {
  return c.json({ status: "ok" });
  // const cookieStore = await cookies();
  // const supabase = createClient(cookieStore);
  // const { data, error } = await supabase
  //   .from("news")
  //   .select()
  //   .in("source_id", sourcesWithObjectTags);
  // if (error) {
  //   return c.json(null);
  // } else {
  //   const repatched = data.map((article) => {
  //     const tags: string[] = (article.tags || []).filter(
  //       (tag: string | null) => tag !== null,
  //     );
  //     const isSourceWithObjectTags = article.source_id
  //       ? sourcesWithObjectTags.includes(article.source_id)
  //       : false;
  //     const articleTags = isSourceWithObjectTags ? parseObjTags(tags) : tags;
  //     return {
  //       ...article,
  //       tags: articleTags,
  //     };
  //   });
  //   await supabase.from("news").upsert(repatched);
  // return c.json(repatched);
  // }
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
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      const title = article.title;
      const source_id = article.source_id;

      const { data: similarArticles } = await supabase
        .from("news")
        .select()
        .eq("title", title)
        .eq("source_id", source_id);

      if (similarArticles && similarArticles.length > 0) {
        console.log("article already exists", title);
        return c.json(similarArticles);
      } else {
        const tags: string[] = article.tags.filter(
          (tag: string | null) => tag !== null,
        );
        const isSourceWithObjectTags =
          sourcesWithObjectTags.includes(source_id);
        const articleTags = isSourceWithObjectTags ? parseObjTags(tags) : tags;
        const { data, error } = await supabase
          .from("news")
          .insert({ ...article, tags: articleTags })
          .select()
          .maybeSingle();
        console.log(data, error);
        if (error) {
          return c.json(null);
        }
        return c.json(data);
      }
    }
  }
});
