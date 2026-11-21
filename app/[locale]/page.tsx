import Link from "next/link"
import Image from "next/image"
import { type Locale, defaultLocale, isValidLocale } from "@/lib/i18n"
import HomeQuiz from "@/components/HomeQuiz"
import SeasonCalendar from "@/components/SeasonCalendar"
import FounderStory from "@/components/FounderStory"
import SeasonPopup from "@/components/SeasonPopup"
import { getBookableActivities } from "@/lib/bookable-activities"
import { PACKAGES } from "@/lib/packages"
import TestiCarousel from "@/components/TestiCarousel"
import { Price } from "@/contexts/CurrencyContext"
import HomeExpeditionMap from "@/components/HomeExpeditionMap"
import { homeContent } from "@/constants/home-content"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"

const INSTAGRAM_URL = "https://www.instagram.com/keabelmet__expeditions/"
const INSTAGRAM_HANDLE = "@keabelmet__expeditions"
// Página hermana: viajes de varios días todo incluido (grupos abiertos y privados).
const CON_GORRA_URL = "https://congorraexpeditions.com/"

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

// Fondo opcional por tarjeta "why" (indice = posicion). "" = sin foto (fondo normal).
const whyImages = [
  "/playa-balandra-aerea.jpg", // 1 - Experiencia local
  "/why-snorkel-grupo.jpg", // 2 - Seguridad primero
  "/why-grupo-agua.jpg", // 3 - Grupos pequenos
  "/why-ballena-lancha.jpg", // 4 - Liderado por biologos marinos
  "/why-delfines.jpg", // 5 - Educacion y conservacion
  "/why-fotografo.jpg", // 6 - Foto y video incluidos
]

