import { OpenAPIHono } from "@hono/zod-openapi"
import { by_position } from "./positions/[lang]/[position]/endpoint"
import { by_lang } from "./positions/[lang]/endpoint"
import { pricing } from "./pricing/endpoint"
import { short } from "./pricing/short/endpoint"
import { user } from "./user/[uid]/endpoint"
import { auth } from "./auth/index"
import { rooms } from "./rooms/index"
import { news } from "./news/index"
import { events } from "./events/index"

export const v1 = new OpenAPIHono()

v1.route("/positions", by_lang)
v1.route("/positions/:lang", by_position)
v1.route("/pricing", pricing)
v1.route("/pricing/short", short)
v1.route("/user", user)
v1.route("/auth", auth)
v1.route("/rooms", rooms)
v1.route("/news", news)
v1.route("/events", events)
