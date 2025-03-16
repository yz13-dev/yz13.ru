import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "yz13/supabase/server";

const auth = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = cookies();
  const client = createClient(cookieStore);
  const {
    data: { user },
  } = await client.auth.getUser();
  const userRole = user?.user_metadata?.role;
  // now we can check user`s role`
  if (!user) {
    if (auth.includes(pathname)) return NextResponse.next();
    else return NextResponse.redirect(new URL("/login", request.url));
  } else {
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("https://yz13.ru"));
    } else return NextResponse.next();
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
