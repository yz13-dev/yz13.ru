import positionsMap from "@/const/positions";
import { Hono } from "hono";

export const positions = new Hono();

positions.get("/:lang", async (c) => {
  const lang = c.req.param("lang") ?? "en";
  const localized = positionsMap[lang as keyof typeof positionsMap];
  return c.json(localized);
});

positions.get("/:lang/:positionId", async (c) => {
  const lang = c.req.param("lang") ?? "en";
  const positionId = c.req.param("positionId");
  if (!positionId) return c.json(null, 400);
  const localized = positionsMap[lang as keyof typeof positionsMap];
  const position = localized.find((p) => p.id === positionId);
  return c.json(position);
});
