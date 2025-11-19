import Parser from "rss-parser"


export const parseRSS = async (rss: string) => {
  try {
    const parser = new Parser()

    const feed = await parser.parseURL(rss)

    return feed
  } catch (error) {
    console.warn(error)
    return null
  }
}

export const parseAuthors = (authors: string) => {
  if (!authors) return []
  if (!authors.includes(",")) return [];
  return authors.split(",").map(name => name.trim())
}
