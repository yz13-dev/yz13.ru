import { OpenAPIHono } from "@hono/zod-openapi";
import { users } from "./user/v1/route";


export const core = new OpenAPIHono();


core.route("/users", users);