const instaImages = [
  "/instagram/grupo-feliz.jpg",
  "/instagram/ballena-azul.jpg",
  "/instagram/pareja-dunas.jpg",
  "/instagram/orcas.jpg",
  "/instagram/snorkel-lancha.jpg",
  "/instagram/ballena-gris-aerea.jpg",
]

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: loc } = await params
  const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
  const t = homeContent[locale]
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

  const homeCta: Record<string, { kicker: string; title: string; text: string; cta: string; wa: string }> = {
    es: { kicker: "Tu próxima aventura", title: "¿Listo para vivir el Mar de Cortés?", text: "Grupos pequeños, guías biólogos y encuentros reales con la vida marina. Elige tu expedición y aparta tu lugar.", cta: "Ver expediciones", wa: "Escríbenos por WhatsApp" },
    en: { kicker: "Your next adventure", title: "Ready to experience the Sea of Cortez?", text: "Small groups, marine-biologist guides and real encounters with wildlife. Pick your expedition and save your spot.", cta: "View expeditions", wa: "Message us on WhatsApp" },
    fr: { kicker: "Votre prochaine aventure", title: "Prêt à vivre la mer de Cortés ?", text: "Petits groupes, guides biologistes marins et rencontres réelles avec la faune. Choisissez votre expédition et réservez.", cta: "Voir les expéditions", wa: "Écrivez-nous sur WhatsApp" },
    zh: { kicker: "你的下一场冒险", title: "准备好探索科尔特斯海了吗？", text: "小团队、海洋生物学家向导，以及与海洋生物的真实相遇。选择你的探险并预留名额。", cta: "查看探险项目", wa: "通过 WhatsApp 联系我们" },
    ca: { kicker: "La teva propera aventura", title: "A punt per viure el Mar de Cortés?", text: "Grups petits, guies biòlegs i trobades reals amb la vida marina. Tria la teva expedició i reserva el teu lloc.", cta: "Veure expedicions", wa: "Escriu-nos per WhatsApp" },
  }
  const hc = homeCta[locale] ?? homeCta.es

  // Paquetes de temporada (nov–dic). El precio sale del catálogo menos el descuento del
  // paquete en lib/packages, así que siempre coincide con lo que cobra el carrito.
  const fromBySlug = new Map(getBookableActivities(locale).map((a) => [a.slug, a.fromAmountMxn]))
  const packagePrice = (id: string) => {
    const pkgDef = PACKAGES.find((x) => x.id === id)
    if (!pkgDef) return 0
    return pkgDef.slugs.reduce((sum, slug) => sum + (fromBySlug.get(slug) ?? 0) - (pkgDef.perPersonOffMxn?.[slug] ?? 0), 0)
  }
  const comboCards = [
    { id: "temporada", image: "/images/paquetes/lobo-marino-bola-de-sardinas-sardine-run.webp", featured: false },
    { id: "gran-temporada", image: "/images/paquetes/marlin-rayado-sardine-run-bahia-magdalena.webp", featured: true },
  ]
  type ComboItem = { name: string; badge: string; days: string; activities: string[] }
  const packagesT: Record<string, { kicker: string; title: string; sub: string; perPerson: string; priceLabel: string; note: string; cta: string; items: Record<string, ComboItem>; customBadge: string; customTitle: string; customText: string; customCta: string }> = {
    es: {
      kicker: "Temporada nov – dic", title: "Combina y vive la temporada", sub: "Solo en noviembre y diciembre coinciden el Sardine Run en Bahía Magdalena y el tiburón ballena en La Paz. Júntalos en un mismo viaje.",
      perPerson: "por persona", priceLabel: "Precio de paquete", note: "Se aplica al reservar las actividades juntas.", cta: "Reservar paquete",
      items: {
        temporada: { name: "Paquete Temporada", badge: "Nov – dic", days: "2 días", activities: ["Sardine Run en Bahía Magdalena (transporte desde La Paz incluido)", "Nado con tiburón ballena"] },
        "gran-temporada": { name: "Gran Temporada", badge: "La más completa", days: "3 días", activities: ["Sardine Run en Bahía Magdalena (transporte desde La Paz incluido)", "Safari marino en La Ventana", "Nado con tiburón ballena"] },
      },
      customBadge: "Viajes todo incluido", customTitle: "Expediciones de varios días", customText: "¿Buscas el viaje completo? Con Gorra Expeditions, nuestra página hermana, organiza expediciones todo incluido en Baja California Sur: transporte, hospedaje, comidas y experiencias. Únete a un grupo pequeño con otros viajeros o armamos un viaje privado para tu grupo.", customCta: "Ver viajes en Con Gorra",
    },
    en: {
      kicker: "Season · Nov – Dec", title: "Combine and live the season", sub: "Only in November and December do the Magdalena Bay Sardine Run and the La Paz whale sharks overlap. Do both on the same trip.",
      perPerson: "per person", priceLabel: "Package price", note: "Applies when you book the activities together.", cta: "Book package",
      items: {
        temporada: { name: "Season Combo", badge: "Nov – Dec", days: "2 days", activities: ["Magdalena Bay Sardine Run (transport from La Paz included)", "Swim with whale sharks"] },
        "gran-temporada": { name: "Grand Season Combo", badge: "Most complete", days: "3 days", activities: ["Magdalena Bay Sardine Run (transport from La Paz included)", "La Ventana marine safari", "Swim with whale sharks"] },
      },
      customBadge: "All-inclusive trips", customTitle: "Multi-day expeditions", customText: "Looking for the full trip? Con Gorra Expeditions, our sister company, runs all-inclusive expeditions in Baja California Sur: transport, lodging, meals and experiences. Join a small group with other travelers, or we'll build a private trip for your group.", customCta: "See trips at Con Gorra",
    },
    fr: {
      kicker: "Saison · nov – déc", title: "Combinez et vivez la saison", sub: "Ce n'est qu'en novembre et décembre que le Sardine Run de Bahía Magdalena et les requins-baleines de La Paz coïncident. Faites les deux pendant le même voyage.",
      perPerson: "par personne", priceLabel: "Prix du forfait", note: "S'applique en réservant les activités ensemble.", cta: "Réserver le forfait",
      items: {
        temporada: { name: "Combo Saison", badge: "Nov – déc", days: "2 jours", activities: ["Sardine Run à Bahía Magdalena (transport depuis La Paz inclus)", "Nage avec les requins-baleines"] },
        "gran-temporada": { name: "Grande Saison", badge: "Le plus complet", days: "3 jours", activities: ["Sardine Run à Bahía Magdalena (transport depuis La Paz inclus)", "Safari marin à La Ventana", "Nage avec les requins-baleines"] },
      },
      customBadge: "Voyages tout compris", customTitle: "Expéditions de plusieurs jours", customText: "Vous cherchez le voyage complet ? Con Gorra Expeditions, notre société sœur, organise des expéditions tout compris en Basse-Californie du Sud : transport, hébergement, repas et expériences. Rejoignez un petit groupe avec d'autres voyageurs, ou nous créons un voyage privé pour votre groupe.", customCta: "Voir les voyages Con Gorra",
    },
    zh: {
      kicker: "季节 · 11月–12月", title: "组合体验本季精彩", sub: "只有在11月和12月，马格达莱纳湾的沙丁鱼奔流和拉巴斯的鲸鲨才会同时出现。在同一次旅行中两者兼得。",
      perPerson: "每人", priceLabel: "套餐价", note: "一起预订这些活动时适用。", cta: "预订套餐",
      items: {
        temporada: { name: "季节套餐", badge: "11月–12月", days: "2 天", activities: ["马格达莱纳湾沙丁鱼奔流（含拉巴斯往返交通）", "与鲸鲨同游"] },
        "gran-temporada": { name: "季节大套餐", badge: "最完整", days: "3 天", activities: ["马格达莱纳湾沙丁鱼奔流（含拉巴斯往返交通）", "拉文塔纳海洋探险", "与鲸鲨同游"] },
      },
      customBadge: "全包旅行", customTitle: "多日探险之旅", customText: "想要完整的旅程？我们的姊妹品牌 Con Gorra Expeditions 在南下加利福尼亚州组织全包式探险：交通、住宿、餐食和体验一应俱全。您可以加入与其他旅行者同行的小团，也可以为您的团体定制私人行程。", customCta: "查看 Con Gorra 行程",
    },
    ca: {
      kicker: "Temporada · nov – des", title: "Combina i viu la temporada", sub: "Només al novembre i al desembre coincideixen el Sardine Run de Badia Magdalena i el tauró balena de La Paz. Fes els dos en un mateix viatge.",
      perPerson: "per persona", priceLabel: "Preu de paquet", note: "S'aplica en reservar les activitats juntes.", cta: "Reservar paquet",
      items: {
        temporada: { name: "Paquet Temporada", badge: "Nov – des", days: "2 dies", activities: ["Sardine Run a Badia Magdalena (transport des de La Paz inclòs)", "Neda amb el tauró balena"] },
        "gran-temporada": { name: "Gran Temporada", badge: "El més complet", days: "3 dies", activities: ["Sardine Run a Badia Magdalena (transport des de La Paz inclòs)", "Safari marí a La Ventana", "Neda amb el tauró balena"] },
      },
      customBadge: "Viatges tot inclòs", customTitle: "Expedicions de diversos dies", customText: "Busques el viatge complet? Con Gorra Expeditions, la nostra pàgina germana, organitza expedicions tot inclòs a Baixa Califòrnia Sud: transport, allotjament, menjars i experiències. Uneix-te a un grup petit amb altres viatgers o et muntem un viatge privat per al teu grup.", customCta: "Veure viatges a Con Gorra",
    },
  }
  const pk = packagesT[locale] ?? packagesT.es

  const regionBadge: Record<string, Record<string, string>> = {
    "/experiencias/safari-la-ventana": { es: "Nuestro favorito", en: "Our favorite", fr: "Notre préféré", zh: "我们的最爱" },
    "/experiencias/safari-bahia-magdalena": { es: "El más aventurero", en: "The most adventurous", fr: "Le plus aventureux", zh: "最刺激" },
    "/experiencias/buceo-cabo-pulmo": { es: "El mejor buceo", en: "Best diving", fr: "La meilleure plongée", zh: "最佳潜水" },
    "/experiencias/tour-espiritu-santo": { es: "El más reconocido", en: "Most iconic", fr: "Le plus emblématique", zh: "最知名" },
  }

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <picture>
            <source media="(max-width: 767px)" srcSet="/tiburon-ballena-mobile.jpg" />
            <img src="/cachalotecta.jpeg" alt={t.hero.alt} fetchPriority="high" />
          </picture>
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
        <div className="mission-card">
          <div className="mission-text">
            <span className="mission-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              Documental · Jacques Cousteau
            </span>
            <p>{t.mission.main}<em>{t.mission.em}</em></p>
            <div className="mission-btns">
              <a className="btn btn-pop" href="https://youtu.be/_LGkiNljhak" target="_blank" rel="noopener noreferrer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: 8, verticalAlign: "-2px" }}><path d="M8 5v14l11-7z" /></svg>
                Ver en YouTube
              </a>
              <a className="btn btn-ghost" href="#historia">Nuestra historia</a>
            </div>
          </div>
          <div className="mission-video">
            <div className="yt-frame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/_LGkiNljhak?rel=0"
                title="Jacques Cousteau · El Mar de Cortés"
                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* REGIONS */}
      {t.regions.map((r) => (
        <div key={r.href} className={`region${r.right ? " region-right" : ""}`}>
          {r.imageMobile ? (
            <picture>
              <source media="(max-width: 767px)" srcSet={r.imageMobile} />
              <img src={r.image} alt={r.alt} loading="lazy" decoding="async" />
            </picture>
          ) : (
            <img src={r.image} alt={r.alt} loading="lazy" decoding="async" />
          )}
          {regionBadge[r.href]?.[locale] && (
            <div className="region-badge-wrap"><span className="region-badge">{regionBadge[r.href][locale]}</span></div>
          )}
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
                <img src={c.image} alt={c.alt} loading="lazy" decoding="async" />
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

      {/* MAPA DE EXPEDICIONES */}
      <HomeExpeditionMap locale={locale} />

      {/* PAQUETES */}
      <section className="packages" id="paquetes">
        <div className="section-head" style={{ padding: 0 }}>
          <span className="kicker">{pk.kicker}</span>
          <h2>{pk.title}</h2>
          <p>{pk.sub}</p>
        </div>
        <div className="packages-grid">
          {comboCards.map((card) => {
            const combo = pk.items[card.id]
            const pkgDef = PACKAGES.find((x) => x.id === card.id)
            if (!combo || !pkgDef) return null
            return (
              <div key={card.id} className={`pkg-card pkg-photo${card.featured ? " pkg-featured" : ""}`}>
                <div className="pkg-bg" aria-hidden="true">
                  <Image src={card.image} alt="" fill sizes="(max-width: 860px) 100vw, 420px" style={{ objectFit: "cover" }} />
                </div>
                <div className="pkg-body">
                  <span className="pkg-badge">{combo.badge}</span>
                  <h3>{combo.name}</h3>
                  <div className="pkg-days">{combo.days}</div>
                  <ul className="pkg-acts">
                    {combo.activities.map((a) => <li key={a}>{a}</li>)}
                  </ul>
                  <div className="pkg-price">
                    <span className="pkg-price-label">{pk.priceLabel}</span>
                    <span className="now"><b><Price amount={packagePrice(card.id)} /></b><span className="per">{pk.perPerson}</span></span>
                    <span className="pkg-note">{pk.note}</span>
                  </div>
                  <a href={`${locale === defaultLocale ? "" : `/${locale}`}/arma-tu-reserva?add=${pkgDef.slugs.join(",")}`} className="btn btn-teal">{pk.cta}</a>
                </div>
              </div>
            )
          })}
          <div className="pkg-card pkg-photo pkg-custom">
            <div className="pkg-bg" aria-hidden="true">
              <Image src="/espiritu-santo-aerea.jpg" alt="" fill sizes="(max-width: 860px) 100vw, 420px" style={{ objectFit: "cover" }} />
            </div>
            <div className="pkg-body">
              <span className="pkg-badge">{pk.customBadge}</span>
              <h3>{pk.customTitle}</h3>
              <p>{pk.customText}</p>
              <a href={CON_GORRA_URL} className="btn btn-ghost" style={{ marginTop: "auto" }} target="_blank" rel="noopener">{pk.customCta} ↗</a>
            </div>
          </div>
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
            <div key={w.title} className={`why-item${whyImages[i] ? " has-bg" : ""}`} data-num={String(i + 1).padStart(2, "0")}>
              {whyImages[i] && (
                <div
                  className="why-bg"
                  aria-hidden="true"
                  style={{ backgroundImage: `linear-gradient(rgba(8,21,31,0.70), rgba(8,21,31,0.84)), url("${whyImages[i]}")` }}
                />
              )}
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
        <TestiCarousel items={t.testi.items} locale={locale} />
      </section>

      {/* CTA BAND */}
      <section className="band-cta band-cta-photo">
        <div className="band-cta-inner">
          <span className="kicker">{hc.kicker}</span>
          <h3>{hc.title}</h3>
          <p>{hc.text}</p>
          <div className="band-cta-btns">
            <a href="#expediciones" className="btn btn-pop">{hc.cta}</a>
            <a href={wa(t.finalCta.waText)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">{hc.wa}</a>
          </div>
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
              <img src={src} alt="Keabelmet Instagram" loading="lazy" decoding="async" />
            </a>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta" id="contacto">
        <picture>
          {/* Desktop: cachalote bajo el agua. Mobile: mobula vertical. */}
          <source media="(min-width: 768px)" srcSet="/images/especies/cachalote-buceo.jpg" />
          <img src="/cta-mobula-mobile.jpg" alt={t.finalCta.alt} loading="lazy" decoding="async" />
        </picture>
        <div className="final-cta-inner">
          <h2>{t.finalCta.title}</h2>
          <p>{t.finalCta.text}</p>
          <div className="hero-ctas">
            <a href={wa(t.finalCta.waText)} className="btn btn-pop" target="_blank" rel="noopener noreferrer">{t.finalCta.btn1}</a>
            <a href="#expediciones" className="btn btn-ghost">{t.finalCta.btn2}</a>
          </div>
        </div>
      </section>

      <SeasonPopup
        locale={locale}
        items={getBookableActivities(locale)
          .filter((a) => a.slug === "safari-bahia-magdalena" || a.slug === "tiburon-ballena")
          .map((a) => ({ slug: a.slug, fromMxn: a.fromAmountMxn }))}
      />
    </main>
  )
}
