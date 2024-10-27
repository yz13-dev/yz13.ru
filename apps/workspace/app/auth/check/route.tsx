import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

  const isAuthenticated = null

  if (!isAuthenticated) return NextResponse.redirect(new URL("/", request.url))

  return Response.json(null)
}
