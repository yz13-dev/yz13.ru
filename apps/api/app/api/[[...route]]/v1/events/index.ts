import { Hono } from "hono";
import { events as eventsEndpoint } from "./endpoint";
import { eventById } from "./[id]/endpoint";
import { userEvents } from "./user/[uid]/endpoint";

export const events = new Hono();

// Static routes
events.route("/", eventsEndpoint);
events.route("/user/:uid", userEvents);

// Dynamic routes
events.route("/:id", eventById); 