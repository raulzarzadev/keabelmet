import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"
import PayButton from "@/components/PayButton"

export function wa(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const payLabel: Record<string, string> = { es: "Pagar ahora", en: "Pay now", fr: "Payer maintenant", zh: "立即支付" }
const waAskLabel: Record<string, string> = { es: "¿Dudas? Escríbenos", en: "Questions? Message us", fr: "Des questions ? Écrivez-nous", zh: "有疑问?联系我们" }

export interface QuickFact {
  value: string
  label: string
}

export interface TimelineItem {
  time: string
  title: string
  text: string
}

export interface FaunaItem {
  image: string
  alt: string
  label: string
}

export interface IncludeItem {
  title: string
  text: string
}

export interface PriceCard {
  name: string
  /** Monto en MXN; se convierte con el selector de divisa. */
  amountMxn?: number
  /** Texto fijo cuando no hay monto (p. ej. "A cotizar"). */
  amountText?: string
  /** Prefijo del monto (p. ej. "Desde "). */
  amountPrefix?: string
  amountNote: string
  items: string[]
  waText: string
  featured?: boolean
  featuredTag?: string
}

export interface ExpeditionPageData {
  breadcrumb: string
  hero: {
    image: string
    alt: string
    kicker: string
    title: string
    text: string
  }
  quickFacts: QuickFact[]
  story: {
    kicker: string
    title: string
    paragraphs: string[]
    commitTitle: string
    commitText: string
  }
  split: {
    image: string
    alt: string
    kicker: string
    title: string
    text: string
  }
  timeline: {
    kicker: string
    title: string
    items: TimelineItem[]
  }
  fauna?: {
    kicker: string
    title: string
    items: FaunaItem[]
  }
  includes: {
    kicker: string
    title: string
    items: IncludeItem[]
  }
  pricing: {
    kicker: string
    title: string
    cards: PriceCard[]
    note?: string
  }
  finalCta: {
    image: string
    alt: string
    title: string
    text: string
    waText: string
  }
}

interface UiDict {
  home: string
  expeditions: string
  bookAdventure: string
  viewItinerary: string
  book: string
  bookNow: string
  viewOthers: string
}

const ui: Record<Locale, UiDict> = {
  es: {
    home: "Inicio",
    expeditions: "Expediciones",
    bookAdventure: "Reserva tu aventura",
    viewItinerary: "Ver itinerario",
    book: "Reservar",
    bookNow: "Reserva ahora",
    viewOthers: "Ver otras expediciones",
  },
  en: {
    home: "Home",
    expeditions: "Expeditions",
    bookAdventure: "Book your adventure",
    viewItinerary: "View itinerary",
    book: "Book",
    bookNow: "Book now",
    viewOthers: "View other expeditions",
  },
  fr: {
    home: "Accueil",
    expeditions: "Expéditions",
    bookAdventure: "Réservez votre aventure",
    viewItinerary: "Voir l'itinéraire",
    book: "Réserver",
    bookNow: "Réservez maintenant",
    viewOthers: "Voir d'autres expéditions",
  },
  zh: {
    home: "首页",
    expeditions: "探险项目",
    bookAdventure: "预订您的冒险",
    viewItinerary: "查看行程",
    book: "预订",
    bookNow: "立即预订",
    viewOthers: "查看其他探险",
  },
}

export default function ExpeditionDetail({ data, locale = defaultLocale, slug }: { data: ExpeditionPageData; locale?: Locale; slug: string }) {
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)
  const t = ui[locale] || ui.es

  return (
    <main>
      <div className="crumbs">
        <Link href={lh("/")}>{t.home}</Link> / <Link href={lh("/#expediciones")}>{t.expeditions}</Link> / {data.breadcrumb}
      </div>

      {/* HERO */}
      <section className="thero">
        <img src={data.hero.image} alt={data.hero.alt} />
        <div className="thero-inner">
          <span className="kicker">{data.hero.kicker}</span>
          <h1>{data.hero.title}</h1>
          <p>{data.hero.text}</p>
          <div className="hero-ctas">
            <a href="#precios" className="btn btn-solid">{t.bookAdventure}</a>
            <a href="#itinerario" className="btn btn-ghost">{t.viewItinerary}</a>
          </div>
        </div>
      </section>

      {/* QUICK FACTS */}
      <div className="quickfacts">
        <div className="wrap">
          {data.quickFacts.map((f) => (
            <div key={f.label} className="qf"><b>{f.value}</b><span>{f.label}</span></div>
          ))}
        </div>
      </div>

      {/* STORY */}
      <section className="story">
        <span className="kicker">{data.story.kicker}</span>
        <h2>{data.story.title}</h2>
        {data.story.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="commit">
          <h4>{data.story.commitTitle}</h4>
          <p>{data.story.commitText}</p>
        </div>
      </section>

      {/* SPLIT */}
      <section className="split">
        <div className="split-grid">
          <div className="split-media"><img src={data.split.image} alt={data.split.alt} /></div>
          <div className="split-text">
            <span className="kicker">{data.split.kicker}</span>
            <h2>{data.split.title}</h2>
            <p>{data.split.text}</p>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section id="itinerario" className="timeline">
        <span className="kicker">{data.timeline.kicker}</span>
        <h2>{data.timeline.title}</h2>
        {data.timeline.items.map((item, i) => (
          <div key={i} className="tl-item">
            <div className="tl-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <span className="tl-time">{item.time}</span>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* FAUNA */}
      {data.fauna && (
        <section className="fauna">
          <div className="section-head">
            <span className="kicker">{data.fauna.kicker}</span>
            <h2>{data.fauna.title}</h2>
          </div>
          <div className="fauna-grid">
            {data.fauna.items.map((f) => (
              <div key={f.label} className="fauna-item">
                <img src={f.image} alt={f.alt} />
                <div className="fauna-label">{f.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* INCLUDES */}
      <section className="includes">
        <div className="section-head">
          <span className="kicker">{data.includes.kicker}</span>
          <h2>{data.includes.title}</h2>
        </div>
        <div className="inc-grid">
          {data.includes.items.map((item, i) => (
            <div key={i} className="inc-item">
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="precios" className="pricing">
        <div className="section-head">
          <span className="kicker">{data.pricing.kicker}</span>
          <h2>{data.pricing.title}</h2>
        </div>
        <div className="price-grid">
          {data.pricing.cards.map((card) => (
            <div key={card.name} className={`price-card${card.featured ? " feat" : ""}`}>
              {card.featured && <span className="price-tag">{card.featuredTag ?? "Privado"}</span>}
              <h3>{card.name}</h3>
              <div className="amount">
                {card.amountPrefix}
                {typeof card.amountMxn === "number" ? <Price amount={card.amountMxn} /> : card.amountText}
                {" "}
                <span>{card.amountNote}</span>
              </div>
              <ul>
                {card.items.map((li) => (
                  <li key={li}>{li}</li>
                ))}
              </ul>
              <div className="price-ctas">
                {typeof card.amountMxn === "number" ? (
                  <>
                    <PayButton slug={slug} expeditionName={data.hero.title} cardName={card.name} amountMxn={card.amountMxn} label={payLabel[locale] ?? payLabel.es} locale={locale} featured={card.featured} />
                    <a href={wa(card.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                      {waAskLabel[locale] ?? waAskLabel.es}
                    </a>
                  </>
                ) : (
                  <a
                    href={wa(card.waText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn ${card.featured ? "btn-teal" : "btn-solid"}`}
                  >
                    {t.book}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        {data.pricing.note && <div className="kids-note">{data.pricing.note}</div>}
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <img src={data.finalCta.image} alt={data.finalCta.alt} />
        <div className="final-cta-inner">
          <h2>{data.finalCta.title}</h2>
          <p>{data.finalCta.text}</p>
          <div className="ctas">
            <a href={wa(data.finalCta.waText)} className="btn btn-solid" target="_blank" rel="noopener noreferrer">{t.bookNow}</a>
            <Link href={lh("/#expediciones")} className="btn btn-ghost">{t.viewOthers}</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
