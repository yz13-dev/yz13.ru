import z from "zod";




export const newsSchema = z.object({
  id: z.string(),
  published_at: z.string(),
  source_id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  url: z.string(),
  method: z.string(),
  authors: z.string().array(),
  thumbnail: z.object({
    url: z.string().optional()
  }),
  tags: z.string().array(),
  summary: z.string(),
  last_checked_at: z.string().nullable(),
})

export const newNewsSchema = newsSchema.omit({
  id: true
})

export const newsSchemaArray = z.array(newsSchema)

export type NewNewsArticle = z.infer<typeof newNewsSchema>;
export type NewsArticle = z.infer<typeof newsSchema>
export type NewsArticleArray = z.infer<typeof newsSchema>[]



export type RiaArticle = {
  title: string
  link: string
  pubDate: string
  guid: string
  categories: string[],
  isoDate: string
  enclosure?: {
    url: string;
    type: string;
  };
  itunes: { [key: string]: any }
}

export type InterfaxArticle = {
  title: string,
  link: string
  pubDate: string
  content: string
  contentSnippet: string
  guid: string
  categories: string[]
  isoDate: string
}

export type RBKArticle = {
  creator: string
  title: string
  link: string
  pubDate: string
  author: string
  enclosure: {
    url: string
    type: string
    length: string
  },
  content: string
  contentSnippet: string
  guid: string
  categories: string[]
  isoDate: string
}

export type LentaArticle = {
  creator: string
  title: string
  link: string
  pubDate: string
  author: string
  enclosure: {
    url: string
    type: string
    length: string
  },
  content: string
  contentSnippet: string
  guid: string
  categories: string[]
  isoDate: string
}

export type TassArticle = {
  title: string
  link: string
  pubDate: string
  guid: string
  categories: string[]
  isoDate: string
  content?: string
  contentSnippet?: string
}

export type IzArticle = {
  creator: string
  title: string
  link: string
  pubDate: string
  author: string
  enclosure: {
    url: string
    type: string
    length: string
  },
  content?: string
  contentSnippet?: string
  guid: string
  categories: string[],
  isoDate: string
}

export type VedomostiArticle = {
  creator: string
  title: string
  link: string
  pubDate: string
  author: string
  enclosure: {
    url: string
    type: string
    length: string
  },
  guid: string
  categories: string[]
  isoDate: string
}

export type CommonArticle = {
  title: string
  link: string
  pubDate: string
  guid: string
  categories: string[]
  isoDate: string
  author?: string
  creator?: string
  enclosure?: {
    url: string
    type: string
    length: string
  }
  content?: string
  contentSnippet?: string
}
