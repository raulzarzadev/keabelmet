import type { MetadataRoute } from "next"
import { experiences } from "@/constants/experiences"

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

const localePrefixes = ["", "/en", "/fr", "/zh"]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    for (const prefix of localePrefixes) {
      const url = route.path === "/"
        ? `${baseUrl}${prefix || "/"}`
        : `${baseUrl}${prefix}${route.path}`

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            es: `${baseUrl}${route.path === "/" ? "/" : route.path}`,
            en: `${baseUrl}/en${route.path === "/" ? "" : route.path}`,
            fr: `${baseUrl}/fr${route.path === "/" ? "" : route.path}`,
            "zh-CN": `${baseUrl}/zh${route.path === "/" ? "" : route.path}`,
            "x-default": `${baseUrl}${route.path === "/" ? "/" : route.path}`,
          },
        },
      })
    }
  }

  return entries
}
