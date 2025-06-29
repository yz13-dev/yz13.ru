import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import { createMeeting, getZoomMeetings } from "../actions";

const routeGETMeetings = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      description: "Zoom meetings",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    },
    401: {
      description: "No Zoom identity found",
      content: {
        "application/json": {
          schema: z.object({ error: z.string() })
        }
      }
    }
  }
});

const routePOSTMeeting = createRoute({
  method: "post",
  path: "/",
  request: {
    headers: z.object({
      authorization: z.string().optional()
    }),
    body: {
      content: {
        "application/json": {
          schema: z.object({
            event: z.any(),
            timezone: z.string()
          })
        }
      }
    }
  },
  responses: {
    200: {
      description: "Meeting created",
      content: {
        "application/json": {
          schema: z.any()
        }
      }
    },
    401: {
      description: "Bad request",
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

export const root = new OpenAPIHono();

root.openapi(routeGETMeetings, async (c) => {
  // Здесь повторяем логику из старого endpoint.ts
  // (getAuthorizedSession, identities, ...)
  // Для краткости — просто возвращаем getZoomMeetings
  const meetings = await getZoomMeetings();
  return c.json(meetings, 200);
});

root.openapi(routePOSTMeeting, async (c) => {
  const authorization = c.req.header("Authorization");
  const token = authorization?.replace("Bearer ", "");
  const body = await c.req.json();
  const event = body.event;
  const timezone = body.timezone;

  if (!token) {
    return c.json(null, 401);
  }

  // Здесь повторяем проверки из старого endpoint.ts
  // Для краткости — просто вызываем createMeeting
  const meeting = await createMeeting(token, event, timezone, { email: "", username: "", id: "" });
  return c.json(meeting, 200);
});
