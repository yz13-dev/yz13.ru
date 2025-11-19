import { NewNewsArticle, TassArticle } from "../models/news.model";



export const fromTass = (source_id: string, article: TassArticle): NewNewsArticle => {

  return {
    published_at: article.isoDate,
    source_id,
    title: article.title,
    description: article?.contentSnippet || null,
    url: article.link,
    method: "rss",
    authors: [],
    thumbnail: {},
    tags: article.categories,
    summary: "",
    last_checked_at: (new Date()).toISOString()
  }
}
