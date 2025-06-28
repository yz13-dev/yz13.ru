import { OpenAPIHono } from "@hono/zod-openapi"
import { auth } from "./auth/index"
import { calendar } from "./calendar"
import { charts } from "./charts"
import { events } from "./events/index"
import { news } from "./news/index"
import { by_position } from "./positions/[lang]/[position]/endpoint"
import { by_lang } from "./positions/[lang]/endpoint"
import { pricing } from "./pricing/endpoint"
import { short } from "./pricing/short/endpoint"
import { rooms } from "./rooms/index"
import { schedule } from "./schedule"
import { store } from "./store"
import { user } from "./user/[uid]/endpoint"

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
v1.route("/store", store)
v1.route("/schedule", schedule)
v1.route("/charts", charts)
v1.route("/calendar", calendar)
