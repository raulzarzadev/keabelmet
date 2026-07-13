import type { Metadata } from "next"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { isValidLocale, defaultLocale, getPageDictionary, type Locale } from "@/lib/i18n"
import { buildWhatsAppLink, WHATSAPP_DISPLAY } from "@/config/whatsapp"
import { buildPageMeta } from "@/lib/seo"

function l(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("contact", "/contacto", locale)
}

export default async function Contacto({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale = isValidLocale(loc) ? loc : defaultLocale
  const t = await getPageDictionary("contact", locale) as Record<string, any>

  const contactItems = [
    { icon: <Mail size={18} />, label: t.contactEmail, value: t.contactEmailValue },
    { icon: <Phone size={18} />, label: t.contactPhone, value: WHATSAPP_DISPLAY },
    { icon: <MapPin size={18} />, label: t.contactLocation, value: t.contactLocationValue },
    { icon: <Clock size={18} />, label: t.contactSchedule, value: t.contactScheduleValue },
  ]

  return (
    <main>
      <section className="pagehero">
        <span className="kicker">Keabelmet</span>
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </section>

      <div className="page-wrap">
        <div className="dgrid-2" style={{ marginBottom: 26 }}>
          <div className="dcard">
            <h2 style={{ fontSize: 22, marginBottom: 6 }}>{t.contactCards.tourTitle}</h2>
            <p style={{ color: "var(--sand-dim)", fontSize: 14.5, marginBottom: 22 }}>{t.contactCards.tourSubtitle}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {t.contactCards.tours.map((tour: { name: string; href: string }) => (
                <a
                  key={tour.href}
                  href={buildWhatsAppLink(`Hola, quiero saber mas sobre ${tour.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-chip"
                >
                  {tour.name}
                </a>
              ))}
            </div>
          </div>

          <div className="dcard dcard-hl" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: 22, marginBottom: 6 }}>{t.contactCards.quizTitle}</h2>
              <p style={{ color: "var(--sand-dim)", fontSize: 15, marginBottom: 28 }}>{t.contactCards.quizSubtitle}</p>
            </div>
            <Link href={l("/#quiz", locale)} className="btn btn-teal" style={{ justifyContent: "center" }}>
              {t.contactCards.quizTitle}
            </Link>
          </div>
        </div>

        <div className="dgrid-2">
          <div className="dcard">
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>{t.formTitle}</h2>
            <form className="space-y-0">
              <div className="form-field">
                <label>{t.labelName}</label>
                <input type="text" placeholder={t.placeholderName} />
              </div>
              <div className="form-field">
                <label>{t.labelEmail}</label>
                <input type="email" placeholder={t.placeholderEmail} />
              </div>
              <div className="form-field">
                <label>{t.labelPhone}</label>
                <input type="tel" placeholder={t.placeholderPhone} />
              </div>
              <div className="form-field">
                <label>{t.labelMessage}</label>
                <textarea rows={4} placeholder={t.placeholderMessage} />
              </div>
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-pop" style={{ width: "100%", justifyContent: "center" }}>
                {t.submitButton}
              </a>
            </form>
          </div>

          <div>
            <h2 style={{ fontSize: 22, marginBottom: 18 }}>{t.contactInfoTitle}</h2>
            <div className="dcard" style={{ padding: "8px 28px" }}>
              {contactItems.map((item, i) => (
                <div key={i} className="info-row">
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <h3>{item.label}</h3>
                    <p>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="dcard dcard-hl" style={{ marginTop: 26 }}>
              <h3 style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif", textTransform: "none", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>{t.ctaTitle}</h3>
              <p style={{ color: "var(--sand-dim)", fontSize: 14.5, marginBottom: 20 }}>{t.ctaDescription}</p>
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="btn btn-teal">
                {t.ctaButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
