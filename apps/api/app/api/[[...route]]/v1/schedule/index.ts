import { OpenAPIHono } from "@hono/zod-openapi"
import { available } from "./[uid]/available/endpoint"
import { scheduleByUid } from "./[uid]/endpoint"

export const schedule = new OpenAPIHono()

schedule.route("/", scheduleByUid)
schedule.route("/:uid", available)
