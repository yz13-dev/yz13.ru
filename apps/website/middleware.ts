import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const { supabase } = createClient(request);
  // await supabase.auth.getUser();
  const isProd = process.env.NODE_ENV === "production";
  const isSoonPage = request.nextUrl.pathname.startsWith("/workspace");
  if (isProd && !isSoonPage)
    return NextResponse.redirect(new URL("/workspace", request.url));
  else return NextResponse.next();
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
