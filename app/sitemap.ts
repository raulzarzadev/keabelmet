import type { MetadataRoute } from "next"

const baseUrl = "https://www.keabelmet.com"

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/sobre-nosotros", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/experiencias", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/tarifas", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/galeria", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" as const },
  { path: "/contacto", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/surf-camp", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/experiencias/tour-espiritu-santo", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiencias/tour-ballena-gris", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiencias/buceo-cabo-pulmo", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiencias/buceo-la-paz", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiencias/renta-velero", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/experiencias/renta-yate", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/experiencias/safari-bahia-magdalena", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiencias/safari-la-ventana", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/experiencias/ballena-gris", priority: 0.8, changeFrequency: "monthly" as const },
]

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
          },
        },
      })
    }
  }

  return entries
}
