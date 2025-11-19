import { NewNewsArticle, RiaArticle } from "../models/news.model";






export const fromRia = (source_id: string, article: RiaArticle): NewNewsArticle => {

  return {
    published_at: article.isoDate,
    source_id,
    title: article.title,
    description: null,
    url: article.link,
    method: "rss",
    authors: [],
    thumbnail: article.enclosure ? {
      url: article.enclosure?.url
    } : {},
    tags: article.categories,
    summary: "",
    last_checked_at: (new Date()).toISOString()
  }
}
