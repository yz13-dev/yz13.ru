import { Hono } from "hono";
import { handle } from "hono/vercel";
import { user } from "./user";
import { user_workspace } from "./workspace";

export const runtime = "edge";

const app = new Hono().basePath("/api");

app.route("/user/:uid/workspace", user_workspace);
app.route("/user", user);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
