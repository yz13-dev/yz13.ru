import { OpenAPIHono } from "@hono/zod-openapi"
import { defaultCalendar } from "./user/[uid]/default/endpoint"
import { calendarsByUid } from "./user/[uid]/endpoint"
import { calendarById } from "./[id]/endpoint"

export const calendar = new OpenAPIHono()

calendar.route("/user/:uid/default", defaultCalendar)
calendar.route("/user/:uid", calendarsByUid)
calendar.route("/:id", calendarById) 