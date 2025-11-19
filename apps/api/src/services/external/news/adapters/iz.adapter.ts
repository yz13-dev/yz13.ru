import { parseAuthors } from "../../../../utils/rss"
import { IzArticle, NewNewsArticle } from "../models/news.model"




export const fromIz = (source_id: string, article: IzArticle): NewNewsArticle => {

  const authors = parseAuthors(article.author)

  return {
    published_at: article.isoDate,
    source_id,
    title: article.title,
    description: article.contentSnippet || null,
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
