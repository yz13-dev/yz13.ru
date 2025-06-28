import { OpenAPIHono } from "@hono/zod-openapi"
import { news } from "./news/endpoint"

export const charts = new OpenAPIHono()

charts.route("/", news)
