import { postClicksV1Track } from '@yz13/api';
import { NextResponse, type NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {

  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const pathname = url.pathname;

  const from = searchParams.get("from");
  const path = pathname;

  if (from) {
    console.log("clicked", path, "from", from);

    // track this moment;
    await postClicksV1Track({
      from,
      path,
    })

    url.searchParams.delete("from");

    return NextResponse.redirect(url)
  }

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
}
