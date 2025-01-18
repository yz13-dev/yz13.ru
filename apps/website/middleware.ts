import { NextRequest, NextResponse } from "next/server";
import { isDev } from "./app/login/get-url";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (!isDev && pathname.startsWith("/workspace")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // const isRoot = request.nextUrl.pathname === "/";
  // if (isRoot) return NextResponse.redirect(new URL("/discover", request.url));
  // else return NextResponse.next();
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
