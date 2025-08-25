import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Next.js internals & static files
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get("session")
  let token: string | undefined

  if (sessionCookie) {
    try {
      const session = JSON.parse(sessionCookie.value)
      token = session?.token
    } catch (err) {
      token = undefined
    }
  }

  // If no valid token → allow only /login
  if (!token) {
    if (pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
