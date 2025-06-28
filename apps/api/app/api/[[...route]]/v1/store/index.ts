import { OpenAPIHono } from "@hono/zod-openapi"
import { storeById } from "./[id]/endpoint"
import { root } from "./root/endpoint"

export const store = new OpenAPIHono()

store.route("", root)
store.route("/", storeById)
