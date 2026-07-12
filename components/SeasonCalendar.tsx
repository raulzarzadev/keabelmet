import { Fragment, type ReactNode } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"

interface CalendarDict {
  kicker: string
  title: string
  sub: string
  months: string[]
  season: string
  peak: string
  off: string
  peakSuffix: string
  seasonSuffix: string
  rows: Record<string, { name: string; note: string }>
}

const es: CalendarDict = {
  kicker: "Calendario de temporadas",
  title: "La mejor época para cada expedición",
  sub: "El mar tiene sus propios tiempos. Elige tu mes de viaje y descubre qué encuentros te esperan.",
  months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  season: "Temporada",
  peak: "Temporada alta",
  off: "Fuera de temporada",
  peakSuffix: " (temporada alta)",
  seasonSuffix: " (temporada)",
  rows: {
    "la-ventana": { name: "Ocean Safari La Ventana", note: "Móbulas" },
    "bahia-magdalena": { name: "Safari Bahía Magdalena", note: "Corrida de sardinas" },
    "ballena-gris": { name: "Ballena Gris · Puerto Chale", note: "Madres y crías" },
    "tiburon-ballena": { name: "Tiburón Ballena", note: "Snorkel" },
    "espiritu-santo": { name: "Tour Snorkel Isla Espíritu Santo", note: "Lobos marinos" },
    "cabo-pulmo": { name: "Scuba Diving Cabo Pulmo", note: "Arrecife vivo" },
    "espiritu-santo-buceo": { name: "Scuba Diving Espíritu Santo", note: "Lobos marinos · Barcos hundidos" },
    "scuba-discovery": { name: "Scuba Discovery desde Playa", note: "Principiantes" },
  },
}

const en: CalendarDict = {
  kicker: "Season calendar",
  title: "The best time for every expedition",
  sub: "The sea keeps its own schedule. Pick your travel month and discover which encounters await.",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  season: "In season",
  peak: "Peak season",
  off: "Off season",
  peakSuffix: " (peak season)",
  seasonSuffix: " (in season)",
  rows: {
    "la-ventana": { name: "Ocean Safari La Ventana", note: "Mobulas" },
    "bahia-magdalena": { name: "Magdalena Bay Safari", note: "Sardine run" },
    "ballena-gris": { name: "Gray Whale · Puerto Chale", note: "Mothers and calves" },
    "tiburon-ballena": { name: "Whale Shark", note: "Snorkeling" },
    "espiritu-santo": { name: "Snorkel Tour Espiritu Santo Island", note: "Sea lions" },
    "cabo-pulmo": { name: "Scuba Diving Cabo Pulmo", note: "Living reef" },
    "espiritu-santo-buceo": { name: "Scuba Diving Espiritu Santo", note: "Sea lions · Shipwrecks" },
    "scuba-discovery": { name: "Scuba Discovery from the Beach", note: "Beginners" },
  },
}

/** ES y EN completos; FR y ZH usan EN mientras se traducen. */
const dicts: Record<Locale, CalendarDict> = { es, en, fr: en, zh: en }

const ALL_YEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const icons = {
  manta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-3.5 0-7.5 2.5-10 7 3-.5 6 0 8 2l2 5 2-5c2-2 5-2.5 8-2-2.5-4.5-6.5-7-10-7z" />
    </svg>
  ),
  marlin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12c2.5-3.5 6-5 9-5 3 0 5 2 6 5-1 3-3 5-6 5-3 0-6.5-1.5-9-5z" />
      <path d="M7 12L2 8v8l5-4z" />
      <path d="M13 7l1-4" />
      <circle cx="17.5" cy="11" r="0.4" fill="currentColor" />
    </svg>
  ),
  whaleTail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21v-7" />
      <path d="M12 14c-1-4-4-7-8-8 0 3 1.5 6 4 7.5 1.5.9 3 .8 4 .5z" />
      <path d="M12 14c1-4 4-7 8-8 0 3-1.5 6-4 7.5-1.5.9-3 .8-4 .5z" />
    </svg>
  ),
  whaleShark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13c3-4.5 7-7 11-7 4 0 6.5 2.5 7 6-1 3-4 5-8 5-4 0-7-1.5-10-4z" />
      <path d="M11 6.5L13 3l1.5 3.2" />
      <circle cx="8" cy="11.5" r="0.4" fill="currentColor" />
      <circle cx="11" cy="10" r="0.4" fill="currentColor" />
      <circle cx="14" cy="11.5" r="0.4" fill="currentColor" />
      <circle cx="11.5" cy="13.5" r="0.4" fill="currentColor" />
    </svg>
  ),
  snorkel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="13" height="7" rx="3.5" />
      <path d="M9.5 15v3" />
      <path d="M20 4v8a3 3 0 0 1-3 3" />
    </svg>
  ),
  tank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8.5" y="7" width="7" height="13" rx="3.5" />
      <path d="M12 7V4" />
      <path d="M9.5 4h5" />
      <circle cx="19" cy="8" r="0.6" />
      <circle cx="20.5" cy="5" r="0.6" />
    </svg>
  ),
  anchor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.2" />
      <path d="M12 7.2V20" />
      <path d="M5 12c0 4.5 3 8 7 8s7-3.5 7-8" />
      <path d="M9 12H5M19 12h-4" />
    </svg>
  ),
  bubbles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="16" r="3.5" />
      <circle cx="15" cy="9" r="2.5" />
      <circle cx="19.5" cy="4" r="1.4" />
    </svg>
  ),
}

