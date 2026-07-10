"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import LanguageSelector from "./LanguageSelector"
import CurrencySelector from "@/components/CurrencySelector"
import { buildWhatsAppLink } from "@/config/whatsapp"

const navLabels: Record<Locale, { items: { label: string; path: string }[]; mobileOnly: { label: string; path: string }[]; book: string }> = {
  es: {
    items: [
      { label: "Expediciones", path: "/experiencias" },
      { label: "\u00bfQu\u00e9 Tour Elegir?", path: "/quiz" },
      { label: "Nuestra Historia", path: "/sobre-nosotros" },
      { label: "Galer\u00eda", path: "/galeria" },
      { label: "Contacto", path: "/contacto" },
    ],
    mobileOnly: [
      { label: "Inicio", path: "/" },
      { label: "Tarifas", path: "/tarifas" },
      { label: "Blog", path: "/blog" },
    ],
    book: "Reservar",
  },
  en: {
    items: [
      { label: "Expeditions", path: "/experiencias" },
      { label: "Which Tour to Choose?", path: "/quiz" },
      { label: "Our Story", path: "/sobre-nosotros" },
      { label: "Gallery", path: "/galeria" },
      { label: "Contact", path: "/contacto" },
    ],
    mobileOnly: [
      { label: "Home", path: "/" },
      { label: "Rates", path: "/tarifas" },
      { label: "Blog", path: "/blog" },
    ],
    book: "Book Now",
  },
  fr: {
    items: [
      { label: "Expeditions", path: "/experiencias" },
      { label: "Quel tour choisir ?", path: "/quiz" },
      { label: "Notre Histoire", path: "/sobre-nosotros" },
      { label: "Galerie", path: "/galeria" },
      { label: "Contact", path: "/contacto" },
    ],
    mobileOnly: [
      { label: "Accueil", path: "/" },
      { label: "Tarifs", path: "/tarifas" },
      { label: "Blog", path: "/blog" },
    ],
    book: "Reserver",
  },
  zh: {
    items: [
      { label: "\u63a2\u9669\u9879\u76ee", path: "/experiencias" },
      { label: "\u9009\u62e9\u54ea\u4e2a\u884c\u7a0b\uff1f", path: "/quiz" },
      { label: "\u6211\u4eec\u7684\u6545\u4e8b", path: "/sobre-nosotros" },
      { label: "\u56fe\u5e93", path: "/galeria" },
      { label: "\u8054\u7cfb\u6211\u4eec", path: "/contacto" },
    ],
    mobileOnly: [
      { label: "\u9996\u9875", path: "/" },
      { label: "\u4ef7\u683c", path: "/tarifas" },
      { label: "\u535a\u5ba2", path: "/blog" },
    ],
    book: "\u9884\u7ea6",
  },
}

function localizeHref(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export default function Header({ locale = "es" }: { locale?: Locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const nav = navLabels[locale] || navLabels.es

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={localizeHref("/", locale)} className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Keabelmet"
              width={40}
              height={40}
              priority
              className="w-10 h-10 rounded-full object-contain"
            />
            <span className="text-xl font-semibold text-gray-900">Keabelmet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {nav.items.map((item) => (
              <Link
                key={item.path}
                href={localizeHref(item.path, locale)}
                className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: Currency + Language + Book CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <CurrencySelector />
            <LanguageSelector locale={locale} />
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm font-medium whitespace-nowrap"
            >
              {nav.book}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {[...nav.mobileOnly, ...nav.items].map((item) => (
                <Link
                  key={item.path}
                  href={localizeHref(item.path, locale)}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2.5 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors font-medium text-center mt-2"
              >
                {nav.book}
              </a>
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <CurrencySelector />
                <LanguageSelector locale={locale} />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
