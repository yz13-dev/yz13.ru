import { OpenAPIHono } from "@hono/zod-openapi";
import { serveStatic } from "hono/bun";
import { every } from "hono/combine";
import { cors } from "hono/cors";
import { requestId } from "hono/request-id";
import { timing } from "hono/timing";
import packageJson from './package.json' with { type: "json" };
import { core } from "./src/core/root";
import { supabaseMiddleware } from "./src/middlewares/supabase.middleware";
import { root } from "./src/services/root";

const app = new OpenAPIHono({ strict: false });

app.use(
  "*",
  cors({
    origin: (origin) => {
      console.log("==> origin", origin);
      return origin === "https://localhost:3000"
        ? origin
        : origin === "http://localhost:5173"
          ? origin
          : origin.endsWith(".yz13.ru")
            ? origin
            : "https://yz13.ru";
    },
    exposeHeaders: ["Content-Type", "Authorization", "X-Request-Id", "Cookie"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "X-Request-Id",
      "Access-Control-Allow-Origin",
    ],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"], // Specify allowed methods
    credentials: true,
    maxAge: 60 * 5, // 5 minutes
  }),
);

app.use(
  every(
    timing(),
    requestId()
  ),
);

app.use("*", supabaseMiddleware());

app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

app.route("/", core);
app.route("/", root);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: packageJson.name,
    version: packageJson.version
  },
  servers: [
    { url: "http://localhost:3000", description: "Local Server" },
    { url: "https://api.yz13.ru", description: "Production Server" },
  ],
});

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("version", (c) => {
  return c.json({
    version: packageJson.version
  });
});


export default app;
