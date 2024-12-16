import packageJson from "@/package.json";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { lists } from "./productivity";
import { user } from "./user";
import { user_workspace } from "./user-workspace";
import { workspace } from "./workspace";

export const runtime = "edge";

const app = new Hono().basePath("/");

app.route("/user/:uid/workspace", user_workspace);
app.route("/workspace", workspace);
app.route("/user", user);
app.route("/lists", lists);

app.get("/version", (c) => {
  const version = packageJson.version;
  return c.json(version);
});

app.get("/health", (c) => c.json({ status: "ok" }));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
