import packageJson from "@/package.json";
import { Hono } from "hono";
import { languageDetector } from "hono/language";
import { requestId } from "hono/request-id";
import { handle } from "hono/vercel";
import { auth } from "./auth";
import { charts } from "./charts";
import { drafts } from "./drafts";
import { news } from "./news";
import { pages } from "./pages";
import { pricing } from "./pricing";
import { rooms } from "./rooms";
import { user } from "./user";
import { visitor_session } from "./visitor-session";
import { works } from "./works";

export const runtime = "edge";

const app = new Hono().basePath("/");

app.use(
  languageDetector({
    supportedLanguages: ["ru", "en"], // Must include fallback
    fallbackLanguage: "ru", // Required
  }),
);

// won't work with `runtime = "edge"`
// app.use(compress());
app.use("*", requestId());

app.route("/user", user);
app.route("/visitor-session", visitor_session);
app.route("/charts", charts);
app.route("/drafts", drafts);
app.route("/works", works);
app.route("/auth", auth);
app.route("/pricing", pricing);
app.route("/rooms", rooms);
app.route("/pages", pages);
app.route("/journal", news);

app.get("/version", (c) => {
  const version = packageJson.version;
  return c.json(version);
});

app.get("/health", (c) => c.json({ status: "ok" }));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
