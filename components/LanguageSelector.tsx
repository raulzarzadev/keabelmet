"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { locales, type Locale, pathnameForLocale } from "@/lib/i18n"

const localeLabels: Record<Locale, { label: string; name: string; flag: string }> = {
  es: { label: "ES", name: "Español", flag: "\u{1F1F2}\u{1F1FD}" },
  en: { label: "EN", name: "English", flag: "\u{1F1FA}\u{1F1F8}" },
  fr: { label: "FR", name: "Français", flag: "\u{1F1EB}\u{1F1F7}" },
  zh: { label: "ZH", name: "中文", flag: "\u{1F1E8}\u{1F1F3}" },
}

export default function LanguageSelector({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (targetLocale: Locale) => {
    setOpen(false)
    if (targetLocale === locale) return
    const newPath = pathnameForLocale(pathname, targetLocale)
    router.push(newPath)
  }

  const current = localeLabels[locale]

  return (
    <div ref={ref} className={`switcher${open ? " open" : ""}`}>
      <button className="switcher-btn" onClick={() => setOpen(!open)} aria-label="Elegir idioma">
        <span>{current.flag} {current.label}</span>
        <svg viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </button>
      <div className="switcher-menu">
        {locales.map((loc) => {
          const item = localeLabels[loc]
          return (
            <button
              key={loc}
              className={loc === locale ? "active" : undefined}
              onClick={() => handleSelect(loc)}
            >
              {item.flag} {item.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
