import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import type { Context, MiddlewareHandler } from 'hono';
import { env } from 'hono/adapter';
import { setCookie } from 'hono/cookie';
import type { CookieOptions } from 'hono/utils/cookie';

const isDev = process.env.NODE_ENV === 'development';

export const getSupabase = (c: Context) => {
  return c.get('supabase');
};


type SupabaseEnv = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
};

export const adminSupabaseMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const supabaseEnv = env<SupabaseEnv>(c);
    const supabaseUrl =
      supabaseEnv.SUPABASE_URL ?? process.env.SUPABASE_URL;
    const supabaseAnonKey =
      supabaseEnv.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL missing!');
    }

    if (!supabaseAnonKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY missing!');
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        async getAll() {
          try {
            const cookies = parseCookieHeader(c.req.header('Cookie') ?? '')

            return cookies.map(({ name, value }) =>
              ({ name, value: value ?? "" })
            )
          } catch (error) {
            console.log(error)
            return null;
          }
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            const options: CookieOptions = {
              path: "/",
              domain: isDev ? "localhost" : ".yz13.ru",
              sameSite: "None",
              secure: true,
              httpOnly: false
            }
            setCookie(c, name, value, options)
          });
        },
      },
    });

    c.set('supabase', supabase);

    await next();
  };
};
