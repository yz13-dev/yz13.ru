import { cookieOptions } from "@yz13/supabase/cookies";
import { NextRequest, NextResponse } from "next/server";
import { getLocale } from "./lib/locale";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const reqCookies = request.cookies;
  const resCookies = response.cookies;
  if (reqCookies.has("language")) {
    const locale = reqCookies.get("language")?.value;
    if (locale !== "RU") {
      resCookies.set("language", "RU", {
        ...cookieOptions,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // a year
      });
      return response;
    } else return response;
    // console.log("cookie-locale", locale);
  } else {
    const locale = await getLocale(request);
    // console.log("request-locale", locale);
    if (locale)
      resCookies.set("language", "RU", {
        ...cookieOptions,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // a year
      });
    else
      resCookies.set("language", "RU", {
        ...cookieOptions,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // a year
      });
  }
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
