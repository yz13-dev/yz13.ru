import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { userSchema } from "../../user/models/user.model";
import { loginRequestSchema, registerRequestSchema } from "../models/auth.model";
export const loginRoute = createRoute({
  method: "post",
  path: "/login",

  request: {
    body: {
      content: {
        "application/json": {
          schema: loginRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successfull response",
      content: {
        "application/json": {
          schema: userSchema.nullable()
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
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
});

export const registerRoute = createRoute({
  method: "post",
  path: "/register",
  request: {
    body: {
      content: {
        "application/json": {
          schema: registerRequestSchema
        }
      }
    }
  },
  responses: {
    200: {
      description: "Successfull response",
      content: {
        "application/json": {
          schema: userSchema.nullable()
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
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
});

export const logoutRoute = createRoute({
  method: "post",
  path: "/logout",
  responses: {
    200: {
      description: "Successfull response",
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
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: z.null()
        }
      }
    }
  }
});


export const getMeRoute = createRoute({
  method: "get",
  path: "/me",
  responses: {
    200: {
      description: "Current user information",
      content: {
        "application/json": {
          schema: userSchema.nullable()
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
    },
  }
});
