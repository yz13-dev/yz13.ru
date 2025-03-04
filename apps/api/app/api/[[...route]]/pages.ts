import { PAGES_API_URL } from "@/const/external-api";
import { Hono } from "hono/quick";

export const pages = new Hono();

pages.get("/", async (c) => {
  try {
    const url = new URL("/api/pages", PAGES_API_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600, tags: ["pages"] },
    });
    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});

pages.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const url = new URL(`/api/pages/${id}`, PAGES_API_URL);
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600, tags: ["pages"] },
    });
    const data = await response.json();
    return c.json(data);
  } catch (error) {
    console.log(error);
    return c.json(null);
  }
});
