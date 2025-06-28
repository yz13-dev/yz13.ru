import { OpenAPIHono } from "@hono/zod-openapi"
import { current } from "./current/endpoint"
import { session } from "./current/session/endpoint"
import { login } from "./login/endpoint"
import { signup } from "./signup/endpoint"
import { logout } from "./logout/endpoint"

export const auth = new OpenAPIHono()

// Static routes
auth.route("/current", current)
auth.route("/current/session", session)
auth.route("/login", login)
auth.route("/signup", signup)
auth.route("/logout", logout) 