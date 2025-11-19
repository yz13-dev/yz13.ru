import { InterfaxArticle, NewNewsArticle } from "../models/news.model"



export const fromInterafax = (source_id: string, article: InterfaxArticle): NewNewsArticle => {

  return {
    published_at: article.isoDate,
    source_id,
    title: article.title,
    description: article.contentSnippet,
    url: article.link,
    method: "rss",
    authors: [],
    thumbnail: {},
    tags: article.categories,
    summary: "",
    last_checked_at: (new Date()).toISOString()
  }
}
