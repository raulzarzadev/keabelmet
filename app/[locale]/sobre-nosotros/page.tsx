import type { Metadata } from "next"
import { Compass, Heart, Shield, Users } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary } from "@/lib/i18n"
import { buildPageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("about", "/sobre-nosotros", locale)
}

export default async function SobreNosotros({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("about", locale) as Record<string, any>

  const icons = [<Heart key="h" size={22} />, <Shield key="s" size={22} />, <Compass key="c" size={22} />, <Users key="u" size={22} />]

  return (
    <main>
      <section className="pagehero">
        <span className="kicker">Keabelmet</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </section>

      <div className="page-wrap narrow">
        <div className="about-body">
          <span className="kicker" style={{ display: "block", marginBottom: 16 }}>{t.historyTitle}</span>
          <p>{t.historyP1}</p>
          <p>{t.historyP2}</p>
          {t.historyP3 && <p>{t.historyP3}</p>}
          {t.historyP4 && <p>{t.historyP4}</p>}

          <div className="about-values">
            {t.values?.map((v: any, i: number) => (
              <div key={i} className="about-value">
                <div className="info-icon">{icons[i]}</div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
