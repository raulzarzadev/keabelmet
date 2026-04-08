import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "@/lib/i18n"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static files, api routes, and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static files (images, fonts, etc.)
  ) {
    return NextResponse.next()
  }

  // Check if pathname has a locale prefix
  const pathnameLocale = locales.find(
    (locale) =>
      locale !== defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  )

  if (pathnameLocale) {
    // Rewrite /en/about -> /[locale]/about with locale param
    return NextResponse.rewrite(
      new URL(`/${pathnameLocale}${pathname.slice(`/${pathnameLocale}`.length) || "/"}`, request.url)
    )
  }

  // No locale prefix = default locale (es), rewrite to /es/...
  // This allows app/[locale]/page.tsx to handle it
  const newPathname = `/es${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(new URL(newPathname, request.url))
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|.*\\..*).*)",
  ],
}
