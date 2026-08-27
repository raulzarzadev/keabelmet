import Link from "next/link"
import { Fragment, type ReactNode } from "react"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"
import PayButton from "@/components/PayButton"
import { faunaSeasons, faunaNames, monthsShort, faunaLegend, type FaunaIcon } from "@/lib/fauna-calendar"

function wa(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const faunaIcons: Record<FaunaIcon, ReactNode> = {
  manta: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6c-3.5 0-7.5 2.5-10 7 3-.5 6 0 8 2l2 5 2-5c2-2 5-2.5 8-2-2.5-4.5-6.5-7-10-7z" /></svg>
  ),
  whale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12c0-3 2.5-6 6.5-6 5 0 6.5 4 11 3.5-1 3-3.5 5-7 5-1 2-3 3.5-5.5 3.5.5-1.5.5-3 0-4.5C5 12.5 3.5 12 3 12z" /><circle cx="8.5" cy="10.5" r="0.5" fill="currentColor" /></svg>
  ),
  fin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17c4 0 6-1 8-4s4-6 10-6c-1 6-5 12-13 12-2 0-4-.5-5-2z" /></svg>
  ),
  shark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13c3-4.5 7-7 11-7 4 0 6.5 2.5 7 6-1 3-4 5-8 5-4 0-7-1.5-10-4z" /><path d="M11 6.5L13 3l1.5 3.2" /><circle cx="9" cy="11" r="0.4" fill="currentColor" /></svg>
  ),
  seal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 18c1-5 4-9 8-9 3 0 5 2 5 5 2 0 3 1.5 3 4" /><path d="M12 9c0-1.5 1-3 3-3" /><circle cx="15" cy="8" r="0.5" fill="currentColor" /></svg>
  ),
}

const payLabel: Record<string, string> = { es: "Pagar ahora", en: "Pay now", fr: "Payer maintenant", zh: "立即支付" }
const waAskLabel: Record<string, string> = { es: "¿Dudas? Escríbenos", en: "Questions? Message us", fr: "Des questions ? Écrivez-nous", zh: "有疑问?联系我们" }

/** Imagen o video real; si no hay `src`, muestra un placeholder intencional
 *  con ícono y la descripción del shot ideal (guía para el fotógrafo). */
export interface Media {
  src?: string
  video?: string
  alt?: string
  /** Texto del placeholder: describe la foto/video que irá aquí. */
  suggest?: string
  /** Etiqueta pequeña sobre la imagen real. */
  caption?: string
}

