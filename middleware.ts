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

  // Redirect /es and /es/* to unprefixed (default locale)
  if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
    const stripped = pathname.slice(`/${defaultLocale}`.length) || "/"
    return NextResponse.redirect(new URL(stripped + request.nextUrl.search, request.url), 308)
  }

  // Check if pathname has a locale prefix
  const pathnameLocale = locales.find(
    (locale) =>
      locale !== defaultLocale &&
      (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`))
  )

  if (pathnameLocale) {
    // Rewrite /en/about -> /[locale]/about with locale param (preservando el query)
    return NextResponse.rewrite(
      new URL(`/${pathnameLocale}${pathname.slice(`/${pathnameLocale}`.length) || "/"}${request.nextUrl.search}`, request.url)
    )
  }

  // No locale prefix = default locale (es), rewrite to /es/...
  // This allows app/[locale]/page.tsx to handle it. Preservamos el query string
  // (p. ej. /deal?d=<token>), que antes se perdía al reescribir.
  const newPathname = `/es${pathname === "/" ? "" : pathname}`
  return NextResponse.rewrite(new URL(newPathname + request.nextUrl.search, request.url))
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|.*\\..*).*)",
  ],
}
