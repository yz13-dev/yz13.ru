import positionsMap from "@/const/positions";
import { Hono } from "hono";

export const positions = new Hono();

positions.get("/:lang", async (c) => {
  const lang = c.req.param("lang") ?? "en";
  const localized = positionsMap[lang as keyof typeof positionsMap];
  return c.json(localized);
});
