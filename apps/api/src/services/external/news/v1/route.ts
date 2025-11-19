import { OpenAPIHono } from "@hono/zod-openapi";
import { indexNewsArticles } from "./controller";
import { indexNewsArticlesRoute } from "./openapi";




export const news = new OpenAPIHono().basePath("/v1")

news.openapi(indexNewsArticlesRoute, indexNewsArticles)
