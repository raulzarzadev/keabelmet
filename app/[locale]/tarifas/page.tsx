import type { Metadata } from "next"
import Link from "next/link"
import { isValidLocale, defaultLocale, getPageDictionary, type Locale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { buildPageMeta, getPageSeo } from "@/lib/seo"
import { getBookableActivities } from "@/lib/bookable-activities"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("rates", "/tarifas", locale)
}

const ui: Record<Locale, { from: string; perPerson: string; season: string; details: string; build: string; buildText: string }> = {
  es: { from: "Desde", perPerson: "por persona", season: "Temporada", details: "Ver la experiencia", build: "Arma tu reserva", buildText: "¿Quieres hacer varias? Elige tus actividades y aparta todo con solo el 20%." },
  en: { from: "From", perPerson: "per person", season: "Season", details: "See the experience", build: "Build your booking", buildText: "Want to do several? Pick your activities and reserve them all with just 20%." },
  fr: { from: "À partir de", perPerson: "par personne", season: "Saison", details: "Voir l'expérience", build: "Composez votre réservation", buildText: "Plusieurs activités ? Choisissez-les et réservez le tout avec seulement 20 %." },
  zh: { from: "起价", perPerson: "每人", season: "季节", details: "查看行程", build: "定制预订", buildText: "想参加多个行程？选择活动，只需付20%即可全部预订。" },
  ca: { from: "Des de", perPerson: "per persona", season: "Temporada", details: "Veure l'experiència", build: "Munta la teva reserva", buildText: "Vols fer-ne diverses? Tria les teves activitats i aparta-ho tot amb només el 20%." },
}

export default async function Tarifas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("rates", locale) as Record<string, any>
  const u = ui[locale] ?? ui.es
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)
  // Mismos precios que valida el servidor al cobrar: la tarjeta más barata de cada experiencia.
  const activities = getBookableActivities(locale).sort((a, b) => a.unitAmountMxn - b.unitAmountMxn)

  return (
    <main>
      <section className="pagehero">
        <span className="kicker">{t.title}</span>
        <h1>{getPageSeo("rates", locale).title}</h1>
        <p>{t.subtitle}</p>
      </section>

      <div className="page-wrap narrow">
        <div className="dgrid-2">
          {activities.map((a) => (
            <div key={a.slug} className="rate-card">
              <h3>{a.title}</h3>
              <p className="rate-dur">{u.season}: {a.season}</p>
              <div className="rate-amount">
                <small style={{ fontSize: "0.42em", fontWeight: 600, marginRight: 6 }}>{u.from}</small><Price amount={a.unitAmountMxn} />
              </div>
              <p className="rate-dur">{a.cardName} · {u.perPerson}</p>
              <Link href={lh(a.href)} className="btn btn-solid" style={{ justifyContent: "center", marginTop: "auto" }}>
                {u.details}
              </Link>
            </div>
          ))}
        </div>
        <div className="rate-card feat" style={{ marginTop: 32, textAlign: "center" }}>
          <p>{u.buildText}</p>
          <Link href={lh("/arma-tu-reserva")} className="btn btn-teal" style={{ justifyContent: "center" }}>
            {u.build}
          </Link>
        </div>
      </div>
    </main>
  )
}
