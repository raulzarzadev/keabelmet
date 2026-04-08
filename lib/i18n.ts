export const locales = ["es", "en", "fr", "zh"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "es"

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  es: () => import("@/locales/es.json").then((m) => m.default),
  en: () => import("@/locales/en.json").then((m) => m.default),
  fr: () => import("@/locales/fr.json").then((m) => m.default),
  zh: () => import("@/locales/zh.json").then((m) => m.default),
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * Given a pathname and target locale, return the equivalent path in that locale.
 * e.g. pathnameForLocale("/en/actividades/buceo", "fr") => "/fr/actividades/buceo"
 *      pathnameForLocale("/actividades/buceo", "en") => "/en/actividades/buceo"
 *      pathnameForLocale("/en/actividades/buceo", "es") => "/actividades/buceo"
 */
export function pathnameForLocale(pathname: string, targetLocale: Locale): string {
  // Strip current locale prefix if present
  let cleanPath = pathname
  for (const loc of locales) {
    if (loc === defaultLocale) continue
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      cleanPath = pathname.slice(`/${loc}`.length) || "/"
      break
    }
  }

  // For default locale (es), no prefix
  if (targetLocale === defaultLocale) {
    return cleanPath
  }

  // For other locales, add prefix
  return `/${targetLocale}${cleanPath === "/" ? "" : cleanPath}`
}

/**
 * Extract locale from pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  for (const loc of locales) {
    if (loc === defaultLocale) continue
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      return loc
    }
  }
  return defaultLocale
}
