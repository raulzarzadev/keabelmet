import type { Metadata } from "next"
import { Check } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { buildPageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("rates", "/tarifas", locale)
}

export default async function Tarifas({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("rates", locale) as Record<string, any>

  const pkgKeys = ["safariBahiaMagdalena", "safariLaVentana"]
  const prices = [3500, 3000]
  const featured = [false, true]

  return (
    <main>
      <section className="pagehero">
        <span className="kicker">Keabelmet</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </section>

      <div className="page-wrap narrow">
        <div className="dgrid-2">
          {pkgKeys.map((key, i) => {
            const pkg = t.packages?.[key] || {}
            return (
              <div key={key} className={`rate-card${featured[i] ? " feat" : ""}`}>
                {featured[i] && <span className="rate-badge">{t.mostPopular}</span>}
                <h3>{pkg.title}</h3>
                <p className="rate-dur">{pkg.duration}</p>
                <div className="rate-amount"><Price amount={prices[i]} /></div>
                <ul>
                  {pkg.includes?.map((item: string) => (
                    <li key={item}><Check size={18} /><span>{item}</span></li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/526122347897"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${featured[i] ? "btn-teal" : "btn-solid"}`}
                  style={{ justifyContent: "center", marginTop: "auto" }}
                >
                  {t.bookNow}
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
