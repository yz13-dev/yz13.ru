import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { newTagSchema, tagArraySchema, tagSchema } from "../../models/tags.model";



export const getTagsRoute = createRoute({
  method: "get",
  path: "/all",
  request: {
    query: z.object({
      search: z.string().optional(),
    })
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      }
    },
    400: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      }
    },
    502: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      }
    }
  }
})

export const getSearchTagsRoute = createRoute({
  method: "get",
  path: "/search",
  request: {
    query: z.object({
      q: z.string().optional(),
    })
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      }
    },
    400: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      },
    }, 502: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: tagArraySchema
        }
      }
    }
  }
})

export const getTagRoute = createRoute({
  method: "get",
  path: "/{tagId}",
  request: {
    params: z.object({
      tagId: z.string()
    })
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: tagSchema.nullable()
        }
      }
    },
    400: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const createTagRoute = createRoute({
  method: "post",
  path: "/new",
  request: {
    body: {
      content: {
        "application/json": {
          schema: newTagSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: tagSchema.nullable()
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const updateTagRoute = createRoute({
  method: "patch",
  path: "/{tagId}",
  request: {
    params: z.object({
      tagId: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: newTagSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: tagSchema.nullable()
        }
      }
    },
    400: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const deleteTagRoute = createRoute({
  method: "delete",
  path: "/{tagId}",
  request: {
    params: z.object({
      tagId: z.string()
    })
  },
  responses: {
    200: {
      description: "Successful response",
      content: {
        "application/json": {
          schema: tagSchema.nullable()
        }
      }
    },
    400: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})
