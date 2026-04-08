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

/**
 * Load a page-specific translation file.
 * Files are structured as { es: {...}, en: {...}, fr: {...}, zh: {...} }
 */
export async function getPageDictionary(page: string, locale: Locale) {
  try {
    const mod = await import(`@/locales/pages/${page}.json`)
    const data = mod.default || mod
    return data[locale] || data[defaultLocale] || {}
  } catch {
    return {}
  }
}

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * Given a pathname and target locale, return the equivalent path in that locale.
 */
export function pathnameForLocale(pathname: string, targetLocale: Locale): string {
  let cleanPath = pathname
  for (const loc of locales) {
    if (loc === defaultLocale) continue
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      cleanPath = pathname.slice(`/${loc}`.length) || "/"
      break
    }
  }
  if (targetLocale === defaultLocale) return cleanPath
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
