import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

export const konfa = new Hono();

const rooms = new Map<string, Map<string, ServerWebSocket<any>>>();

const { upgradeWebSocket } = createBunWebSocket<ServerWebSocket>();

konfa.get(
  "/ws",
  upgradeWebSocket((c) => {
    const roomId = c.req.query("roomId");
    const userId = c.req.query("userId");

    if (!roomId || !userId) {
      throw new Error("Missing roomId or userId");
    }

    return {
      onOpen: (event, ws) => {
        if (!rooms.has(roomId)) rooms.set(roomId, new Map());
        const room = rooms.get(roomId)!;
        const websocket = ws.raw;
        if (websocket) room.set(userId, websocket);

        console.log(`[join] ${userId} joined ${roomId}`);

        // Сообщим другим участникам, что новый пользователь зашёл
        for (const [otherId, socket] of room) {
          if (otherId !== userId) {
            socket.send(JSON.stringify({ type: "user-joined", from: userId }));
            ws.send(JSON.stringify({ type: "user-joined", from: otherId }));
          }
        }
      },

      onMessage: (event, ws) => {
        try {
          const data = JSON.parse(event.data as string);
          const room = rooms.get(roomId);
          if (!room) return;

          const { type, to, payload } = data;

          const target = room.get(to);
          if (target) {
            target.send(
              JSON.stringify({
                type,
                from: userId,
                payload,
              }),
            );
          }
        } catch (err) {
          console.error("Invalid message:", err);
        }
      },

      onClose: () => {
        const room = rooms.get(roomId);
        if (!room) return;

        room.delete(userId);
        console.log(`[leave] ${userId} left ${roomId}`);

        // Сообщим остальным, что пользователь вышел
        for (const [, socket] of room) {
          socket.send(JSON.stringify({ type: "user-left", from: userId }));
        }

        // Удалим комнату, если в ней никого не осталось
        if (room.size === 0) {
          rooms.delete(roomId);
        }
      },
    };
  }),
);
