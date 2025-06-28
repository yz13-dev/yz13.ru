import { OpenAPIHono } from "@hono/zod-openapi";
import { eventById } from "./[id]/endpoint";
import { events as eventsEndpoint } from "./endpoint";
import { userEvents } from "./user/[uid]/endpoint";

export const events = new OpenAPIHono();

// Static routes
events.route("/", eventsEndpoint);
events.route("/user/", userEvents);

// Dynamic routes
events.route("/", eventById);
