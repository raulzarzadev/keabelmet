import { NextResponse } from "next/server"
import { experiences } from "@/constants/experiences"

const SITE = "https://www.keabelmet.com"

export const dynamic = "force-static"

async function loadPageEs(slug: string): Promise<Record<string, unknown> | null> {
  try {
    const mod = await import(`@/locales/pages/${slug}.json`)
    const data = (mod.default ?? mod) as Record<string, unknown>
    const es = data.es as Record<string, unknown> | undefined
    return es ?? null
  } catch {
    return null
  }
}

export async function GET() {
  const items = await Promise.all(
    experiences.map(async (e) => {
      const i = e.i18n.es
      const content = await loadPageEs(e.slug)
      return {
        slug: e.slug,
        url: `${SITE}${e.href}`,
        category: e.category,
        title: i.title,
        description: i.description,
        badge: i.badge,
        durationLabel: i.durationLabel,
        capacityLabel: i.capacityLabel,
        highlights: i.highlights,
        days: e.days,
        difficulty: e.difficulty,
        capacity: e.capacity,
        rating: e.rating,
        reviews: e.reviews,
        priceFromMxn: e.fromMxn,
        image: `${SITE}${e.image}`,
        featuredOrder: e.featuredOrder ?? null,
        content,
      }
    }),
  )

  const data = {
    site: SITE,
    locale: "es",
    currency: "MXN",
    updatedAt: new Date().toISOString(),
    count: experiences.length,
    experiences: items,
  }

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
