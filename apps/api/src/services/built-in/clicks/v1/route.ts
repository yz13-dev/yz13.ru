import { OpenAPIHono } from "@hono/zod-openapi";
import { TrackClick } from "./controller";
import { TrackClickRoute } from "./openapi";




export const clicks = new OpenAPIHono().basePath("/v1")


clicks.openapi(TrackClickRoute, TrackClick)
