import { Hono } from "hono/quick";
import { getNewsCountForSixMonths } from "./actions";


export const charts = new Hono()



charts.get("/news", async (c) => {

  const count = await getNewsCountForSixMonths();

  return c.json(count);
})
