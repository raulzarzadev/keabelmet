import Link from "next/link"
import { type Locale, defaultLocale, isValidLocale } from "@/lib/i18n"
import HomeQuiz from "@/components/HomeQuiz"
import SeasonCalendar from "@/components/SeasonCalendar"
import FounderStory from "@/components/FounderStory"
import TestiCarousel from "@/components/TestiCarousel"
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

  const comboMeta = [
    { regularMxn: 4100, off: 0.10 },
    { regularMxn: 7100, off: 0.15 },
  ]
  const packagesT: Record<string, { kicker: string; title: string; sub: string; perPerson: string; save: string; cta: string; best: string; items: { name: string; days: string; activities: string[] }[]; customBadge: string; customTitle: string; customText: string; customCta: string; customWa: string }> = {
    es: {
      kicker: "Vive varios días", title: "Combina y ahorra", sub: "¿Vienes varios días a la Baja? Junta actividades y paga menos. Coordinamos tus fechas por WhatsApp.",
      perPerson: "por persona", save: "Ahorras", cta: "Reservar por WhatsApp", best: "El más elegido",
      items: [
        { name: "Dúo La Paz", days: "2 días", activities: ["Nado con Tiburón Ballena", "Snorkel en Isla Espíritu Santo"] },
        { name: "Semana Baja", days: "3 días", activities: ["Nado con Tiburón Ballena", "Isla Espíritu Santo", "Safari La Ventana"] },
      ],
      customBadge: "A tu medida", customTitle: "Arma tu semana", customText: "Cuéntanos cuántos días vienes y qué te emociona. Diseñamos tu itinerario ideal y te damos precio de paquete.", customCta: "Planear mi viaje", customWa: "Hola! Quiero armar un viaje de varios días con ustedes. ¿Me ayudan a planearlo?",
    },
    en: {
      kicker: "Stay several days", title: "Combine and save", sub: "Coming to Baja for several days? Bundle activities and pay less. We coordinate your dates over WhatsApp.",
      perPerson: "per person", save: "You save", cta: "Book on WhatsApp", best: "Most popular",
      items: [
        { name: "La Paz Duo", days: "2 days", activities: ["Swim with Whale Sharks", "Snorkel at Espíritu Santo Island"] },
        { name: "Baja Week", days: "3 days", activities: ["Swim with Whale Sharks", "Espíritu Santo Island", "La Ventana Safari"] },
      ],
      customBadge: "Tailor-made", customTitle: "Build your week", customText: "Tell us how many days you're coming and what excites you. We'll design your ideal itinerary at a package price.", customCta: "Plan my trip", customWa: "Hi! I want to plan a multi-day trip with you. Can you help me?",
    },
    fr: {
      kicker: "Restez plusieurs jours", title: "Combinez et économisez", sub: "Vous venez plusieurs jours en Basse-Californie ? Regroupez des activités et payez moins. Nous coordonnons vos dates sur WhatsApp.",
      perPerson: "par personne", save: "Vous économisez", cta: "Réserver sur WhatsApp", best: "Le plus choisi",
      items: [
        { name: "Duo La Paz", days: "2 jours", activities: ["Nager avec les requins-baleines", "Snorkeling à l'île Espíritu Santo"] },
        { name: "Semaine Baja", days: "3 jours", activities: ["Nager avec les requins-baleines", "Île Espíritu Santo", "Safari La Ventana"] },
      ],
      customBadge: "Sur mesure", customTitle: "Composez votre semaine", customText: "Dites-nous combien de jours vous venez et ce qui vous passionne. Nous concevons votre itinéraire idéal à prix de forfait.", customCta: "Planifier mon voyage", customWa: "Bonjour ! Je veux organiser un voyage de plusieurs jours avec vous. Pouvez-vous m'aider ?",
    },
    zh: {
      kicker: "畅玩多日", title: "组合更省", sub: "来下加州玩几天？组合多个活动，享更低价格。我们通过 WhatsApp 协调您的日期。",
      perPerson: "每人", save: "节省", cta: "通过 WhatsApp 预订", best: "最受欢迎",
      items: [
        { name: "拉巴斯双人组合", days: "2 天", activities: ["与鲸鲨同游", "圣灵岛浮潜"] },
        { name: "下加州一周", days: "3 天", activities: ["与鲸鲨同游", "圣灵岛", "拉文塔纳探险"] },
      ],
      customBadge: "量身定制", customTitle: "定制您的行程", customText: "告诉我们您来几天、对什么感兴趣。我们将以套餐价为您设计理想行程。", customCta: "规划我的旅程", customWa: "你好！我想和你们规划一次多日行程，可以帮我吗？",
    },
    ca: {
      kicker: "Viu diversos dies", title: "Combina i estalvia", sub: "Véns diversos dies a la Baixa? Ajunta activitats i paga menys. Coordinem les teves dates per WhatsApp.",
      perPerson: "per persona", save: "Estalvies", cta: "Reservar per WhatsApp", best: "El més triat",
      items: [
        { name: "Duo La Paz", days: "2 dies", activities: ["Neda amb taurons balena", "Snorkel a l'Illa Espíritu Santo"] },
        { name: "Setmana Baixa", days: "3 dies", activities: ["Neda amb taurons balena", "Illa Espíritu Santo", "Safari La Ventana"] },
      ],
      customBadge: "A mida", customTitle: "Munta la teva setmana", customText: "Explica'ns quants dies véns i què t'emociona. Dissenyem el teu itinerari ideal a preu de paquet.", customCta: "Planejar el meu viatge", customWa: "Hola! Vull organitzar un viatge de diversos dies amb vosaltres. Em podeu ajudar?",
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
            <img src="/cachalotecta.jpeg" alt={t.hero.alt} />
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
              <img src={r.image} alt={r.alt} />
            </picture>
          ) : (
            <img src={r.image} alt={r.alt} />
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

      {/* PAQUETES */}
      <section className="packages" id="paquetes">
        <div className="section-head" style={{ padding: 0 }}>
          <span className="kicker">{pk.kicker}</span>
          <h2>{pk.title}</h2>
          <p>{pk.sub}</p>
        </div>
        <div className="packages-grid">
          {pk.items.map((combo, idx) => {
            const meta = comboMeta[idx]
            const now = Math.round(meta.regularMxn * (1 - meta.off))
            const savings = meta.regularMxn - now
            return (
              <div key={combo.name} className={`pkg-card${idx === 1 ? " pkg-featured" : ""}`}>
                {idx === 1 && <span className="pkg-badge">{pk.best}</span>}
                <h3>{combo.name}</h3>
                <div className="pkg-days">{combo.days}</div>
                <ul className="pkg-acts">
                  {combo.activities.map((a) => <li key={a}>{a}</li>)}
                </ul>
                <div className="pkg-price">
                  <span className="reg"><Price amount={meta.regularMxn} /></span>
                  <span className="now"><b><Price amount={now} /></b><span className="per">{pk.perPerson}</span></span>
                  <span className="pkg-save">{pk.save} <Price amount={savings} /></span>
                </div>
                <a href={wa(`Hola! Me interesa el paquete "${combo.name}" (${combo.activities.join(" + ")}). ¿Me ayudan con fechas y precio?`)} className="btn btn-teal" target="_blank" rel="noopener noreferrer">{pk.cta}</a>
              </div>
            )
          })}
          <div className="pkg-card pkg-custom">
            <span className="pkg-badge">{pk.customBadge}</span>
            <h3>{pk.customTitle}</h3>
            <p>{pk.customText}</p>
            <a href={wa(pk.customWa)} className="btn btn-ghost" style={{ marginTop: "auto" }} target="_blank" rel="noopener noreferrer">{pk.customCta}</a>
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
