import { parseAuthors } from "../../../../utils/rss";
import { LentaArticle, NewNewsArticle } from "../models/news.model";



export const fromLenta = (source_id: string, article: LentaArticle): NewNewsArticle => {

  const authors = parseAuthors(article.author)

  return {
    published_at: article.isoDate,
    source_id,
    title: article.title,
    description: article.contentSnippet,
    url: article.link,
    method: "rss",
    authors,
    thumbnail: article.enclosure ? {
      url: article.enclosure.url
    } : {},
    tags: article.categories,
    summary: "",
    last_checked_at: (new Date()).toISOString()
  }
}
