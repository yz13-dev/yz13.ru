import { OpenAPIHono } from "@hono/zod-openapi";
import { boards } from "./boards/route";
import { pins as pinsRoute } from "./pins/route";
import { tags } from "./tags/route";


export const pins = new OpenAPIHono().basePath("/v1")


pins.route("/pins", pinsRoute)
pins.route("/boards", boards)
pins.route("/tags", tags)
