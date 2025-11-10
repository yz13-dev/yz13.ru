import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { blobSchema, newFileObjectSchema } from "../../../../../core/files/models/files.model";
import { newPinSchema, pinArraySchema, pinSchema } from "../../models/pins.model";


export const getPinsRoute = createRoute({
  method: "get",
  path: "/all",
  description: "Get all pins",
  request: {
    query: z.object({
      userId: z.string().optional(),
      boardId: z.string().optional(),
    }),
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
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    },
    500: {
      description: "Bad request",
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
    },
  }
})

export const getSimilarPinsRoute = createRoute({
  method: "get",
  path: "/{pinId}/similar",
  description: "Get similar pins",
  request: {
    params: z.object({
      pinId: z.string()
    }),
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
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    },
    500: {
      description: "Bad request",
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

export const getPinRoute = createRoute({
  method: "get",
  path: "/{pinId}",
  description: "Get a pin",
  request: {
    params: z.object({
      pinId: z.string()
    }),
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: pinSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const uploadPinRoute = createRoute({
  method: "post",
  path: "/{pinId}/upload",
  description: "Upload a file to a pin",
  request: {
    params: z.object({
      pinId: z.string()
    }),
    query: z.object({
      type: z.string()
    }),
    body: {
      content: {
        "multipart/form-data": {
          schema: blobSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: newFileObjectSchema
        }
      }
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },

  }
})

export const createPinRoute = createRoute({
  method: "post",
  path: "/new",
  description: "Create a pin",
  request: {
    body: {
      content: {
        "application/json": {
          schema: newPinSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: pinSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
})

export const updatePinRoute = createRoute({
  method: "patch",
  path: "/{pinId}",
  description: "Update a pin",
  request: {
    params: z.object({
      pinId: z.string()
    }),
    body: {
      content: {
        "application/json": {
          schema: newPinSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: pinSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  },
})

export const deletePinRoute = createRoute({
  method: "delete",
  path: "/{pinId}",
  description: "Delete a pin",
  request: {
    params: z.object({
      pinId: z.string()
    }),
  },
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: pinSchema.nullable()
        }
      }
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },
    502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    },

  }
})


export const getPinsRecommendationsRoute = createRoute({
  method: "get",
  path: "/recommendations",
  description: "Get pins recommendations",
  responses: {
    200: {
      description: "Successful operation",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    }, 500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    }, 502: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    }
  }
})

export const getSearchPinsRoute = createRoute({
  method: "get",
  path: "/search",
  description: "Search pins",
  request: {
    query: z.object({
      q: z.string()
    }),
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
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: pinArraySchema
        }
      }
    },
    500: {
      description: "Bad request",
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
    },
  }
})