function MediaSlot({ media, className = "" }: { media: Media; className?: string }) {
  const isVideo = !!media.video
  const hasReal = !!(media.src || media.video)
  return (
    <div className={`media${!hasReal ? " has-ph" : ""} ${className}`.trim()}>
      {media.video ? (
        <video src={media.video} autoPlay muted loop playsInline poster={media.src} />
      ) : media.src ? (
        <img src={media.src} alt={media.alt ?? ""} />
      ) : (
        <div className="media-ph">
          <span className="ph-ic">
            {isVideo ? (
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="12.5" r="3.5" /></svg>
            )}
          </span>
          <span className="ph-kind">{isVideo ? "Video sugerido" : "Foto sugerida"}</span>
          {media.suggest && <span className="ph-cap">{media.suggest}</span>}
        </div>
      )}
      {hasReal && media.caption && <div className="media-cap">{media.caption}</div>}
    </div>
  )
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
  | { type: "timeline"; id?: string; kicker?: string; title?: string; note?: string; ink2?: boolean; items: { time?: string; title: string; paragraphs: string[]; media?: Media }[] }
  | { type: "seasons"; kicker?: string; title?: string; intro?: string; ink2?: boolean; items: { name: string; text: string }[] }
  | { type: "faunaCalendar"; kicker?: string; title?: string; intro?: string; ink2?: boolean }
  | { type: "fauna"; kicker?: string; title?: string; note?: string; ink2?: boolean; tiers: { label: string; warn?: boolean; species: string[] }[] }
  | { type: "mediaBanner"; media: Media; quote?: string; sub?: string; align?: "bottom" }
  | { type: "mediaSplit"; media: Media; reverse?: boolean; ink2?: boolean; kicker?: string; title: string; paragraphs: string[] }
  | { type: "video"; ink2?: boolean; kicker?: string; title?: string; media: Media }
  | { type: "gallery"; ink2?: boolean; kicker?: string; title?: string; cols?: 3 | 4; items: Media[] }
  | { type: "encounters"; kicker?: string; title?: string; intro?: string; ink2?: boolean; items: { title: string; text: string; media: Media }[] }
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

export default function StoryPage({ data, locale = defaultLocale, slug }: { data: StoryPageData; locale?: Locale; slug: string }) {
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
                        {it.media && <MediaSlot media={it.media} className="step-media" />}
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

          case "faunaCalendar": {
            const species = faunaSeasons[slug] ?? []
            const names = faunaNames[locale] ?? faunaNames.es
            const months = monthsShort[locale] ?? monthsShort.es
            const lg = faunaLegend[locale] ?? faunaLegend.es
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                  {b.intro && <p>{b.intro}</p>}
                </div>
                <div className="cal-hint">{lg.hint}</div>
                <div className="cal-scroll">
                  <div className="cal-table fauna-cal">
                    <div className="cal-corner" />
                    {months.map((m) => (
                      <div key={m} className="cal-month">{m}</div>
                    ))}
                    {species.map((sp) => (
                      <Fragment key={sp.id}>
                        <div className="cal-tour">
                          <span className="cal-icon">{faunaIcons[sp.icon]}</span>
                          <div><span className="fauna-name">{names[sp.id] ?? sp.id}</span></div>
                        </div>
                        {months.map((_, mi) => {
                          const month = mi + 1
                          const peak = sp.peak.includes(month)
                          const on = sp.months.includes(month)
                          return (
                            <div
                              key={`${sp.id}-${month}`}
                              className={`cal-cell${peak ? " peak" : on ? " on" : ""}`}
                              title={`${names[sp.id]} · ${months[mi]}${peak ? lg.peakSuffix : on ? lg.seasonSuffix : ""}`}
                            />
                          )
                        })}
                      </Fragment>
                    ))}
                  </div>
                </div>
                <div className="cal-legend">
                  <span><i className="cal-dot on" /> {lg.season}</span>
                  <span><i className="cal-dot peak" /> {lg.peak}</span>
                  <span><i className="cal-dot" /> {lg.off}</span>
                </div>
              </section>
            )
          }

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
                      <div className="price-ctas" style={{ marginTop: c.items ? undefined : "auto" }}>
                        {typeof c.amountMxn === "number" ? (
                          <>
                            <PayButton slug={slug} expeditionName={h.title} cardName={c.name} amountMxn={c.amountMxn} amountNote={c.amountNote} label={payLabel[locale] ?? payLabel.es} locale={locale} featured={c.featured} />
                            <a href={wa(c.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                              {waAskLabel[locale] ?? waAskLabel.es}
                            </a>
                          </>
                        ) : (
                          <a href={wa(c.waText)} target="_blank" rel="noopener noreferrer" className={`btn ${c.featured ? "btn-teal" : "btn-solid"}`}>
                            {c.ctaLabel}
                          </a>
                        )}
                      </div>
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

          case "mediaBanner":
            return (
              <section key={i} className={`media-banner${!(b.media.src || b.media.video) ? " has-ph" : ""}${b.align === "bottom" ? " mb-bottom" : ""}`}>
                <MediaSlot media={b.media} />
                {(b.quote || b.sub) && (
                  <div className="mb-inner">
                    {b.quote && <p className="mb-quote">{b.quote}</p>}
                    {b.sub && <p className="mb-sub">{b.sub}</p>}
                  </div>
                )}
              </section>
            )

          case "mediaSplit":
            return (
              <section key={i} className={b.ink2 ? "sp-ink2" : undefined}>
                <div className={`media-split${b.reverse ? " rev" : ""}`}>
                  <div className="ms-media"><MediaSlot media={b.media} /></div>
                  <div className="ms-text">
                    {b.kicker && <span className="kicker">{b.kicker}</span>}
                    <h2>{b.title}</h2>
                    {b.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                </div>
              </section>
            )

          case "video":
            return (
              <section key={i} className={b.ink2 ? "sp-ink2" : undefined}>
                <div className="video-sec">
                  {(b.kicker || b.title) && (
                    <div className="sp-head" style={{ textAlign: "center" }}>
                      {b.kicker && <span className="kicker">{b.kicker}</span>}
                      {b.title && <h2>{b.title}</h2>}
                    </div>
                  )}
                  <div className="video-frame"><MediaSlot media={{ ...b.media, video: b.media.video ?? undefined }} /></div>
                </div>
              </section>
            )

          case "gallery":
            return (
              <section key={i} className={sec(b.ink2)}>
                {(b.kicker || b.title) && (
                  <div className="sp-head">
                    {b.kicker && <span className="kicker">{b.kicker}</span>}
                    {b.title && <h2>{b.title}</h2>}
                  </div>
                )}
                <div className={`media-gallery g${b.cols ?? 4}`}>
                  {b.items.map((m, j) => <MediaSlot key={j} media={m} />)}
                </div>
              </section>
            )

          case "encounters":
            return (
              <section key={i} className={sec(b.ink2)}>
                <div className="sp-head">
                  {b.kicker && <span className="kicker">{b.kicker}</span>}
                  {b.title && <h2>{b.title}</h2>}
                  {b.intro && <p>{b.intro}</p>}
                </div>
                <div className="sp-encounters">
                  {b.items.map((it) => (
                    <div key={it.title} className="sp-enc">
                      <div className="enc-media"><MediaSlot media={it.media} /></div>
                      <div className="enc-body">
                        <h4>{it.title}</h4>
                        <p>{it.text}</p>
                      </div>
                    </div>
                  ))}
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
