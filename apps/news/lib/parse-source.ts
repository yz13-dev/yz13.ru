import { GetV1NewsNewsSourcesSourceId200, PostV1NewsArticlesNewBody } from "@yz13/api/types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Parser from "rss-parser";
dayjs.extend(utc);

type NewsSource = GetV1NewsNewsSourcesSourceId200;
type NewArticle = PostV1NewsArticlesNewBody;

async function fetchRSS(source: NewsSource): Promise<PostV1NewsArticlesNewBody[]> {
  if (!source) return [];
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
      tags: item.categories,
      img: item.enclosure as NewArticle["img"],
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

export type ParseType = "rss" | "html";
export async function parseNews(source: NewsSource): Promise<NewArticle[]> {
  if (!source) return [];
  const hasRSS = !!source.rss;
  if (hasRSS) return await fetchRSS(source);
  return [];
}
