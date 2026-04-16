"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import LanguageSelector from "./LanguageSelector"
import CurrencySelector from "@/components/CurrencySelector"

const navLabels: Record<Locale, { items: { label: string; path: string }[]; book: string }> = {
  es: {
    items: [
      { label: "Inicio", path: "/" },
      { label: "Sobre Nosotros", path: "/sobre-nosotros" },
      { label: "Experiencias", path: "/experiencias" },
      { label: "Tarifas", path: "/tarifas" },
      { label: "Galeria", path: "/galeria" },
      { label: "Blog", path: "/blog" },
      { label: "Contacto", path: "/contacto" },
      { label: "Escoge tu tour", path: "/quiz" },
    ],
    book: "Reservar",
  },
  en: {
    items: [
      { label: "Home", path: "/" },
      { label: "About Us", path: "/sobre-nosotros" },
      { label: "Experiences", path: "/experiencias" },
      { label: "Rates", path: "/tarifas" },
      { label: "Gallery", path: "/galeria" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contacto" },
      { label: "Find your tour", path: "/quiz" },
    ],
    book: "Book Now",
  },
  fr: {
    items: [
      { label: "Accueil", path: "/" },
      { label: "A Propos", path: "/sobre-nosotros" },
      { label: "Experiences", path: "/experiencias" },
      { label: "Tarifs", path: "/tarifas" },
      { label: "Galerie", path: "/galeria" },
      { label: "Blog", path: "/blog" },
      { label: "Contact", path: "/contacto" },
      { label: "Trouvez votre tour", path: "/quiz" },
    ],
    book: "Reserver",
  },
  zh: {
    items: [
      { label: "\u9996\u9875", path: "/" },
      { label: "\u5173\u4e8e\u6211\u4eec", path: "/sobre-nosotros" },
      { label: "\u4f53\u9a8c\u9879\u76ee", path: "/experiencias" },
      { label: "\u4ef7\u683c", path: "/tarifas" },
      { label: "\u56fe\u5e93", path: "/galeria" },
      { label: "\u535a\u5ba2", path: "/blog" },
      { label: "\u8054\u7cfb\u6211\u4eec", path: "/contacto" },
      { label: "\u627e\u5230\u4f60\u7684\u884c\u7a0b", path: "/quiz" },
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
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">Keabelmet</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
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

          {/* Right side: Language + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <CurrencySelector />
            <LanguageSelector locale={locale} />
            <Link
              href={localizeHref("/contacto", locale)}
              className="px-6 py-2.5 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#152942] transition-colors font-medium"
            >
              {nav.book}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <CurrencySelector />
            <LanguageSelector locale={locale} />
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
              {nav.items.map((item) => (
                <Link
                  key={item.path}
                  href={localizeHref(item.path, locale)}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-medium py-2"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={localizeHref("/contacto", locale)}
                onClick={() => setIsMenuOpen(false)}
                className="px-6 py-2.5 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#152942] transition-colors font-medium text-center mt-2"
              >
                {nav.book}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
