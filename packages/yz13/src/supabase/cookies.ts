import { CookieOptions as Options } from "@supabase/ssr";

const isDev = process.env.NODE_ENV === "development";
export const cookieOptions: Options = {
  domain: isDev ? undefined : ".yz13.ru",
  sameSite: "lax",
  secure: !isDev,
};
