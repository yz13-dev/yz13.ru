import { Hono } from "hono";

export const appointment = new Hono();

appointment.get("/:uid", async (c) => {});
