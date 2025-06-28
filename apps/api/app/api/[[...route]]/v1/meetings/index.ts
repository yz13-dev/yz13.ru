import { OpenAPIHono } from "@hono/zod-openapi"
import { root } from "./root/endpoint"

export const meetings = new OpenAPIHono()

meetings.route("/", root) 