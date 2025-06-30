import { sourcesWithObjectTags } from "@/const/sources-rules";
import { expire, redis } from "@/extensions/redis";
import { clearNewsCache } from "@/lib/cache";
import type { News, NewsInsert } from "@/schemas/news";
import type { NewsSource } from "@/schemas/news-sources";
import { createClient } from "@yz13/supabase/server";
import { addDays, format, parseISO } from "date-fns";
import { cookies } from "next/headers";

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

export const getNewsSources = async (countryCode?: string): Promise<NewsSource[]> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    if (countryCode) {
      const { data, error } = await supabase
        .from("news_sources")
        .select()
        .eq("country_code", countryCode.toUpperCase());

      if (error) {
        return [];
      }
      return data || [];
    }

    const { data, error } = await supabase.from("news_sources").select();
    if (error) {
      return [];
    }
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getNewsSourceById = async (sourceId: string): Promise<NewsSource | null> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("news_sources")
      .select()
      .eq("id", sourceId)
      .limit(1)
      .maybeSingle();

    if (error) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCountrySources = async (code?: string): Promise<NewsSource[]> => {
  try {
    if (!code) {
      return [];
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("news_sources")
      .select("*")
      .eq("country_code", code.toUpperCase());

    if (error) {
      return [];
    }
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getArticles = async (offset: number = 0, limit: number = 10): Promise<News[]> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("news")
      .select(
        `
        *,
        news_source:news_sources(*)
        `,
      )
      .order("published_at", { ascending: false })
      .range(offset, offset + limit);

    if (error) {
      return [];
    }
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getArticlesBySource = async (sourceId: string): Promise<News[]> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("news")
      .select(
        `
        *,
        news_source:news_sources(*)
        `,
      )
      .eq("source_id", sourceId);

    if (error) {
      return [];
    }
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCountryArticles = async (code?: string, offset: number = 0, limit?: number, dateQuery?: string): Promise<News[]> => {

  try {
    if (!code) {
      return [];
    }

    const defaultDate = new Date();
    const date = format(
      dateQuery ? parseISO(dateQuery) : defaultDate,
      "yyyy-MM-dd",
    );
    const chunkSize = 4;
    const nextDate = format(addDays(date, 1), "yyyy-MM-dd");
    const key = `news:${date}-${nextDate}:${offset}`;

    const cached = await redis.get<News[]>(key);
    if (cached) return cached;

    const actualLimit = limit || (chunkSize * 4);
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("news")
      .select(
        `
        *,
        news_source:news_sources(*)
        `,
      )
      .eq("news_source.country_code", code.toUpperCase())
      .order("published_at", { ascending: false })
      .gte("published_at", date)
      .lte("published_at", nextDate)
      .range(offset, offset + actualLimit);

    const articles = (data ?? []).filter((article) => !!article.news_source);

    if (error) {
      return [];
    }

    if (articles.length > 0) await redis.set(key, articles, { ex: expire.hour });

    return articles;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getArticleById = async (articleId: string): Promise<News | null> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("news")
      .select(
        `
        *,
        news_source:news_sources(*)
        `,
      )
      .eq("id", articleId)
      .limit(1)
      .maybeSingle();

    if (error) {
      return null;
    }
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCountryCodes = async (): Promise<string[]> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("news_sources")
      .select("country_code");

    if (error) {
      return [];
    }

    const codes = data.map(({ country_code }) => country_code);
    const unique = [...new Set(codes)];
    return unique;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.from("news").select("tags");

    if (error) {
      return [];
    }

    const tags = data
      .map(({ tags }) => tags)
      .flat()
      .filter((tag) => tag !== null);
    const parsedTags = parseObjTags(tags);
    return parsedTags;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const createArticle = async (article: NewsInsert): Promise<News | null> => {
  try {
    // const NEWS_API_TOKEN = process.env.NEWS_API_TOKEN;
    // const tokenValid = token.replace("Bearer ", "") === NEWS_API_TOKEN;

    // if (!tokenValid) {
    // return { error: "Unauthorized" };
    // }

    if (!article.source_id) {
      console.log("article.source_id", article.source_id);
      return null;
    }

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
      console.log("article already exists", title, similarArticles.length);
      return null
    }

    const tags: string[] = (article.tags || []).filter(
      (tag: string | null) => tag !== null,
    );
    const isSourceWithObjectTags = sourcesWithObjectTags.includes(source_id || "");
    const articleTags = isSourceWithObjectTags ? parseObjTags(tags) : tags;

    const { data, error } = await supabase
      .from("news")
      .insert({ ...article, tags: articleTags })
      .select()
      .maybeSingle();

    console.log(data, error);
    if (error) {
      console.log(error)
      return null
    }

    if (!data) {
      return null
    }

    return data
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const clearCache = async (): Promise<boolean> => {
  try {
    await clearNewsCache();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
