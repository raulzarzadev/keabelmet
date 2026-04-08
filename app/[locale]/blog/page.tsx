import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Blog de Aventuras",
  description:
    "Historias, consejos y guias sobre vida marina en Baja California Sur. Temporadas de ballenas, tips de surf, buceo y mas.",
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const l = (path: string) => locale === "es" ? path : `/${locale}${path}`
  const t = await getPageDictionary("blog", locale) as Record<string, any>

  const postKeys = ["grayWhales", "seaLions", "surfing"]
  const postImages = ["/gray-whale-in-ocean.jpg", "/swimming-with-sea-lions.jpg", "/beach-surfing-la-paz.jpg"]
  const postSlugs = ["temporada-ballenas-grises", "consejos-nadar-lobos-marinos", "mejores-playas-surfear"]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {postKeys.map((key, i) => {
            const post = t.posts?.[key] || {}
            return (
              <article key={key} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 relative h-48 md:h-auto">
                    <Image src={postImages[i]} alt={post.title || ""} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <h2 className="text-2xl font-bold mb-3 hover:text-teal-600 transition-colors">
                      <Link href={l(`/blog/${postSlugs[i]}`)}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
