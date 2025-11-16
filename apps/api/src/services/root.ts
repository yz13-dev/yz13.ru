import { OpenAPIHono } from "@hono/zod-openapi";
import { clicks } from "./built-in/clicks/v1/route";
import { blog } from "./external/blog/v1/route";
import { pins } from "./external/pins/v1/route";


export const root = new OpenAPIHono();


root.route("/blog", blog);
root.route("/pins", pins);

root.route("/clicks", clicks);
