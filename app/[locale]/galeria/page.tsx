import type { Metadata } from "next"
import Image from "next/image"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"
import { getInstagramPosts } from "@/lib/instagram"
import InstagramGallery from "@/components/sections/InstagramGallery"

export const metadata: Metadata = {
  title: "Galeria de Aventuras",
  description:
    "Explora nuestra galeria de fotos de expediciones marinas en Baja California Sur. Ballenas, lobos marinos, surf y paisajes del Mar de Cortes.",
}

export default async function Galeria({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("gallery", locale) as Record<string, any>
  const instagramPosts = await getInstagramPosts(12)

  const imageKeys = ["seaLions", "whaleBreaching", "surfer", "stripedMarlin", "mantaRay", "kayak", "snorkeling", "grayWhale", "landscape"]
  const imageUrls = [
    "/sea-lions-swimming-underwater.jpg",
    "/whale-breaching-ocean.jpg",
    "/surfing-wave-baja-california.jpg",
    "/striped-marlin-underwater.jpg",
    "/manta-ray-swimming.png",
    "/kayaking-tropical-beach.jpg",
    "/snorkeling-coral-reef.jpg",
    "/gray-whale-close-up.jpg",
    "/desert-beach-landscape-baja.jpg",
  ]

  return (
    <div className="min-h-screen">
      <section className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
      </section>

      {instagramPosts ? (
        <InstagramGallery
          posts={instagramPosts}
          title={t.title || "Galeria"}
          instagramUrl="https://www.instagram.com/keabelmet__expeditions/"
          followText={t.follow || "Instagram"}
        />
      ) : (
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageKeys.map((key, i) => (
              <div key={key} className="relative aspect-[4/3] overflow-hidden rounded-xl group cursor-pointer">
                <Image
                  src={imageUrls[i]}
                  alt={t.images?.[key] || key}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
