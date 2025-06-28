import { OpenAPIHono } from "@hono/zod-openapi"
import { calendarById } from "./[id]/endpoint"
import { defaultCalendar } from "./user/[uid]/default/endpoint"
import { calendarsByUid } from "./user/[uid]/endpoint"

export const calendar = new OpenAPIHono()

calendar.route("/user/:uid/", defaultCalendar)
calendar.route("/user", calendarsByUid)
calendar.route("/", calendarById)
