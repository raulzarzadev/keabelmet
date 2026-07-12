import Link from "next/link"
import { type Locale, defaultLocale, isValidLocale } from "@/lib/i18n"
import HomeQuiz from "@/components/HomeQuiz"
import SeasonCalendar from "@/components/SeasonCalendar"
import FounderStory from "@/components/FounderStory"
import { Price } from "@/contexts/CurrencyContext"
import { homeContent } from "@/constants/home-content"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"

const INSTAGRAM_URL = "https://www.instagram.com/keabelmet__expeditions/"
const INSTAGRAM_HANDLE = "@keabelmet_expeditions"

function wa(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const whyIcons = [
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>,
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.6" /><path d="M15.2 14.3c2.7.4 4.8 2.5 4.8 5.7" /></svg>,
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h3" /><path d="M10.5 3v5.5" /><path d="M7 21h10" /><path d="M9.5 21c-1.6-1-2.5-2.5-2.5-4.4 0-3 2.5-5.1 5.5-5.1s5 2 6.3 4.6" /><circle cx="18" cy="16" r="2.2" /></svg>,
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>,
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
]

const instaImages = [
  "/images/orca-safari.jpg",
  "/images/marlin-bahia-magdalena-hero.jpeg",
  "/images/hero/ballena-gris-hero.jpeg",
  "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
  "/espiritu-santo-island-paradise-beach.jpg",
  "/scuba-diving-underwater-sea-lions-swimming-playful.jpg",
]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
  const t = homeContent[locale]
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/cachalotecta.jpeg" alt={t.hero.alt} />
        </div>
        <div className="hero-content">
          <span className="kicker">{t.hero.kicker}</span>
          <h1>{t.hero.titleLine1}<br />{t.hero.titleLine2}<em>{t.hero.titleEm}</em></h1>
          <p className="hero-sub">{t.hero.sub}</p>
          <div className="hero-ctas">
            <a href="#expediciones" className="btn btn-pop">{t.hero.cta1}</a>
            <a href="#historia" className="btn btn-ghost">{t.hero.cta2}</a>
          </div>
        </div>
        <div className="scrolldown">{t.hero.scroll}</div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="wrap">
          {t.stats.map((s) => (
            <div key={s.label} className="stat"><b>{s.value}</b><span>{s.label}</span></div>
          ))}
        </div>
      </div>

      {/* MISSION */}
      <section className="mission">
        <div className="wrap">
          <p>{t.mission.main}<em>{t.mission.em}</em></p>
          <p className="dim">{t.mission.dim}</p>
        </div>
      </section>

      {/* REGIONS */}
      {t.regions.map((r) => (
        <div key={r.href} className={`region${r.right ? " region-right" : ""}`}>
          <img src={r.image} alt={r.alt} />
          <div className="region-inner">
            <div className="region-text">
              <span className="kicker">{r.kicker}</span>
              <h2>{r.title}</h2>
              <p>{r.text}</p>
              <Link href={lh(r.href)} className="btn btn-ghost">{t.viewExpedition}</Link>
            </div>
          </div>
        </div>
      ))}

      {/* QUIZ */}
      <HomeQuiz locale={locale} />

      {/* TOURS */}
      <section id="expediciones" className="tours">
        <div className="section-head" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <span className="kicker">{t.toursHead.kicker}</span>
          <h2>{t.toursHead.title}</h2>
          <p>{t.toursHead.sub}</p>
        </div>

        <div className="tour-grid">
          {t.tourCards.map((c) => (
            <Link key={c.href} className="tour-card" href={lh(c.href)}>
              <div className="tour-media">
                <span className={`tour-tag${c.coral ? " coral" : ""}`}>{c.tag}</span>
                <img src={c.image} alt={c.alt} />
              </div>
              <div className="tour-body">
                <h3>{c.title}</h3>
                <div className="tour-meta">
                  {c.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <div className="tour-foot">
                  <div className="tour-price"><b><Price amount={c.priceMxn} /></b><span>{c.per}</span></div>
                  <span className="tour-link">{t.viewExpedition}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEASON CALENDAR */}
      <SeasonCalendar locale={locale} />

      {/* COMPARISON */}
      <section className="compare">
        <div className="section-head" style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, margin: "0 auto 50px" }}>
          <span className="kicker">{t.compare.kicker}</span>
          <h2>{t.compare.title}</h2>
        </div>
        <div className="compare-grid">
          <div className="compare-col bad">
            <h4>{t.compare.badCol}</h4>
            {t.compare.bad.map((item) => (
              <div key={item.title} className="compare-item"><span className="x">✕</span><p><strong>{item.title}</strong>{item.text}</p></div>
            ))}
          </div>
          <div className="compare-col good">
            <h4>{t.compare.goodCol}</h4>
            {t.compare.good.map((item) => (
              <div key={item.title} className="compare-item"><span className="ok">✓</span><p><strong>{item.title}</strong>{item.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="section-head" style={{ padding: 0 }}>
          <span className="kicker">{t.why.kicker}</span>
          <h2>{t.why.title}</h2>
        </div>
        <div className="why-grid">
          {t.why.items.map((w, i) => (
            <div key={w.title} className="why-item" data-num={String(i + 1).padStart(2, "0")}>
              <div className="why-icon">{whyIcons[i]}</div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi">
        <div className="section-head">
          <span className="kicker">{t.testi.kicker}</span>
          <h2>{t.testi.title}</h2>
        </div>
        <div className="testi-grid">
          {t.testi.items.map((item) => (
            <div key={item.name} className="testi-card">
              <div className="stars">★★★★★</div>
              <p>{item.text}</p>
              <div className="testi-name">{item.name}</div>
              <div className="testi-loc">{item.loc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <FounderStory content={t.founder} />

      {/* INSTAGRAM */}
      <section className="insta" id="instagram">
        <div className="insta-head">
          <div>
            <span className="kicker">{t.insta.kicker}</span>
            <h2>{INSTAGRAM_HANDLE}</h2>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">{t.insta.btn}</a>
        </div>
        <div className="insta-grid">
          {instaImages.map((src) => (
            <a key={src} href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <img src={src} alt="Keabelmet Instagram" />
            </a>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="contacto">
        <img src="/whale-breaching-ocean.jpg" alt={t.finalCta.alt} />
        <div className="final-cta-inner">
          <h2>{t.finalCta.title}</h2>
          <p>{t.finalCta.text}</p>
          <div className="hero-ctas">
            <a href={wa(t.finalCta.waText)} className="btn btn-pop" target="_blank" rel="noopener noreferrer">{t.finalCta.btn1}</a>
            <a href="#expediciones" className="btn btn-ghost">{t.finalCta.btn2}</a>
          </div>
        </div>
      </section>
    </main>
  )
}
