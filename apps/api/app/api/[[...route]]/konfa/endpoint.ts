import { redis } from "@/extensions/redis";
import { Hono } from "hono";
import { nanoid } from "nanoid";

export const konfa = new Hono();

const generateRoomId = () => nanoid(15);

const ROOM_TTL_SECONDS = 60 * 60 * 24; // 1 день

// Создание комнаты
konfa.post("/", async (c) => {
  const roomId = generateRoomId();
  const roomKey = `room:${roomId}`;

  try {
    await redis
      .multi()
      .hset(roomKey, {
        users: JSON.stringify([]),
        createdAt: Date.now(),
      })
      .sadd("rooms:index", roomId)
      .expire(roomKey, ROOM_TTL_SECONDS)
      .exec();

    return c.json({
      roomId,
      expiresIn: ROOM_TTL_SECONDS,
    });
  } catch (e) {
    return c.json({ error: "Failed to create room" }, 500);
  }
});

// Получение информации о комнате
konfa.get("/:roomId", async (c) => {
  const { roomId } = c.req.param();
  const roomData = await redis.hgetall(`room:${roomId}`);

  if (!roomData) {
    return c.json({ error: "Room not found" }, 404);
  }

  const users = roomData.users ?? [];

  return c.json({
    ...roomData,
    users,
  });
});

// Удаление комнаты (например, при выходе последнего участника)
konfa.delete("/:roomId", async (c) => {
  const { roomId } = c.req.param();

  await redis.multi().del(`room:${roomId}`).srem("rooms:index", roomId).exec();

  return c.json({ success: true });
});

// Добавление пользователя в комнату
konfa.post("/:roomId/users", async (c) => {
  const { roomId } = c.req.param();
  const { userId } = await c.req.json();
  const roomKey = `room:${roomId}`;

  const usersRaw = await redis.hget(roomKey, "users");
  const users = (usersRaw ?? []) as any[];

  if (!users.includes(userId)) {
    users.push(userId);
    await redis.hset(roomKey, { users: JSON.stringify(users) });
  }

  return c.json({ users });
});
