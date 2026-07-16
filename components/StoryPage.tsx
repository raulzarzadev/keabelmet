import Link from "next/link"
import { Fragment } from "react"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"

function wa(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export interface StoryHero {
  image: string
  alt: string
  kicker: string
  title: string
  text: string
  meta?: string
  primaryLabel: string
  primaryWa: string
  secondaryLabel?: string
  secondaryHref?: string
}

export type Block =
  | { type: "quickfacts"; items: { value: string; label: string }[] }
  | { type: "prose"; id?: string; kicker?: string; heading?: string; paragraphs: (string | { lead: string })[]; ink2?: boolean }
  | { type: "callout"; heading: string; paragraphs: string[]; ink2?: boolean }
  | { type: "timeline"; id?: string; kicker?: string; title?: string; note?: string; ink2?: boolean; items: { time?: string; title: string; paragraphs: string[] }[] }
  | { type: "seasons"; kicker?: string; title?: string; intro?: string; ink2?: boolean; items: { name: string; text: string }[] }
  | { type: "fauna"; kicker?: string; title?: string; note?: string; ink2?: boolean; tiers: { label: string; warn?: boolean; species: string[] }[] }
  | { type: "checklist"; kicker?: string; title?: string; ink2?: boolean; good: { title: string; items: string[] }; bad: { title: string; items: string[] } }
  | { type: "details"; kicker?: string; title?: string; ink2?: boolean; items: { title: string; text: string }[] }
  | { type: "groups"; kicker?: string; title?: string; ink2?: boolean; groups: { name: string; items: string[] }[] }
  | { type: "info"; kicker?: string; title?: string; ink2?: boolean; items: { label: string; value: string }[] }
  | {
      type: "pricing"
      id?: string
      kicker?: string
      title?: string
      ink2?: boolean
      note?: string
      cards: {
        name: string
        amountMxn?: number
        amountText?: string
        amountNote?: string
        desc?: string
        sub?: string
        items?: string[]
        waText: string
        ctaLabel: string
        featured?: boolean
        featuredTag?: string
      }[]
    }
  | { type: "policies"; kicker?: string; title?: string; ink2?: boolean; items: { title: string; paragraphs: string[] }[] }
  | { type: "faq"; kicker?: string; title?: string; ink2?: boolean; items: { q: string; a: string[] }[] }
  | { type: "closing"; ink2?: boolean; heading: string; paragraphs: (string | { accent: string })[] }
  | { type: "finalCta"; image: string; alt: string; title: string; text: string; primaryLabel: string; primaryWa: string; secondaryLabel?: string; secondaryHref?: string }

export interface StoryPageData {
  breadcrumb: string
  hero: StoryHero
  blocks: Block[]
}

export default function StoryPage({ data, locale = defaultLocale }: { data: StoryPageData; locale?: Locale }) {
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)
  const h = data.hero

  const sec = (ink2?: boolean, extra = "", tight = false) =>
    `sp-section${tight ? " tight" : ""}${ink2 ? " sp-ink2" : ""}${extra ? " " + extra : ""}`

  return (
    <main>
      <div className="crumbs">
        <Link href={lh("/")}>Inicio</Link> / <Link href={lh("/#expediciones")}>Expediciones</Link> / {data.breadcrumb}
      </div>

      {/* HERO */}
      <section className="thero">
        <img src={h.image} alt={h.alt} />
        <div className="thero-inner">
          <span className="kicker">{h.kicker}</span>
          <h1>{h.title}</h1>
          <p>{h.text}</p>
          {h.meta && <p style={{ color: "var(--teal)", fontSize: 14, fontWeight: 600, letterSpacing: "0.02em", margin: "-8px 0 26px" }}>{h.meta}</p>}
          <div className="hero-ctas">
            <a href={wa(h.primaryWa)} target="_blank" rel="noopener noreferrer" className="btn btn-pop">{h.primaryLabel}</a>
            {h.secondaryLabel && <a href={h.secondaryHref ?? "#itinerario"} className="btn btn-ghost">{h.secondaryLabel}</a>}
          </div>
        </div>
      </section>

      {data.blocks.map((b, i) => {
        switch (b.type) {
          case "quickfacts":
            return (
              <div key={i} className="quickfacts">
                <div className="wrap">
                  {b.items.map((f) => (
                    <div key={f.label} className="qf"><b>{f.value}</b><span>{f.label}</span></div>
                  ))}
                </div>
              </div>
            )

          case "prose":
            return (
              <section key={i} id={b.id} className={sec(b.ink2)}>
                <div className="sp-prose">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.heading && <h2>{b.heading}</h2>}
                  {b.paragraphs.map((p, j) =>
                    typeof p === "string" ? <p key={j}>{p}</p> : <p key={j} className="lead">{p.lead}</p>
                  )}
                </div>
              </section>
            )

          case "callout":
            return (
              <section key={i} className={sec(b.ink2, "", true)}>
                <div className="sp-callout">
                  <h3>{b.heading}</h3>
                  {b.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                </div>
              </section>
            )

          case "timeline":
            return (
              <section key={i} id={b.id} className={sec(b.ink2)}>
                <div className="sp-timeline">
                  <div className="sp-head">
                    {b.kicker && <span className="kicker">{b.kicker}</span>}
                    {b.title && <h2>{b.title}</h2>}
                  </div>
                  {b.note && <p className="sp-note">{b.note}</p>}
                  {b.items.map((it, j) => (
                    <div key={j} className="sp-step">
                      <div className="n">{String(j + 1).padStart(2, "0")}</div>
                      <div>
                        {it.time && <span className="tl-time">{it.time}</span>}
                        <h4>{it.title}</h4>
                        {it.paragraphs.map((p, k) => <p key={k}>{p}</p>)}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )

          case "seasons":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                  {b.intro && <p>{b.intro}</p>}
                </div>
                <div className="sp-seasons">
                  {b.items.map((s) => (
                    <div key={s.name} className="sp-season">
                      <h4>{s.name}</h4>
                      <p>{s.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )

          case "fauna":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <div className="sp-fauna-tiers">
                  {b.tiers.map((t) => (
                    <div key={t.label} className={`sp-tier${t.warn ? " warn" : ""}`}>
                      <h4>{t.label}</h4>
                      <div className="sp-chips">
                        {t.species.map((s) => <span key={s} className="sp-chip">{s}</span>)}
                      </div>
                    </div>
                  ))}
                </div>
                {b.note && <p className="sp-note" style={{ marginTop: 26, marginBottom: 0 }}>{b.note}</p>}
              </section>
            )

          case "checklist":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <div className="sp-checks">
                  <div className="sp-check good">
                    <h4>{b.good.title}</h4>
                    <ul>{b.good.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  </div>
                  <div className="sp-check bad">
                    <h4>{b.bad.title}</h4>
                    <ul>{b.bad.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  </div>
                </div>
              </section>
            )

          case "details":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <div className="sp-detail-grid">
                  {b.items.map((it) => (
                    <div key={it.title} className="sp-detail">
                      <h4>{it.title}</h4>
                      <p>{it.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )

          case "groups":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <div className="sp-groups">
                  {b.groups.map((g) => (
                    <div key={g.name} className="sp-group">
                      <h4>{g.name}</h4>
                      <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </section>
            )

          case "info":
            return (
              <section key={i} className={sec(b.ink2, "", true)}>
                <div className="sp-head" style={{ textAlign: "center" }}>
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <dl className="sp-info">
                  {b.items.map((it) => (
                    <div key={it.label} className="sp-info-row">
                      <dt>{it.label}</dt>
                      <dd>{it.value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )

          case "pricing":
            return (
              <section key={i} id={b.id} className={`pricing${b.ink2 === false ? "" : ""}`}>
                <div className="section-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <div className="price-grid">
                  {b.cards.map((c) => (
                    <div key={c.name} className={`price-card${c.featured ? " feat" : ""}`}>
                      {c.featured && <span className="price-tag">{c.featuredTag ?? "Recomendado"}</span>}
                      <h3>{c.name}</h3>
                      <div className="amount">
                        {typeof c.amountMxn === "number" ? <Price amount={c.amountMxn} /> : c.amountText}
                        {c.amountNote ? <> <span>{c.amountNote}</span></> : null}
                      </div>
                      {c.desc && <p className="sp-price-desc">{c.desc}</p>}
                      {c.items && (
                        <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
                      )}
                      <a href={wa(c.waText)} target="_blank" rel="noopener noreferrer" className={`btn ${c.featured ? "btn-teal" : "btn-solid"}`} style={{ justifyContent: "center", marginTop: c.items ? undefined : "auto" }}>
                        {c.ctaLabel}
                      </a>
                      {c.sub && <p className="sp-price-sub">{c.sub}</p>}
                    </div>
                  ))}
                </div>
                {b.note && <div className="kids-note">{b.note}</div>}
              </section>
            )

          case "policies":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <div className="sp-policies">
                  {b.items.map((it) => (
                    <div key={it.title} className="sp-policy">
                      <h4>{it.title}</h4>
                      {it.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                    </div>
                  ))}
                </div>
              </section>
            )

          case "faq":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head" style={{ textAlign: "center" }}>
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                </div>
                <div className="sp-faq">
                  {b.items.map((it, j) => (
                    <details key={j}>
                      <summary>{it.q}</summary>
                      <div className="sp-faq-a">
                        {it.a.map((p, k) => <p key={k}>{p}</p>)}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )

          case "closing":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-closing">
                  <h2>{b.heading}</h2>
                  {b.paragraphs.map((p, j) =>
                    typeof p === "string" ? <p key={j}>{p}</p> : <p key={j} className="accent">{p.accent}</p>
                  )}
                </div>
              </section>
            )

          case "finalCta":
            return (
              <section key={i} className="final-cta">
                <img src={b.image} alt={b.alt} />
                <div className="final-cta-inner">
                  <h2>{b.title}</h2>
                  <p>{b.text}</p>
                  <div className="ctas">
                    <a href={wa(b.primaryWa)} className="btn btn-pop" target="_blank" rel="noopener noreferrer">{b.primaryLabel}</a>
                    {b.secondaryLabel && <a href={b.secondaryHref ?? "#expediciones"} className="btn btn-ghost">{b.secondaryLabel}</a>}
                  </div>
                </div>
              </section>
            )

          default:
            return <Fragment key={i} />
        }
      })}
    </main>
  )
}
