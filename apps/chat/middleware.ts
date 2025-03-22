import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "yz13/supabase/server";

const auth = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isRoot = pathname === "/";
  const isLogin = pathname === "/login";
  if (isRoot) return NextResponse.next();
  else if (isLogin) return NextResponse.next();
  else if (!user) return NextResponse.redirect(new URL("/", request.url));
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
