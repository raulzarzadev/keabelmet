import { Fragment, type ReactNode } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

interface CalendarRow {
  name: string
  note?: string
  href: string
  icon: ReactNode
  /** Meses de temporada (1-12) */
  months: number[]
  /** Meses de temporada alta (1-12) */
  peak: number[]
}

const ALL_YEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

const icons = {
  // Móbula / manta
  manta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6c-3.5 0-7.5 2.5-10 7 3-.5 6 0 8 2l2 5 2-5c2-2 5-2.5 8-2-2.5-4.5-6.5-7-10-7z" />
    </svg>
  ),
  // Marlín / pez
  marlin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12c2.5-3.5 6-5 9-5 3 0 5 2 6 5-1 3-3 5-6 5-3 0-6.5-1.5-9-5z" />
      <path d="M7 12L2 8v8l5-4z" />
      <path d="M13 7l1-4" />
      <circle cx="17.5" cy="11" r="0.4" fill="currentColor" />
    </svg>
  ),
  // Cola de ballena
  whaleTail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21v-7" />
      <path d="M12 14c-1-4-4-7-8-8 0 3 1.5 6 4 7.5 1.5.9 3 .8 4 .5z" />
      <path d="M12 14c1-4 4-7 8-8 0 3-1.5 6-4 7.5-1.5.9-3 .8-4 .5z" />
    </svg>
  ),
  // Tiburón ballena (pez con puntos)
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
  // Visor de snorkel
  snorkel: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="13" height="7" rx="3.5" />
      <path d="M9.5 15v3" />
      <path d="M20 4v8a3 3 0 0 1-3 3" />
    </svg>
  ),
  // Tanque de buceo
  tank: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8.5" y="7" width="7" height="13" rx="3.5" />
      <path d="M12 7V4" />
      <path d="M9.5 4h5" />
      <circle cx="19" cy="8" r="0.6" />
      <circle cx="20.5" cy="5" r="0.6" />
    </svg>
  ),
  // Ancla (barcos hundidos)
  anchor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2.2" />
      <path d="M12 7.2V20" />
      <path d="M5 12c0 4.5 3 8 7 8s7-3.5 7-8" />
      <path d="M9 12H5M19 12h-4" />
    </svg>
  ),
  // Burbujas (primera vez bajo el agua)
  bubbles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="16" r="3.5" />
      <circle cx="15" cy="9" r="2.5" />
      <circle cx="19.5" cy="4" r="1.4" />
    </svg>
  ),
}

/** Temporadas reales por expedición. */
const rows: CalendarRow[] = [
  {
    name: "Safari La Ventana",
    note: "Móbulas",
    href: "/experiencias/safari-la-ventana",
    icon: icons.manta,
    months: ALL_YEAR,
    peak: [4, 5, 6],
  },
  {
    name: "Safari Bahía Magdalena",
    note: "Corrida de sardinas",
    href: "/experiencias/safari-bahia-magdalena",
    icon: icons.marlin,
    months: [11, 12],
    peak: [11, 12],
  },
  {
    name: "Ballena Gris · Puerto Chale",
    note: "Madres y crías",
    href: "/experiencias/tour-ballena-gris",
    icon: icons.whaleTail,
    months: [1, 2, 3],
    peak: [2, 3],
  },
  {
    name: "Tiburón Ballena",
    note: "Snorkel",
    href: "/experiencias/tiburon-ballena",
    icon: icons.whaleShark,
    months: [11, 12, 1, 2, 3],
    peak: [12, 1, 2],
  },
  {
    name: "Isla Espíritu Santo",
    note: "Lobos marinos",
    href: "/experiencias/tour-espiritu-santo",
    icon: icons.snorkel,
    months: ALL_YEAR,
    peak: [6, 8, 12, 1],
  },
  {
    name: "Scuba Diving Cabo Pulmo",
    note: "Arrecife vivo",
    href: "/experiencias/buceo-cabo-pulmo",
    icon: icons.tank,
    months: ALL_YEAR,
    peak: [7, 8, 9, 10, 11, 12],
  },
  {
    name: "Scuba Diving Espíritu Santo",
    note: "Lobos marinos · Barcos hundidos",
    href: "/experiencias/buceo-la-paz",
    icon: icons.anchor,
    months: ALL_YEAR,
    peak: [5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "Scuba Discovery desde Playa",
    note: "Principiantes",
    href: "/experiencias/scuba-discovery",
    icon: icons.bubbles,
    months: ALL_YEAR,
    peak: [5, 6, 7, 8, 9, 10, 11, 12],
  },
]

export default function SeasonCalendar({ locale = defaultLocale }: { locale?: Locale }) {
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

  return (
    <section id="calendario" className="calsec">
      <div className="section-head" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <span className="kicker">Calendario de temporadas</span>
        <h2>La mejor época para cada expedición</h2>
        <p>El mar tiene sus propios tiempos. Elige tu mes de viaje y descubre qué encuentros te esperan.</p>
      </div>

      <div className="cal-scroll">
        <div className="cal-table">
          <div className="cal-corner" />
          {MONTHS.map((m) => (
            <div key={m} className="cal-month">{m}</div>
          ))}

          {rows.map((row) => (
            <Fragment key={row.href}>
              <div className="cal-tour">
                <span className="cal-icon">{row.icon}</span>
                <div>
                  <Link href={lh(row.href)}>{row.name}</Link>
                  {row.note && <span className="cal-note">{row.note}</span>}
                </div>
              </div>
              {MONTHS.map((_, i) => {
                const month = i + 1
                const peak = row.peak.includes(month)
                const on = row.months.includes(month)
                return (
                  <div
                    key={`${row.href}-${month}`}
                    className={`cal-cell${peak ? " peak" : on ? " on" : ""}`}
                    title={`${row.name} · ${MONTHS[i]}${peak ? " (temporada alta)" : on ? " (temporada)" : ""}`}
                  />
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="cal-legend">
        <span><i className="cal-dot on" /> Temporada</span>
        <span><i className="cal-dot peak" /> Temporada alta</span>
        <span><i className="cal-dot" /> Fuera de temporada</span>
      </div>
    </section>
  )
}
