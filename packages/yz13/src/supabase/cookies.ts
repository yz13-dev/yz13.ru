import { CookieOptions as Options } from "@supabase/ssr";

const isDev = process.env.NODE_ENV === "development";
export const cookieOptions: Options = {
  path: "/",
  domain: isDev ? undefined : ".yz13.ru",
  sameSite: "none",
  secure: true,
  httpOnly: false,
};
