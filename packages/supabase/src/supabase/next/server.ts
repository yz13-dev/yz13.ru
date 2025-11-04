import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookieOptions, CookieStore } from "../cookies";

export const createClient = <T>(
  cookieStore: CookieStore,
): SupabaseClient<T> => {
  // @ts-ignore
  return createServerClient<T>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookieOptions,
      auth: {
        autoRefreshToken: true,
        persistSession: true,
      },
      cookies: {
        getAll() {
          return (cookieStore).getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              (cookieStore).set(name, value, options),
            );
          } catch (error) {
            console.error("Error setting cookies on server client");
          }
        },
      },
    },
  );
};
