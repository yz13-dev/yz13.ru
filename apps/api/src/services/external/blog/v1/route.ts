import { OpenAPIHono } from "@hono/zod-openapi";
import { adminSupabaseMiddleware } from "../../../../middlewares/admin.supabase.middleware";
import { createApiKeyMiddleware } from "../../../../middlewares/api-keys.middleware";
import { getDrafts, getPosts, uploadDraft, uploadPost } from "./controller";
import { getDraftsRoute, getPostsRoute, uploadDraftRoute, uploadPostRoute } from "./openapi";

export const blog = new OpenAPIHono().basePath("/v1")

// Middleware для чтения черновиков
blog.use("/drafts", createApiKeyMiddleware(["drafts:read"]))
blog.use("/posts", adminSupabaseMiddleware())

// GET endpoints
blog.openapi(getPostsRoute, getPosts)
blog.openapi(getDraftsRoute, getDrafts)

// POST endpoints для загрузки
blog.openapi(uploadPostRoute, uploadPost)
blog.openapi(uploadDraftRoute, uploadDraft)
