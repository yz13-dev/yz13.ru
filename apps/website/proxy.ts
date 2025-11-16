import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {

  const { searchParams, pathname } = new URL(request.url);

  const from = searchParams.get("from");
  const path = pathname;

  if (from) {
    console.log("clicked", path, "from", from);

    // track this moment;
  }

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}
