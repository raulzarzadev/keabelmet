import { Fragment } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

interface CalendarRow {
  name: string
  note?: string
  href: string
  /** Meses de temporada (1-12) */
  months: number[]
  /** Meses de temporada alta (1-12) */
  peak: number[]
}

const ALL_YEAR = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/** Temporadas reales por expedición — misma fuente que el quiz del home. */
const rows: CalendarRow[] = [
  {
    name: "Safari La Ventana",
    note: "Móbulas",
    href: "/experiencias/safari-la-ventana",
    months: [4, 5, 6],
    peak: [5],
  },
  {
    name: "Safari Bahía Magdalena",
    note: "Corrida de sardinas",
    href: "/experiencias/safari-bahia-magdalena",
    months: [11, 12],
    peak: [11, 12],
  },
  {
    name: "Ballena Gris · Puerto Chale",
    note: "Madres y crías",
    href: "/experiencias/tour-ballena-gris",
    months: [1, 2, 3],
    peak: [2],
  },
  {
    name: "Tiburón Ballena",
    note: "Snorkel",
    href: "/experiencias/tiburon-ballena",
    months: [10, 11, 12, 1, 2, 3, 4],
    peak: [12, 1],
  },
  {
    name: "Isla Espíritu Santo",
    note: "Lobos marinos",
    href: "/experiencias/tour-espiritu-santo",
    months: ALL_YEAR,
    peak: [8],
  },
  {
    name: "Scuba Diving Cabo Pulmo",
    note: "Arrecife vivo",
    href: "/experiencias/buceo-cabo-pulmo",
    months: ALL_YEAR,
    peak: [8, 9],
  },
  {
    name: "Scuba Diving Espíritu Santo",
    note: "Lobos marinos",
    href: "/experiencias/buceo-la-paz",
    months: ALL_YEAR,
    peak: [8],
  },
  {
    name: "Scuba Discovery desde Playa",
    note: "Principiantes",
    href: "/experiencias/scuba-discovery",
    months: ALL_YEAR,
    peak: [],
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
                <Link href={lh(row.href)}>{row.name}</Link>
                {row.note && <span>{row.note}</span>}
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
