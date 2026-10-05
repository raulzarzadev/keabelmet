import type { MetadataRoute } from "next"
import { experiences } from "@/constants/experiences"
import { locales, defaultLocale, type Locale } from "@/lib/i18n"

const baseUrl = "https://www.keabelmet.com"

const staticRoutes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/sobre-nosotros", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/experiencias", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/tarifas", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/galeria", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/contacto", priority: 0.7, changeFrequency: "monthly" as const },
]

// Experience detail routes derived from the canonical constants.
const experienceRoutes = experiences.map((e) => ({
  path: e.href,
  priority: e.featuredOrder != null ? 0.9 : 0.8,
  changeFrequency: "monthly" as const,
}))

const routes = [...staticRoutes, ...experienceRoutes]

// Prefix / hreflang helpers derived from the i18n locale list so new
// languages (e.g. Catalan) are picked up automatically.
const prefixFor = (loc: Locale) => (loc === defaultLocale ? "" : `/${loc}`)
const hreflangFor = (loc: Locale) => (loc === "zh" ? "zh-CN" : loc)
const urlFor = (path: string, loc: Locale) => {
  const prefix = prefixFor(loc)
  return path === "/" ? `${baseUrl}${prefix || "/"}` : `${baseUrl}${prefix}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    const languages: Record<string, string> = {}
    for (const loc of locales) languages[hreflangFor(loc)] = urlFor(route.path, loc)
    languages["x-default"] = urlFor(route.path, defaultLocale)

    for (const loc of locales) {
      entries.push({
        url: urlFor(route.path, loc),
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      })
    }
  }

  return entries
}
