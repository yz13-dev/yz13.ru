import { get } from "@vercel/edge-config";
import { createClient } from "@yz13/supabase/server";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  await get<boolean>("busy");
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const client = createClient(cookieStore);
  const {
    data: { user },
  } = await client.auth.getUser();
  const userRole = user?.user_metadata?.role;
  // now we can check user`s role`
  if (userRole !== "admin" && pathname.startsWith("/workspace")) {
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
