import packageJson from "@/package.json";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { auth } from "./auth";
import { charts } from "./charts";
import { drafts } from "./drafts";
import { pricing } from "./pricing";
import { user } from "./user";
import { visitor_session } from "./visitor-session";
import { works } from "./works";

export const runtime = "edge";

const app = new Hono().basePath("/");

app.route("/user", user);
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
