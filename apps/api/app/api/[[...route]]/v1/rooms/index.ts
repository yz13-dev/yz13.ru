import { OpenAPIHono } from "@hono/zod-openapi"
import { room } from "./[id]/endpoint"
import { newRoom } from "./new/endpoint"

export const rooms = new OpenAPIHono()

rooms.route("/", room)
rooms.route("/new", newRoom)
