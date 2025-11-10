import { Context } from "hono";
import { getSupabase } from "../../../middlewares/supabase.middleware";
import { wrapUser } from "../../../utils/wrap-user";
import { loginRequestSchema, registerRequestSchema } from "../models/auth.model";


export const login = async (c: Context) => {

  const body = await c.req.json()

  try {
    loginRequestSchema.safeParse(body)

    const supabase = getSupabase(c);

    const { data: { user }, error } = await supabase
      .auth
      .signInWithPassword({
        email: body.email,
        password: body.password
      })

    if (error) {
      return c.json(null, 500)
    }

    if (!user) {
      return c.json(null, 400)
    }

    return c.json(wrapUser(user), 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 400)
  }
}

export const register = async (c: Context) => {

  const body = await c.req.json()

  try {
    registerRequestSchema.safeParse(body)

    const supabase = getSupabase(c);

    const { data: { user }, error } = await supabase.auth.signUp({
      email: body.email,
      password: body.password,
      options: {
        data: {
          username: body.username
        }
      }
    })

    if (error) {
      return c.json(null, 500)
    }

    if (!user) {
      return c.json(null, 400)
    }

    return c.json(wrapUser(user), 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 400)
  }
}

export const logout = async (c: Context) => {
  try {
    const supabase = getSupabase(c);

    const { error } = await supabase.auth.signOut()

    if (error) {
      return c.json(null, 500)
    }

    return c.json(null, 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 500)
  }
}


export const getMe = async (c: Context) => {
  try {
    const supabase = getSupabase(c)

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
      console.log(error)
      return c.json(null, 200)
    }

    if (!user) return c.json(null, 200)

    return c.json(wrapUser(user), 200)
  } catch (error) {
    console.log(error)
    return c.json(null, 502)
  }
}
