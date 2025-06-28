import { OpenAPIHono } from "@hono/zod-openapi"
import { root } from "./root/endpoint"
import { storeById } from "./[id]/endpoint"

export const store = new OpenAPIHono()

store.route("/", root)
store.route("/:id", storeById) 