import { OpenAPIHono } from "@hono/zod-openapi"
import { scheduleByUid } from "./[uid]/endpoint"
import { available } from "./[uid]/available/endpoint"

export const schedule = new OpenAPIHono()

schedule.route("/:uid", scheduleByUid)
schedule.route("/:uid/available", available) 