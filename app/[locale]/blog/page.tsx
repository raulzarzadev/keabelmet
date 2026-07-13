import type { Metadata } from "next"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"
import { buildPageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("blog", "/blog", locale)
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("blog", locale) as Record<string, any>

  const postKeys = ["grayWhales", "seaLions", "surfing"]
  const postImages = ["/gray-whale-in-ocean.jpg", "/swimming-with-sea-lions.jpg", "/beach-surfing-la-paz.jpg"]

  return (
    <main>
      <section className="pagehero">
        <span className="kicker">Keabelmet</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </section>

      <div className="page-wrap">
        <div className="blog-list">
          {postKeys.map((key, i) => {
            const post = t.posts?.[key] || {}
            return (
              <article key={key} className="blog-card">
                <div className="blog-media">
                  <Image src={postImages[i]} alt={post.title || ""} fill sizes="(max-width: 640px) 100vw, 34vw" style={{ objectFit: "cover" }} />
                </div>
                <div className="blog-body">
                  <h2>{post.title}</h2>
                  <p>{post.excerpt}</p>
                  <div className="blog-meta">
                    {post.date && <span><Calendar size={14} />{post.date}</span>}
                    {post.readTime && <span><Clock size={14} />{post.readTime}</span>}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}
