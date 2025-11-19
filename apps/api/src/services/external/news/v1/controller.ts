import { differenceInMinutes, formatRelative } from "date-fns";
import { ru } from "date-fns/locale";
import type { Context } from "hono";
import { getSupabase as getAdminSupabase } from "../../../../middlewares/admin.supabase.middleware";
import { parseRSS } from "../../../../utils/rss";
import { applyAdapters } from "../adapters/adapters";
import type { NewsSource } from "../models/news-source.model";
import type { CommonArticle, NewNewsArticle } from "../models/news.model";

// TODO: refactor this maybe???
export const indexNewsArticles = async (c: Context) => {
  try {
    const start = performance.now();

    const supabase = getAdminSupabase(c);

    const markSourceAsChecked = async (source_id: string) => {
      try {
        const { data, error } = await supabase
          .from("news_sources")
          .update({ last_checked_at: (new Date()).toISOString() })
          .eq("id", source_id)
          .select("*")

        if (error) return []

        return data

      } catch (error) {
        console.warn(error)
        return []
      }
    }

    const checkForDuplicate = async (c: Context, url: string) => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .eq("url", url)
          .limit(1)
          .maybeSingle()

        if (error) return false;

        if (data) {
          console.log("Duplicate article", url)
          return true
        }

        return false

      } catch (error) {
        console.warn(error)
        return false
      }
    }

    const getSources = async (c: Context): Promise<NewsSource[]> => {
      try {
        const { data, error } = await supabase
          .from("news_sources")
          .select("*")

        if (error) return []

        return data

      } catch (error) {
        console.warn(error)
        return []
      }
    }

    const writeNews = async (c: Context, rows: NewNewsArticle[]) => {
      try {
        const { data, error } = await supabase
          .from("news")
          .insert(rows)
          .select("*")

        if (error) return []

        return data

      } catch (error) {
        console.log(error)
        return []
      }
    }

    const sources = await getSources(c)

    let count = 0

    for (const source of sources) {

      console.log("Indexing", source.name)

      const hasChecked = source.last_checked_at !== null
      const lastCheckedRecently = source.last_checked_at ? differenceInMinutes(new Date(), new Date(source.last_checked_at)) < 5 : false

      if (hasChecked && lastCheckedRecently) {
        console.log(source.name, "Already checked recently, skip")
        if (source.last_checked_at) console.log(differenceInMinutes(new Date(), new Date(source.last_checked_at)))
        continue;
      }

      if (source.last_checked_at)
        console.log(
          "Last checked",
          formatRelative(new Date(source.last_checked_at), new Date(), {
            locale: ru,
          }),
          "Last checked was",
          differenceInMinutes(new Date(), new Date(source.last_checked_at)),
          "minutes ago"
        )

      const rss = source.rss;

      if (!rss) continue;

      await markSourceAsChecked(source.id);

      const feed = await parseRSS(rss);

      const items = (feed?.items || []) as CommonArticle[];

      if (!feed) {
        console.log(source.name, "No feed found, skip")
        continue;
      }

      const filter = (await Promise.all(
        items.map(async (item) => {
          const hasDuplicate = await checkForDuplicate(c, item.link)
          if (hasDuplicate) return;
          return item;
        })
      )).filter(item => item !== undefined)

      console.log("Filtered", filter.length, "items", filter)


      const withAdapters = await applyAdapters(source, filter);

      count += withAdapters.count;

      const articles = withAdapters.articles;

      await writeNews(c, articles)

    }
    const end = performance.now();

    const time = end - start;
    const inSeconds = (time / 1000).toFixed(2);
    console.log("Indexing took", inSeconds, "s.")

    return c.json({
      count,
    }, 200)
  } catch (error) {
    console.warn(error)

    return c.json({
      count: 0,
    }, 500)
  }
}
