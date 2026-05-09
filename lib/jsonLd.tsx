import { SITE_URL } from "@/lib/seo"
import type { Locale } from "@/lib/i18n"

interface JsonLdProps {
  data: object | object[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

interface TouristTripInput {
  name: string
  description: string
  image?: string
  url: string
  duration?: string
  priceMxn?: number
  touristType?: string[]
  itinerary?: { name: string; description?: string }[]
  partOfTripIds?: string[]
  validFrom?: string
  validThrough?: string
}

export function touristTripSchema(t: TouristTripInput, locale: Locale = "es") {
  const inLanguage = locale === "zh" ? "zh-CN" : locale === "es" ? "es-MX" : locale === "en" ? "en-US" : "fr-FR"
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: t.name,
    description: t.description,
    image: t.image,
    url: t.url,
    inLanguage,
    provider: { "@id": `${SITE_URL}/#organization` },
    ...(t.duration ? { duration: t.duration } : {}),
    ...(t.touristType ? { touristType: t.touristType } : {}),
    ...(t.itinerary
      ? {
          itinerary: t.itinerary.map((step) => ({
            "@type": "ItemList",
            name: step.name,
            ...(step.description ? { description: step.description } : {}),
          })),
        }
      : {}),
    ...(t.priceMxn !== undefined
      ? {
          offers: {
            "@type": "Offer",
            price: t.priceMxn,
            priceCurrency: "MXN",
            availability: "https://schema.org/InStock",
            url: t.url,
            ...(t.validFrom ? { validFrom: t.validFrom } : {}),
            ...(t.validThrough ? { validThrough: t.validThrough } : {}),
          },
        }
      : {}),
  }
}

interface SeasonalEventInput {
  name: string
  description: string
  startDate: string
  endDate: string
  location: string
  url: string
}

export function seasonalEventSchema(e: SeasonalEventInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    description: e.description,
    startDate: e.startDate,
    endDate: e.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: e.location,
      address: { "@type": "PostalAddress", addressRegion: "Baja California Sur", addressCountry: "MX" },
    },
    organizer: { "@id": `${SITE_URL}/#organization` },
    url: e.url,
  }
}
