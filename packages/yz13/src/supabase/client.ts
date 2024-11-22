import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookieOptions } from "./cookies";
import { Database } from "./database";

const isDev = process.env.NODE_ENV === "development";
export const createClient = (): SupabaseClient<Database> =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookieOptions }
  );
