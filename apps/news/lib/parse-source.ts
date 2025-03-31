import { NewArticle } from "rest-api/types/articles";
import * as cheerio from "cheerio";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Parser from "rss-parser";
import { Tables } from "yz13/supabase/database";
dayjs.extend(utc);
export type NewsSource = Tables<"news_sources"> & {
  parse_rules: Tables<"parse_rules">;
};

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

async function fetchHTML(source: NewsSource): Promise<NewArticle[]> {
  if (!source.parse_rules) return [];
  const abort = new AbortController();
  const response = await fetch(source.url, {
    signal: abort.signal,
  });
  setTimeout(() => abort.abort(), 5000);
  const data = await response.text();
  const $ = cheerio.load(data);
  return $(source.parse_rules.article_selector)
    .map((_, el) => {
      const title = $(el)
        .find(source.parse_rules!.title_selector)
        .text()
        .trim();
      const url = $(el).find(source.parse_rules!.link_selector).attr("href");
      const content = $(el)
        .find(source.parse_rules!.content_selector)
        .text()
        .trim();
      const published_at = $(el)
        .find(source.parse_rules!.date_selector)
        .text()
        .trim();
      return {
        source_id: source.id,
        title,
        author: source.name,
        description: "",
        url: url || source.url,
        content,
        published_at,
        source: source.id,
        method: "html",
        img: undefined,
      };
    })
    .get();
}

export type ParseType = "rss" | "html";
export async function parseNews(
  source: NewsSource,
  override?: ParseType,
): Promise<NewArticle[]> {
  const isRSS = override ? override === "rss" : !!source.rss;
  return isRSS ? await fetchRSS(source) : await fetchHTML(source);
}
