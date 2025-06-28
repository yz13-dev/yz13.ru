import { OpenAPIHono } from "@hono/zod-openapi"
import { newsSources } from "./news-sources/endpoint"
import { newsSource } from "./news-sources/[source_id]/endpoint"
import { countrySources } from "./country/[code]/sources/endpoint"
import { articles } from "./articles/endpoint"
import { articlesBySource } from "./articles/[source_id]/endpoint"
import { newArticle } from "./articles/new/endpoint"
import { countryArticles } from "./country/[code]/articles/endpoint"
import { article } from "./article/[article_id]/endpoint"
import { codes } from "./codes/endpoint"
import { categories } from "./categories/endpoint"
import { repatch } from "./repatch/endpoint"
import { clearCacheEndpoint } from "./cache/clear/endpoint"

export const news = new OpenAPIHono()

news.route("/news-sources", newsSources)
news.route("/news-sources/", newsSource)
news.route("/country/:code/sources", countrySources)
news.route("/articles", articles)
news.route("/articles/", articlesBySource)
news.route("/articles/new", newArticle)
news.route("/country/:code/articles", countryArticles)
news.route("/article/", article)
news.route("/codes", codes)
news.route("/categories", categories)
news.route("/repatch", repatch)
news.route("/cache/clear", clearCacheEndpoint) 