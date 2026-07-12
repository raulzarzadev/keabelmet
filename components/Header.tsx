"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import Logo from "@/components/Logo"
import LanguageSelector from "./LanguageSelector"
import CurrencySelector from "@/components/CurrencySelector"
import { buildWhatsAppLink } from "@/config/whatsapp"

const navLabels: Record<Locale, { items: { label: string; path: string; teal?: boolean }[]; book: string }> = {
  es: {
    items: [
      { label: "Expediciones", path: "/#expediciones" },
      { label: "¿Qué Tour Elegir?", path: "/#quiz", teal: true },
      { label: "Calendario", path: "/#calendario", teal: true },
      { label: "Galería", path: "/#instagram" },
      { label: "Contacto", path: "/#contacto" },
    ],
    book: "Reservar",
  },
  en: {
    items: [
      { label: "Expeditions", path: "/#expediciones" },
      { label: "Which Tour?", path: "/#quiz", teal: true },
      { label: "Calendar", path: "/#calendario", teal: true },
      { label: "Gallery", path: "/#instagram" },
      { label: "Contact", path: "/#contacto" },
    ],
    book: "Book Now",
  },
  fr: {
    items: [
      { label: "Expéditions", path: "/#expediciones" },
      { label: "Quel tour ?", path: "/#quiz", teal: true },
      { label: "Calendrier", path: "/#calendario", teal: true },
      { label: "Galerie", path: "/#instagram" },
      { label: "Contact", path: "/#contacto" },
    ],
    book: "Réserver",
  },
  zh: {
    items: [
      { label: "探险项目", path: "/#expediciones" },
      { label: "选择行程？", path: "/#quiz", teal: true },
      { label: "季节日历", path: "/#calendario", teal: true },
      { label: "图库", path: "/#instagram" },
      { label: "联系我们", path: "/#contacto" },
    ],
    book: "预约",
  },
}

function localizeHref(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export default function Header({ locale = "es" }: { locale?: Locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const nav = navLabels[locale] || navLabels.es

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`kbm-header${solid ? " solid" : ""}`}>
      <div className="wrap">
        <Logo href={localizeHref("/", locale)} />

        <nav className={`links${isMenuOpen ? " open" : ""}`}>
          {nav.items.map((item) => (
            <Link
              key={item.path}
              href={localizeHref(item.path, locale)}
              style={item.teal ? { color: "var(--teal)" } : undefined}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <div className="switcher-group">
            <CurrencySelector />
            <LanguageSelector locale={locale} />
          </div>
          <a
            href={buildWhatsAppLink("Hola! quiero reservar una expedición con Keabelmet")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-teal"
            style={{ padding: "12px 22px" }}
          >
            {nav.book}
          </a>
          <button
            className={`burger${isMenuOpen ? " open" : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menú"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
