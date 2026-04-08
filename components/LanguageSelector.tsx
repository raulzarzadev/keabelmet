"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { locales, type Locale, defaultLocale, pathnameForLocale, getLocaleFromPathname } from "@/lib/i18n"

const localeLabels: Record<Locale, { label: string; flag: string }> = {
  es: { label: "ES", flag: "\u{1F1F2}\u{1F1FD}" },
  en: { label: "EN", flag: "\u{1F1FA}\u{1F1F8}" },
  fr: { label: "FR", flag: "\u{1F1EB}\u{1F1F7}" },
  zh: { label: "ZH", flag: "\u{1F1E8}\u{1F1F3}" },
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
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        aria-label="Seleccionar idioma"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <svg className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-32 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg z-50">
          {locales.map((loc) => {
            const item = localeLabels[loc]
            const isActive = loc === locale
            return (
              <button
                key={loc}
                onClick={() => handleSelect(loc)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition hover:bg-gray-50 ${
                  isActive ? "bg-teal-50 font-semibold text-teal-700" : "text-gray-700"
                }`}
              >
                <span>{item.flag}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
