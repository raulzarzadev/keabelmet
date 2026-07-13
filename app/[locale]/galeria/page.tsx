import type { Metadata } from "next"
import Image from "next/image"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"
import { buildPageMeta } from "@/lib/seo"

const INSTAGRAM_URL = "https://www.instagram.com/keabelmet__expeditions/"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("gallery", "/galeria", locale)
}

export default async function Galeria({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("gallery", locale) as Record<string, any>

  const imageKeys = ["seaLions", "whaleBreaching", "stripedMarlin", "mantaRay", "kayak", "snorkeling", "grayWhale", "landscape", "coral"]
  const imageUrls = [
    "/sea-lions-swimming-underwater.jpg",
    "/whale-breaching-ocean.jpg",
    "/striped-marlin-underwater.jpg",
    "/manta-ray-swimming.png",
    "/kayaking-tropical-beach.jpg",
    "/snorkeling-coral-reef.jpg",
    "/gray-whale-close-up.jpg",
    "/desert-beach-landscape-baja.jpg",
    "/coral-reef-underwater-cabo-pulmo-colorful-tropical.jpg",
  ]

  return (
    <main>
      <section className="pagehero">
        <span className="kicker">Keabelmet</span>
        <h1>{t.title}</h1>
        {t.subtitle && <p>{t.subtitle}</p>}
      </section>

      <div className="page-wrap">
        <div className="gal-grid">
          {imageKeys.map((key, i) => (
            <div key={key} className="gal-item">
              <Image
                src={imageUrls[i]}
                alt={t.images?.[key] || key}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 44 }}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            @keabelmet_expeditions
          </a>
        </div>
      </div>
    </main>
  )
}
