import { OpenAPIHono } from "@hono/zod-openapi";
import { auth } from "./auth/v1/route";
import { users } from "./user/v1/route";


export const core = new OpenAPIHono();


core.route("/users", users);
core.route("/auth", auth);
