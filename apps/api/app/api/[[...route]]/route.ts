import packageJson from "@/package.json";
import { Redis } from "@upstash/redis";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "./auth";
import { charts } from "./charts";
import { drafts } from "./drafts";
import { pricing } from "./pricing";
import { lists } from "./productivity";
import { user } from "./user";
import { user_workspace } from "./user-workspace";
import { visitor_session } from "./visitor-session";
import { works } from "./works";
import { workspace } from "./workspace";

export const runtime = "edge";

const app = new Hono().basePath("/");

export const redis = Redis.fromEnv();

app.route("/user/:uid/workspace", user_workspace);
app.route("/workspace", workspace);
app.route("/user", user);
app.route("/lists", lists);
app.route("/visitor-session", visitor_session);
app.route("/charts", charts);
app.route("/drafts", drafts);
app.route("/works", works);
app.route("/auth", auth);
app.route("/pricing", pricing);

app.get("/version", (c) => {
  const version = packageJson.version;
  return c.json(version);
});

app.get("/health", (c) => c.json({ status: "ok" }));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
