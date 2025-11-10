import { OpenAPIHono } from "@hono/zod-openapi";
import { getMe, login, logout, register } from "./controller";
import { getMeRoute, loginRoute, logoutRoute, registerRoute } from "./openapi";

export const auth = new OpenAPIHono().basePath("/v1");

auth.openapi(getMeRoute, getMe)

auth.openapi(loginRoute, login)
auth.openapi(registerRoute, register)
auth.openapi(logoutRoute, logout)
