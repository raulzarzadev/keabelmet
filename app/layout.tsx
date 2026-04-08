import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/Header"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.keabelmet.com"),
  title: {
    default: "Keabelmet Expeditions | Ecoturismo y Safari Marino en La Paz, BCS",
    template: "%s | Keabelmet Expeditions",
  },
  description:
    "Vive aventuras marinas en Baja California Sur. Safaris marinos, buceo en Cabo Pulmo, snorkel con lobos marinos, avistamiento de ballenas y mas. Grupos reducidos con biologos marinos.",
  keywords: [
    "ecoturismo La Paz",
    "safari marino Baja California Sur",
    "buceo Cabo Pulmo",
    "snorkel lobos marinos",
    "avistamiento ballenas",
    "Isla Espiritu Santo",
    "tours La Paz BCS",
    "expediciones marinas Mexico",
  ],
  authors: [{ name: "Keabelmet Expeditions" }],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://www.keabelmet.com",
    siteName: "Keabelmet Expeditions",
    title: "Keabelmet Expeditions | Ecoturismo y Safari Marino en La Paz, BCS",
    description:
      "Vive aventuras marinas en Baja California Sur. Safaris marinos, buceo, snorkel con lobos marinos y avistamiento de ballenas.",
    images: [
      {
        url: "/cachalotecta.jpeg",
        width: 1200,
        height: 630,
        alt: "Keabelmet Expeditions - Safari Marino en Baja California Sur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Keabelmet Expeditions | Safari Marino en La Paz, BCS",
    description:
      "Safaris marinos, buceo, snorkel con lobos marinos y avistamiento de ballenas en Baja California Sur.",
    images: ["/cachalotecta.jpeg"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TourOperator",
  "@id": "https://www.keabelmet.com/#organization",
  name: "Keabelmet Expeditions",
  url: "https://www.keabelmet.com",
  logo: "https://www.keabelmet.com/logo.png",
  description:
    "Operador de ecoturismo y expediciones marinas en La Paz, Baja California Sur, Mexico.",
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
  geo: {
    "@type": "GeoCoordinates",
    latitude: 24.0633,
    longitude: -109.9917,
  },
  sameAs: [
    "https://www.instagram.com/keabelmet__expeditions/",
    "https://www.tiktok.com/@kea_expeditions",
  ],
  areaServed: {
    "@type": "Place",
    name: "La Paz, Baja California Sur, Mexico",
  },
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${geist.variable} font-sans antialiased`}>
        <Header />
        {children}
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
