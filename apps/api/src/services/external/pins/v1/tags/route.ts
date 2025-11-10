import { OpenAPIHono } from "@hono/zod-openapi";
import { createTag, deleteTag, getSearchTags, getTag, getTags, updateTag } from "./controller";
import { createTagRoute, deleteTagRoute, getSearchTagsRoute, getTagRoute, getTagsRoute, updateTagRoute } from "./openapi";




export const tags = new OpenAPIHono()

tags.openapi(getSearchTagsRoute, getSearchTags)

tags.openapi(getTagsRoute, getTags)
tags.openapi(getTagRoute, getTag)

tags.openapi(createTagRoute, createTag)
tags.openapi(updateTagRoute, updateTag)
tags.openapi(deleteTagRoute, deleteTag)
