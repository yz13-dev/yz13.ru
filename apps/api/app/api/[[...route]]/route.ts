import packageJson from "@/package.json";
import timezones from "@/time-zones.json";
import { cors } from "hono/cors";
import { languageDetector } from "hono/language";
import { poweredBy } from "hono/powered-by";
import { Hono } from "hono/quick";
import { requestId } from "hono/request-id";
import { handle } from "hono/vercel";
import { auth } from "./auth";
import { calendar } from "./calendar/endpoint";
import { charts } from "./charts/endpoint";
import { events } from "./events/endpoint";
import { meetings } from "./meetings/endpoint";
import { news } from "./news";
import { pages } from "./pages";
import { positions } from "./positions";
import { pricing } from "./pricing";
import { rooms } from "./rooms";
import { schedule } from "./schedule/endpoint";
import { store } from "./store/endpoint";
import { user } from "./user";

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
      if (isDev) return origin
      return origin.endsWith(".yz13.ru") ? origin : "https://yz13.ru";
    },
  }),
);
// won't work with `runtime = "edge"`
// app.use(compress());
app.use(poweredBy());

app.route("/user", user);
app.route("/auth", auth);
app.route("/pricing", pricing);
app.route("/rooms", rooms);
app.route("/pages", pages);
app.route("/news", news);
app.route("/store", store);
app.route("/calendar", calendar);
app.route("/calendar/events", events);
app.route("/calendar/schedule", schedule);
app.route("/calendar/meetings", meetings)
app.route("/positions", positions);
app.route("/charts", charts)

app.get("/timezones", (c) => {
  return c.json(timezones);
});

app.get("/version", (c) => {
  const version = packageJson.version;
  return c.json(version);
});

app.get("/health", (c) => c.json({ status: "ok" }));

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
