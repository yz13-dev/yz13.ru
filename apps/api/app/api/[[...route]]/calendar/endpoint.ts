import { isValid, parse } from "date-fns";
import { Hono } from "hono";

export const calendar = new Hono();

calendar.get("/:date", async (c) => {
  const date = c.req.param("date");
  if (!date)
    return c.json({ error: "date is required, example: 2023-12-01" }, 400);

  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const valid = isValid(parsedDate);
  if (!valid)
    return c.json({ error: "invalid date, example: 2023-12-01" }, 400);
  return c.json({ date });
});
