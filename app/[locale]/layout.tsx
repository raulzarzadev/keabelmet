import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/Header"
import { CurrencyProvider } from "@/contexts/CurrencyContext"
import { locales, type Locale, isValidLocale } from "@/lib/i18n"
import { notFound } from "next/navigation"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

const localeToLang: Record<Locale, string> = {
  es: "es",
  en: "en",
  fr: "fr",
  zh: "zh-CN",
}

const localeToOgLocale: Record<Locale, string> = {
  es: "es_MX",
  en: "en_US",
  fr: "fr_FR",
  zh: "zh_CN",
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}

  const baseUrl = "https://www.keabelmet.com"
  const alternates: Record<string, string> = {}
  for (const loc of locales) {
    const hrefLang = loc === "zh" ? "zh-CN" : loc
    alternates[hrefLang] = loc === "es" ? baseUrl : `${baseUrl}/${loc}`
  }
  alternates["x-default"] = baseUrl

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Keabelmet Expeditions | Ecoturismo y Safari Marino en La Paz, BCS",
      template: "%s | Keabelmet Expeditions",
    },
    description:
      "Vive aventuras marinas en Baja California Sur. Safaris marinos, buceo en Cabo Pulmo, snorkel con lobos marinos, avistamiento de ballenas y mas.",
    icons: {
      icon: [
        { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-icon.png",
    },
    openGraph: {
      locale: localeToOgLocale[locale],
      type: "website",
      siteName: "Keabelmet Expeditions",
      images: [{ url: "/cachalotecta.jpeg", width: 1200, height: 630, alt: "Keabelmet Expeditions" }],
    },
    twitter: {
      card: "summary_large_image",
      images: ["/cachalotecta.jpeg"],
    },
    alternates: {
      canonical: locale === "es" ? baseUrl : `${baseUrl}/${locale}`,
      languages: alternates,
    },
  }
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TourOperator",
  "@id": "https://www.keabelmet.com/#organization",
  name: "Keabelmet Expeditions",
  url: "https://www.keabelmet.com",
  logo: "https://www.keabelmet.com/logo.png",
  description: "Operador de ecoturismo y expediciones marinas en La Paz, Baja California Sur, Mexico.",
  email: "keabelmet@gmail.com",
  telephone: "+524422056214",
  address: {
    "@type": "PostalAddress",
    streetAddress: "La Ventana",
    addressLocality: "La Paz",
    addressRegion: "Baja California Sur",
    postalCode: "23232",
    addressCountry: "MX",
  },
  geo: { "@type": "GeoCoordinates", latitude: 24.0633, longitude: -109.9917 },
  sameAs: [
    "https://www.instagram.com/keabelmet__expeditions/",
    "https://www.tiktok.com/@kea_expeditions",
  ],
  areaServed: { "@type": "Place", name: "La Paz, Baja California Sur, Mexico" },
  priceRange: "$$",
}

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.keabelmet.com/#website",
  name: "Keabelmet Expeditions",
  url: "https://www.keabelmet.com",
  publisher: { "@id": "https://www.keabelmet.com/#organization" },
  inLanguage: "es",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const lang = localeToLang[locale]

  return (
    <html lang={lang}>
      <body className={`${geist.variable} font-sans antialiased`}>
        <CurrencyProvider>
          <Header locale={locale} />
          {children}
        </CurrencyProvider>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </body>
    </html>
  )
}
