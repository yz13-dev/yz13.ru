import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

export const konfa = new Hono();

const { upgradeWebSocket } = createBunWebSocket<ServerWebSocket>();

konfa.get(
  "/ws",
  upgradeWebSocket((c) => {
    const roomId = c.req.query("room") || "default";

    return {
      onOpen: (event, ws) => {
        console.log("open", roomId);
        ws.send("connected");
      },
      onMessage(event, ws) {
        console.log("message", event.data, roomId);
        ws.send("received");
      },
      onClose(event, ws) {
        console.log("close");
        ws.close();
      },
    };
  }),
);
