import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { boardArraySchema, boardSchema, newBoardSchema, updateBoardSchema } from "../../models/boards.model";
import { pinArraySchema } from "../../models/pins.model";

export const getBoardsRoute = createRoute({
  method: "get",
  path: "/all",
  description: "Get all boards",
  request: {
    query: z.object({
      userId: z.string().optional()
    })
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: boardArraySchema
        }
      }
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardArraySchema
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardArraySchema
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardArraySchema
        }
      }
    }
  }
})

export const getBoardPinsRoute = createRoute({
  method: "get",
  path: "/{boardId}/pins",
  description: "Get all pins of a board",
  request: {
    params: z.object({
      boardId: z.string()
    })
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    }
  }
})

export const getBoardRoute = createRoute({
  method: "get",
  path: "/{boardId}",
  description: "Get a board",
  request: {
    params: z.object({
      boardId: z.string()
    })
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    }
  }
})

export const createBoardRoute = createRoute({
  method: "post",
  path: "/new",
  description: "Create a board",
  request: {
    body: {
      content: {
        "application/json": {
          schema: newBoardSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    }
  }
})

export const updateBoardRoute = createRoute({
  method: "patch",
  path: "/{boardId}",
  description: "Update a board",
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateBoardSchema
        }
      }
    },
    params: z.object({
      boardId: z.string()
    })
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    }
  }
})

export const deleteBoardRoute = createRoute({
  method: "delete",
  path: "/{boardId}",
  description: "Delete a board",
  request: {
    params: z.object({
      boardId: z.string()
    })
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: boardSchema.nullable()
        }
      }
    }
  }
})
