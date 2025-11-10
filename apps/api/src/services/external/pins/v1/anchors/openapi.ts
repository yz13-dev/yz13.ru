import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { anchorArraySchema, anchorSchema, minimalAnchorSchema } from "../../models/anchors.model";

export const getAnchorsRoute = createRoute({
  method: "get",
  path: "/{boardId}/anchors",
  request: {
    params: z.object({
      boardId: z.string(),
    })
  },
  responses: {
    200: {
      description: "Anchors",
      content: {
        "application/json": {
          schema: anchorArraySchema
        },
      },
    },
    502: {
      description: "Failed to get anchors",
      content: {
        "application/json": {
          schema: anchorArraySchema
        }
      }
    }
  },
});

export const createAnchorRoute = createRoute({
  method: "post",
  path: "/{boardId}/anchors/{pinId}",
  request: {
    params: z.object({
      boardId: z.string(),
      pinId: z.string(),
    })
  },
  responses: {
    200: {
      description: "Anchor created",
      content: {
        "application/json": {
          schema: anchorSchema.nullable()
        },
      },
    },
    409: {
      description: "Anchor already exists",
      content: {
        "application/json": {
          schema: anchorSchema.nullable()
        },
      },
    },
    502: {
      description: "Failed to create anchor",
      content: {
        "application/json": {
          schema: anchorSchema.nullable()
        },
      },
    },
  },
})

export const getAnchorRoute = createRoute({
  method: "get",
  path: "/{pinId}/anchor",
  request: {
    params: z.object({
      pinId: z.string(),
    })
  },
  responses: {
    200: {
      description: "Anchor",
      content: {
        "application/json": {
          schema: minimalAnchorSchema.nullable()
        },
      },
    },
    502: {
      description: "Failed to get anchor",
      content: {
        "application/json": {
          schema: minimalAnchorSchema.nullable()
        },
      },
    }
  },
});

export const deleteAnchorRoute = createRoute({
  method: "delete",
  path: "/{boardId}/anchors/{pinId}",
  request: {
    params: z.object({
      boardId: z.string(),
      pinId: z.string(),
    })
  },
  responses: {
    200: {
      description: "Anchor deleted",
      content: {
        "application/json": {
          schema: minimalAnchorSchema.nullable()
        },
      },
    },
    502: {
      description: "Failed to delete anchor",
      content: {
        "application/json": {
          schema: minimalAnchorSchema.nullable()
        },
      },
    }
  },
})
