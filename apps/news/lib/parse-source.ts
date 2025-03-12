import * as cheerio from "cheerio";
import Parser from "rss-parser";
import { Tables } from "yz13/supabase/database";

export type NewsSource = Tables<"news_sources"> & {
  parse_rules: Tables<"parse_rules">;
};
export type News = {
  title: string;
  url: string;
  published_at: string;
  source: string;
  author: string;
  description: string;
  tags: string[];
  img: {
    url: string;
    type: string;
    length: string;
  };
};

async function fetchRSS(source: NewsSource) {
  if (!source.rss) return [];
  try {
    const parser = new Parser();
    const feed = await parser.parseURL(source.rss);
    // console.log(source.id, feed);
    return feed.items.map((item) => ({
      title: item.title,
      url: item.link,
      published_at: item.pubDate,
      source: source.id,
      author: item.author,
      description: item.description,
      tags: item.categories,
      img: item.enclosure,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function fetchHTML(source: NewsSource) {
  if (!source.parse_rules) return [];
  const response = await fetch(source.url);
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

      return { title, url, content, published_at, source: source.id };
    })
    .get();
}

export async function parseNews(source: NewsSource): Promise<News[]> {
  // @ts-expect-error
  return source.rss ? await fetchRSS(source) : await fetchHTML(source);
}
