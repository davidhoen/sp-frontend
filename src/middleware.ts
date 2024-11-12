import createMiddleware from "next-intl/middleware"
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { routing } from "./i18n/routing"
export default createMiddleware(routing)

export async function middleware(req: NextRequest) {

  const locale = req.cookies.get("NEXT_LOCALE")?.value || "en"
  const session_token = req.cookies.get("skills_passport_session")?.value

  if (req.nextUrl.pathname === "/" && session_token) {
    return NextResponse.redirect(new URL(`/${locale}/student`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|nl)/:path*"]
}
