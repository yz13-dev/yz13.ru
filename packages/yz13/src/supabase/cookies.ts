import { CookieOptions as Options } from "@supabase/ssr";

const isDev = process.env.NODE_ENV === "development";
export const cookieOptions: Options = {
  path: "/",
  domain: isDev ? "localhost" : ".yz13.ru",
  sameSite: "lax",
  secure: true,
  httpOnly: false,
  hostOnly: false,
};
