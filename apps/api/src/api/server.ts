import packageJson from "../../package.json";
import { Hono } from "hono";
import { languageDetector } from "hono/language";
import { poweredBy } from "hono/powered-by";
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
import { cors } from "hono/cors";
import { chats } from "./chats";
import { konfa } from "./konfa";

export const runtime = "edge";

const app = new Hono().basePath("/");

const isDev = process.env.NODE_ENV === "development";

app.use("*", requestId());
app.use(
  languageDetector({
    lookupCookie: "language",
    lookupQueryString: "lang",
    order: ["cookie", "querystring"],
    caches: ["cookie"],
    cookieOptions: {
      sameSite: "None",
      secure: true,
      domain: !isDev ? ".yz13.ru" : "localhost",
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    },
    supportedLanguages: ["ru", "en"], // Must include fallback
    fallbackLanguage: "ru", // Required
  }),
);
app.use(
  "*",
  cors({
    origin: (origin) => {
      if (isDev) {
        return origin;
      } else return origin.endsWith(".yz13.com") ? origin : "https://yz13.ru";
    },
    credentials: true,
  }),
);
// won't work with `runtime = "edge"`
// app.use(compress());
app.use(poweredBy());

app.route("/user", user);
app.route("/visitor-session", visitor_session);
app.route("/charts", charts);
app.route("/drafts", drafts);
app.route("/works", works);
app.route("/auth", auth);
app.route("/pricing", pricing);
app.route("/rooms", rooms);
app.route("/pages", pages);
app.route("/news", news);
app.route("/chats", chats);
app.route("/konfa", konfa);

app.get("/version", (c) => {
  const version = packageJson.version;
  return c.json(version);
});

app.get("/health", (c) => c.json({ status: "ok" }));

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
export const OPTIONS = handler;
export const WEBSOCKET = handler;
