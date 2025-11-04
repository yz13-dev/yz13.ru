import { createRoute, z } from "@hono/zod-openapi";
import { blogDraftArraySchema, blogPostArraySchema } from "../models/blog.model";

// Убираем неправильный FileSchema и создаем правильную схему для multipart
export const uploadRequestSchema = z.object({
  file: z.string().openapi({
    type: 'string',
    format: 'binary',
    description: 'Markdown file to upload'
  }),
  name: z.string().optional().openapi({
    description: 'Optional name for the file (without .md extension)'
  })
});

export const getPostsRoute = createRoute({
  method: "get",
  path: "/posts",
  responses: {
    200: {
      description: "Successful",
      content: {
        "application/json": {
          schema: blogPostArraySchema
        }
      }
    },
    502: {
      description: "Bad Gateway",
      content: {
        "application/json": {
          schema: blogPostArraySchema
        }
      }
    },
  }
})


export const getDraftsRoute = createRoute({
  method: "get",
  path: "/drafts",
  responses: {
    200: {
      description: "Successful",
      content: {
        "application/json": {
          schema: blogDraftArraySchema
        }
      }
    },
    502: {
      description: "Bad Gateway",
      content: {
        "application/json": {
          schema: blogDraftArraySchema
        }
      }
    },
  }
})

export const uploadPostRoute = createRoute({
  method: "post",
  path: "/posts",
  request: {
    query: z.object({
      name: z.string().optional(),
    }),
    body: {
      content: {
        "multipart/form-data": {
          schema: uploadRequestSchema
        }
      },
    }
  },
  responses: {
    200: {
      description: "Successful",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
            path: z.string(),
            fullPath: z.string(),
          }).nullable()
        }
      }
    },
    400: {
      description: "Bad Request - Invalid file or missing file",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Bad Gateway",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const uploadDraftRoute = createRoute({
  method: "post",
  path: "/drafts",
  request: {
    query: z.object({
      name: z.string().optional(),
    }),
    body: {
      content: {
        "multipart/form-data": {
          schema: uploadRequestSchema
        }
      },
    }
  },
  responses: {
    200: {
      description: "Successful",
      content: {
        "application/json": {
          schema: z.object({
            id: z.string(),
            path: z.string(),
            fullPath: z.string(),
          }).nullable()
        }
      }
    },
    400: {
      description: "Bad Request - Invalid file or missing file",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Bad Gateway",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})
