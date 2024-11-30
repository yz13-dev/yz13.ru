import { Hono } from "hono";
import { handle } from "hono/vercel";
import { user } from "./user";
import { user_workspace } from "./workspace";
import packageJson from "@/package.json"

export const runtime = "edge";

const app = new Hono().basePath("/");

app.route("/user/:uid/workspace", user_workspace);
app.route("/user", user);

app.get("/version", (c) => {
  const version = packageJson.version
  return c.json(version);
});

app.get("/health", (c) => {
  return c.json({ status: "ok" });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
