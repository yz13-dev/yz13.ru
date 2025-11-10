import { OpenAPIHono } from "@hono/zod-openapi";
import { getUserById } from "./controller";
import { getUserByIdRoute } from "./openapi";

export const users = new OpenAPIHono().basePath("/v1");

users.openapi(getUserByIdRoute, getUserById);
