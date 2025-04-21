import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NewArticle } from "rest-api/types/articles";
import Parser from "rss-parser";
import { Tables } from "yz13/supabase/database";
dayjs.extend(utc);
export type NewsSource = Tables<"news_sources">;

async function fetchRSS(source: NewsSource): Promise<NewArticle[]> {
  if (!source.rss) return [];
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(source.rss);
    // console.log(source.id, feed);
    return feed.items.map((item) => ({
      source_id: source.id,
      method: "rss",
      title: item.title || "Без названия",
      url: item.link || source.url,
      published_at: item.pubDate || dayjs().utc().format(),
      source: source.id,
      author: item.author,
      description: item.description,
      tags: typeof item.categories !== undefined ? item.categories : [],
      img: item.enclosure as NewArticle["img"],
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type ParseType = "rss" | "html";
export async function parseNews(source: NewsSource): Promise<NewArticle[]> {
  const hasRSS = !!source.rss;
  if (hasRSS) return await fetchRSS(source);
  else return [];
}