interface CalendarRowBase {
  id: string
  href: string
  icon: ReactNode
  months: number[]
  peak: number[]
}

/** Temporadas reales por expedición. */
const rows: CalendarRowBase[] = [
  { id: "la-ventana", href: "/experiencias/safari-la-ventana", icon: icons.manta, months: ALL_YEAR, peak: [4, 5, 6] },
  { id: "bahia-magdalena", href: "/experiencias/safari-bahia-magdalena", icon: icons.marlin, months: [11, 12], peak: [11, 12] },
  { id: "ballena-gris", href: "/experiencias/tour-ballena-gris", icon: icons.whaleTail, months: [1, 2, 3], peak: [2, 3] },
  { id: "tiburon-ballena", href: "/experiencias/tiburon-ballena", icon: icons.whaleShark, months: [11, 12, 1, 2, 3], peak: [12, 1, 2] },
  { id: "espiritu-santo", href: "/experiencias/tour-espiritu-santo", icon: icons.snorkel, months: ALL_YEAR, peak: [6, 8, 12, 1] },
  { id: "cabo-pulmo", href: "/experiencias/buceo-cabo-pulmo", icon: icons.tank, months: ALL_YEAR, peak: [7, 8, 9, 10, 11, 12] },
  { id: "espiritu-santo-buceo", href: "/experiencias/buceo-la-paz", icon: icons.anchor, months: ALL_YEAR, peak: [5, 6, 7, 8, 9, 10, 11, 12] },
  { id: "scuba-discovery", href: "/experiencias/scuba-discovery", icon: icons.bubbles, months: ALL_YEAR, peak: [5, 6, 7, 8, 9, 10, 11, 12] },
]

export default function SeasonCalendar({ locale = defaultLocale }: { locale?: Locale }) {
  const t = dicts[locale] || dicts.es
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

  return (
    <section id="calendario" className="calsec">
      <div className="section-head" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <span className="kicker">{t.kicker}</span>
        <h2>{t.title}</h2>
        <p>{t.sub}</p>
      </div>

      <div className="cal-scroll">
        <div className="cal-table">
          <div className="cal-corner" />
          {t.months.map((m) => (
            <div key={m} className="cal-month">{m}</div>
          ))}

          {rows.map((row) => {
            const text = t.rows[row.id]
            return (
              <Fragment key={row.id}>
                <div className="cal-tour">
                  <span className="cal-icon">{row.icon}</span>
                  <div>
                    <Link href={lh(row.href)}>{text.name}</Link>
                    <span className="cal-note">{text.note}</span>
                  </div>
                </div>
                {t.months.map((_, i) => {
                  const month = i + 1
                  const peak = row.peak.includes(month)
                  const on = row.months.includes(month)
                  return (
                    <div
                      key={`${row.id}-${month}`}
                      className={`cal-cell${peak ? " peak" : on ? " on" : ""}`}
                      title={`${text.name} · ${t.months[i]}${peak ? t.peakSuffix : on ? t.seasonSuffix : ""}`}
                    />
                  )
                })}
              </Fragment>
            )
          })}
        </div>
      </div>

      <div className="cal-legend">
        <span><i className="cal-dot on" /> {t.season}</span>
        <span><i className="cal-dot peak" /> {t.peak}</span>
        <span><i className="cal-dot" /> {t.off}</span>
      </div>
    </section>
  )
}
