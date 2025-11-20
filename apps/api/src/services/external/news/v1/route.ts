import { OpenAPIHono } from "@hono/zod-openapi";
import { getLastArticles, getRecentArticles, indexNewsArticles } from "./controller";
import { getLastArticlesRoute, getRecentArticlesRoute, indexNewsArticlesRoute } from "./openapi";




export const news = new OpenAPIHono().basePath("/v1")

news.openapi(indexNewsArticlesRoute, indexNewsArticles)

news.openapi(getLastArticlesRoute, getLastArticles)
news.openapi(getRecentArticlesRoute, getRecentArticles)
