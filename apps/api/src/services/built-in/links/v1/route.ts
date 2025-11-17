import { OpenAPIHono } from "@hono/zod-openapi";
import { getLink } from "./controller";
import { getLinkRoute } from "./openapi";



export const links = new OpenAPIHono().basePath("/v1")

links.openapi(getLinkRoute, getLink)
