import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "@/styles/theme.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppFloat from "@/components/WhatsAppFloat"
import { CurrencyProvider } from "@/contexts/CurrencyContext"
import { locales, type Locale, isValidLocale } from "@/lib/i18n"
import { pageMeta, SITE_URL } from "@/lib/seo"
import { notFound } from "next/navigation"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

const localeToLang: Record<Locale, string> = {
  es: "es",
  en: "en",
  fr: "fr",
  zh: "zh-CN",
}

const homeMeta: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }> = {
  es: {
    title: "Keabelmet Expeditions | Ecoturismo y Safari Marino en La Paz, BCS",
    description: "Vive aventuras marinas en Baja California Sur. Safaris marinos, buceo en Cabo Pulmo, snorkel con lobos marinos, avistamiento de ballenas y mas.",
    ogTitle: "Keabelmet Expeditions",
    ogDescription: "Expediciones marinas en La Paz, Baja California Sur. Nada con lobos marinos, avista ballenas y explora el Mar de Cortes.",
  },
  en: {
    title: "Keabelmet Expeditions | Marine Ecotourism & Safari in La Paz, BCS",
    description: "Live marine adventures in Baja California Sur. Marine safaris, diving in Cabo Pulmo, snorkeling with sea lions, whale watching and more.",
    ogTitle: "Keabelmet Expeditions",
    ogDescription: "Marine expeditions in La Paz, Baja California Sur. Swim with sea lions, watch whales and explore the Sea of Cortez.",
  },
  fr: {
    title: "Keabelmet Expeditions | Ecotourisme et Safari Marin a La Paz, BCS",
    description: "Vivez des aventures marines en Basse-Californie du Sud. Safaris marins, plongee a Cabo Pulmo, snorkeling avec des otaries, observation des baleines et plus.",
    ogTitle: "Keabelmet Expeditions",
    ogDescription: "Expeditions marines a La Paz, Basse-Californie du Sud. Nagez avec des otaries, observez les baleines et explorez la mer de Cortez.",
  },
  zh: {
    title: "Keabelmet 探险 | 拉巴斯生态旅游与海洋野生动物之旅",
    description: "在下加利福尼亚州体验海洋冒险。海洋野生动物之旅、卡波普尔莫潜水、与海狮浮潜、观鲸等。",
    ogTitle: "Keabelmet 探险",
    ogDescription: "拉巴斯海洋探险。与海狮共游，观赏鲸鱼，探索科尔特斯海。",
  },
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

  const m = homeMeta[locale]

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: m.title,
      template: "%s | Keabelmet Expeditions",
    },
    description: m.description,
    ...pageMeta({ path: "/", locale, title: m.ogTitle, description: m.ogDescription }),
  }
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TourOperator",
  "@id": "https://www.keabelmet.com/#organization",
  name: "Keabelmet Expeditions",
  alternateName: [
    "Keabelmet",
    "Kea Expeditions",
    "Keabelmet Tours",
    "Keablemet",
    "Kebelmet",
    "Kabelmet",
    "Cabelmet",
    "Kavelmet",
    "Cavelmet",
    "Keavelmet",
    "Keabelment",
    "Keabelnet",
  ],
  url: "https://www.keabelmet.com",
  logo: "https://www.keabelmet.com/logo.png",
  image: "https://www.keabelmet.com/logo.png",
  description: "Operador de ecoturismo y expediciones marinas en La Paz, Baja California Sur, Mexico.",
  email: "keabelmet@gmail.com",
  telephone: "+526122347897",
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
  areaServed: [
    { "@type": "Place", name: "La Paz, Baja California Sur, Mexico" },
    { "@type": "Place", name: "La Ventana, Baja California Sur, Mexico" },
    { "@type": "Place", name: "Bahia Magdalena, Baja California Sur, Mexico" },
    { "@type": "Place", name: "Cabo Pulmo, Baja California Sur, Mexico" },
  ],
  currenciesAccepted: "MXN, USD",
  paymentAccepted: "Cash, Credit Card, Bank Transfer",
  priceRange: "$$",
}

const localeToInLanguage: Record<Locale, string> = {
  es: "es-MX",
  en: "en-US",
  fr: "fr-FR",
  zh: "zh-CN",
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.keabelmet.com/#website",
    name: "Keabelmet Expeditions",
    alternateName: [
      "Keabelmet",
      "Kea Expeditions",
      "Keablemet",
      "Kebelmet",
      "Kabelmet",
      "Cabelmet",
      "Kavelmet",
      "Cavelmet",
      "Keavelmet",
    ],
    url: "https://www.keabelmet.com",
    publisher: { "@id": "https://www.keabelmet.com/#organization" },
    inLanguage: localeToInLanguage[locale],
  }

  return (
    <html lang={lang}>
      <body className={`${poppins.variable} kbm antialiased`}>
        <CurrencyProvider>
          <Header locale={locale} />
          {children}
          <Footer locale={locale} />
        </CurrencyProvider>
        <WhatsAppFloat />
        <Analytics />
        <SpeedInsights />
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
