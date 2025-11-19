import { parseAuthors } from "../../../../utils/rss";
import { NewNewsArticle, VedomostiArticle } from "../models/news.model";



export const fromVedomosti = (source_id: string, article: VedomostiArticle): NewNewsArticle => {

  const authors = parseAuthors(article.author)

  return {
    published_at: article.isoDate,
    source_id,
    title: article.title,
    description: null,
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
