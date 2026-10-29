"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import Logo from "@/components/Logo"
import LanguageSelector from "./LanguageSelector"
import CurrencySelector from "@/components/CurrencySelector"

const navLabels: Record<Locale, { items: { label: string; path: string; teal?: boolean }[]; book: string; cart: string }> = {
  es: {
    items: [
      { label: "Expediciones", path: "/#expediciones" },
      { label: "¿Qué Tour Elegir?", path: "/#quiz", teal: true },
      { label: "Calendario", path: "/#calendario", teal: true },
      { label: "Galería", path: "/#instagram" },
      { label: "Certifícate", path: "/experiencias/certificacion-open-water", teal: true },
      { label: "Contacto", path: "/#contacto" },
    ],
    book: "Reservar",
    cart: "Arma tu reserva",
  },
  en: {
    items: [
      { label: "Expeditions", path: "/#expediciones" },
      { label: "Which Tour?", path: "/#quiz", teal: true },
      { label: "Calendar", path: "/#calendario", teal: true },
      { label: "Gallery", path: "/#instagram" },
      { label: "Get Certified", path: "/experiencias/certificacion-open-water", teal: true },
      { label: "Contact", path: "/#contacto" },
    ],
    book: "Book Now",
    cart: "Build your reservation",
  },
  fr: {
    items: [
      { label: "Expéditions", path: "/#expediciones" },
      { label: "Quel tour ?", path: "/#quiz", teal: true },
      { label: "Calendrier", path: "/#calendario", teal: true },
      { label: "Galerie", path: "/#instagram" },
      { label: "Certifiez-vous", path: "/experiencias/certificacion-open-water", teal: true },
      { label: "Contact", path: "/#contacto" },
    ],
    book: "Réserver",
    cart: "Composez votre réservation",
  },
  zh: {
    items: [
      { label: "探险项目", path: "/#expediciones" },
      { label: "选择行程？", path: "/#quiz", teal: true },
      { label: "季节日历", path: "/#calendario", teal: true },
      { label: "图库", path: "/#instagram" },
      { label: "潜水认证", path: "/experiencias/certificacion-open-water", teal: true },
      { label: "联系我们", path: "/#contacto" },
    ],
    book: "预约",
    cart: "定制你的预订",
  },
  ca: {
    items: [
      { label: "Expedicions", path: "/#expediciones" },
      { label: "Quin tour triar?", path: "/#quiz", teal: true },
      { label: "Calendari", path: "/#calendario", teal: true },
      { label: "Galeria", path: "/#instagram" },
      { label: "Certifica't", path: "/experiencias/certificacion-open-water", teal: true },
      { label: "Contacte", path: "/#contacto" },
    ],
    book: "Reservar",
    cart: "Munta la teva reserva",
  },
}

function localizeHref(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export default function Header({ locale = "es" }: { locale?: Locale }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const nav = navLabels[locale] || navLabels.es
  const pathname = usePathname()
  // Solo el home lleva header transparente sobre el hero; el resto siempre sólido.
  const isHome = pathname === "/" || /^\/(en|fr|zh)\/?$/.test(pathname)
  const solid = scrolled || !isHome

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
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
          <Link
            href={localizeHref("/arma-tu-reserva", locale)}
            className="nav-cart"
            aria-label={nav.cart}
            title={nav.cart}
            onClick={() => setIsMenuOpen(false)}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </Link>
          <a
            href={pathname.includes("/experiencias/") ? "#precios" : localizeHref("/arma-tu-reserva", locale)}
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
