import packageJson from "@/package.json";
import timezones from "@/time-zones.json";
import { OpenAPIHono } from "@hono/zod-openapi";
import { every } from "hono/combine";
import { cors } from "hono/cors";
import { poweredBy } from "hono/powered-by";
import { requestId } from "hono/request-id";
import { handle } from "hono/vercel";
import { v1 } from "./v1";

export const runtime = "edge";

const app = new OpenAPIHono().basePath("/");

const isDev = process.env.NODE_ENV === "development";

app.use("*", every(
  requestId(),
  poweredBy(),
  cors({
    origin: (origin) => {
      if (isDev) return origin || '*';
      if (!origin) return "https://yz13.ru"; // В продакшене
      return origin.endsWith(".yz13.ru") ? origin : "https://yz13.ru";
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
    maxAge: 86400, // Кеширование CORS-префлайта на 24 часа
  }),
));

// app.use(
//   languageDetector({
//     lookupCookie: "language",
//     lookupQueryString: "lang",
//     order: ["cookie", "querystring"],
//     caches: ["cookie"],
//     cookieOptions: {
//       sameSite: "None",
//       secure: true,
//       domain: !isDev ? ".yz13.ru" : "localhost",
//       httpOnly: true,
//       path: "/",
//       maxAge: 60 * 60 * 24 * 30, // 30 days
//     },
//     supportedLanguages: ["ru", "en"], // Must include fallback
//     fallbackLanguage: "ru", // Required
//   }),
// );
// won't work with `runtime = "edge"`
// app.use(compress());
// app.route("/user", user);
// app.route("/auth", auth);
// app.route("/pricing", pricing);
// app.route("/rooms", rooms);
// app.route("/pages", pages);
// app.route("/news", news);
// app.route("/store", store);
// app.route("/calendar", calendar);
// app.route("/calendar/events", events);
// app.route("/calendar/schedule", schedule);
// app.route("/calendar/meetings", meetings)
// app.route("/positions", positions);
// app.route("/charts", charts)

app.route("/v1", v1)

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: 'YZ13 API',
    version: '1.0.0',
    description: "It's YZ13 API",
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local Server' },
    { url: 'https://api.yz13.ru', description: 'Production Server' },
  ],
})

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
export const OPTIONS = handle(app);
