import Link from "next/link"
import { type Locale, defaultLocale, isValidLocale } from "@/lib/i18n"
import HomeQuiz from "@/components/HomeQuiz"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"

const INSTAGRAM_URL = "https://www.instagram.com/keabelmet__expeditions/"

function wa(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const regions = [
  {
    kicker: "La Ventana · Isla Cerralvo",
    title: "Móbulas que vuelan, ballenas que emergen",
    text: "Un safari sin guion. Navegamos guiados por biólogos marinos en busca de lo inesperado, a 40 minutos de La Paz.",
    image: "/images/orca-safari.jpg",
    alt: "Seafari en La Ventana",
    href: "/experiencias/safari-la-ventana",
    right: false,
  },
  {
    kicker: "Bahía Magdalena · Nov-Dic",
    title: "El safari más salvaje del Pacífico",
    text: "Miles de sardinas, marlines cazando a máxima velocidad, ballenas alimentándose. Un fenómeno de solo dos meses al año.",
    image: "/images/marlin-bahia-magdalena-hero.jpeg",
    alt: "Sardine Run en Bahía Magdalena",
    href: "/experiencias/safari-bahia-magdalena",
    right: true,
  },
  {
    kicker: "Cabo Pulmo · Parque Nacional",
    title: "El único arrecife vivo del Golfo",
    text: "25,000 años de coral, tiburones toro, cardúmenes masivos. Una de las reservas marinas más exitosas del mundo.",
    image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
    alt: "Buceo en Cabo Pulmo",
    href: "/experiencias/buceo-cabo-pulmo",
    right: false,
  },
  {
    kicker: "Isla Espíritu Santo · Patrimonio UNESCO",
    title: "Nada con lobos marinos curiosos",
    text: "Playas vírgenes, aguas cristalinas y una de las colonias de lobos marinos más grandes del Golfo de California.",
    image: "/espiritu-santo-island-paradise-beach.jpg",
    alt: "Isla Espíritu Santo",
    href: "/experiencias/tour-espiritu-santo",
    right: true,
  },
]

const tourCards = [
  {
    tag: "Medio día",
    coral: false,
    image: "/images/orca-safari.jpg",
    alt: "Safari La Ventana",
    title: "Safari La Ventana",
    meta: ["2-8 personas", "6 horas", "Móbulas Abr-Jun"],
    price: "$3,000 MXN",
    per: "por persona",
    href: "/experiencias/safari-la-ventana",
  },
  {
    tag: "Día completo",
    coral: false,
    image: "/images/marlin-bahia-magdalena-hero.jpeg",
    alt: "Safari Bahía Magdalena",
    title: "Safari Bahía Magdalena",
    meta: ["2-6 personas", "Corrida de sardinas", "Nov-Dic"],
    price: "$3,500 MXN",
    per: "por persona",
    href: "/experiencias/safari-bahia-magdalena",
  },
  {
    tag: "Día completo",
    coral: false,
    image: "/images/hero/ballena-gris-hero.jpeg",
    alt: "Ballena Gris Puerto Chale",
    title: "Ballena Gris · Puerto Chale",
    meta: ["Hasta 8 personas", "Madres y crías", "Ene-Mar"],
    price: "$2,800 MXN",
    per: "por persona",
    href: "/experiencias/tour-ballena-gris",
  },
  {
    tag: "Medio día",
    coral: false,
    image: "/snorkeling-coral-reef.jpg",
    alt: "Tiburón Ballena",
    title: "Tiburón Ballena",
    meta: ["2-8 personas", "Snorkel", "Oct-Abr"],
    price: "$1,800 MXN",
    per: "por persona",
    href: "/experiencias/tiburon-ballena",
  },
  {
    tag: "Día completo",
    coral: false,
    image: "/espiritu-santo-island-paradise-beach.jpg",
    alt: "Isla Espíritu Santo",
    title: "Isla Espíritu Santo",
    meta: ["2-10 personas", "Lobos marinos", "Todo el año"],
    price: "$1,800 MXN",
    per: "por persona",
    href: "/experiencias/tour-espiritu-santo",
  },
  {
    tag: "Día completo",
    coral: false,
    image: "/coral-reef-underwater-diving-cabo-pulmo-colorful-f.jpg",
    alt: "Buceo Cabo Pulmo",
    title: "Scuba Diving Cabo Pulmo",
    meta: ["Parque Nacional", "Discovery $3,800", "Todo el año"],
    price: "$3,200 MXN",
    per: "certificado",
    href: "/experiencias/buceo-cabo-pulmo",
  },
  {
    tag: "Día completo",
    coral: false,
    image: "/scuba-diving-underwater-sea-lions-swimming-playful.jpg",
    alt: "Buceo Isla Espíritu Santo",
    title: "Scuba Diving Isla Espíritu Santo",
    meta: ["Lobos marinos", "Discovery $4,200", "Todo el año"],
    price: "$3,700 MXN",
    per: "certificado",
    href: "/experiencias/buceo-la-paz",
  },
  {
    tag: "Nuevo",
    coral: true,
    image: "/snorkeling-coral-reef.jpg",
    alt: "Scuba Discovery desde playa",
    title: "Scuba Discovery desde Playa",
    meta: ["Sin experiencia previa", "Máx. 6m profundidad", "Para principiantes"],
    price: "$1,500 MXN",
    per: "por persona",
    href: "/experiencias/scuba-discovery",
  },
]

const whyItems = [
  {
    num: "01",
    title: "Experiencia local",
    text: "Con base en La Paz, conocemos cada rincón y el mejor momento para visitar cada lugar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7.58 7-13a7 7 0 1 0-14 0c0 5.42 7 13 7 13z" /><circle cx="12" cy="9" r="2.5" /></svg>
    ),
  },
  {
    num: "02",
    title: "Seguridad primero",
    text: "Guías certificados, equipo de calidad y protocolos reales para tu tranquilidad.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>
    ),
  },
  {
    num: "03",
    title: "Grupos pequeños",
    text: "Atención personalizada y conexiones auténticas con quienes viajan contigo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><circle cx="17" cy="8.5" r="2.6" /><path d="M15.2 14.3c2.7.4 4.8 2.5 4.8 5.7" /></svg>
    ),
  },
  {
    num: "04",
    title: "Liderado por biólogos marinos",
    text: "Especialistas con experiencia real en expediciones y campamentos remotos.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h3" /><path d="M10.5 3v5.5" /><path d="M7 21h10" /><path d="M9.5 21c-1.6-1-2.5-2.5-2.5-4.4 0-3 2.5-5.1 5.5-5.1s5 2 6.3 4.6" /><circle cx="18" cy="16" r="2.2" /></svg>
    ),
  },
  {
    num: "05",
    title: "Educación y conservación",
    text: "Cada expedición es una oportunidad para aprender y proteger el ecosistema.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg>
    ),
  },
  {
    num: "06",
    title: "Foto y video incluidos",
    text: "Capturas profesionales de tu experiencia, listas para revivir el momento.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
    ),
  },
]

const testimonials = [
  {
    text: '"Siempre soñé con ver ballenas. Pero esto fue más que eso. Lloré de emoción. Gracias por respetar la naturaleza así."',
    name: "Lucía",
    loc: "Ciudad de México",
  },
  {
    text: '"Nadar con los lobos marinos fue la experiencia más mágica de mi vida. Son tan juguetones y curiosos. El equipo de Keabelmet es súper profesional y respetuoso con los animales."',
    name: "María González",
    loc: "Ciudad de México",
  },
  {
    text: '"Increíble experiencia. Ver a los marlines cazando sardinas fue como estar en un documental de National Geographic. La adrenalina y la emoción son indescriptibles."',
    name: "Alejandro Ruiz",
    loc: "Monterrey",
  },
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
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/whale-breaching-ocean.jpg" alt="Ballena saltando en el Mar de Cortés" />
        </div>
        <div className="hero-content">
          <span className="kicker">Siendo agua y tierra</span>
          <h1>Donde el desierto<br />conoce al <em>mar salvaje</em></h1>
          <p className="hero-sub">Expediciones marinas guiadas por biólogos en Baja California Sur. Nada con lobos marinos, encuentra ballenas frente a frente y explora el Mar de Cortés como pocos lo han visto.</p>
          <div className="hero-ctas">
            <a href="#expediciones" className="btn btn-solid">Explora las expediciones</a>
            <a href="#historia" className="btn btn-ghost">Nuestra historia</a>
          </div>
        </div>
        <div className="scrolldown">Desliza para explorar ↓</div>
      </section>

      {/* STATS */}
      <div className="stats">
        <div className="wrap">
          <div className="stat"><b>15+</b><span>Expediciones únicas</span></div>
          <div className="stat"><b>10K+</b><span>Aventureros satisfechos</span></div>
          <div className="stat"><b>9.8</b><span>Calificación promedio</span></div>
        </div>
      </div>

      {/* MISSION */}
      <section className="mission">
        <div className="wrap">
          <p>El Mar de Cortés es uno de los mares más biodiversos del planeta. <em>Jacques Cousteau lo llamó "el acuario del mundo".</em></p>
          <p className="dim">Cada expedición que vives con nosotros es un encuentro real con esa vida salvaje — y una forma de ayudar a protegerla.</p>
        </div>
      </section>

      {/* REGIONS */}
      {regions.map((r) => (
        <div key={r.href} className={`region${r.right ? " region-right" : ""}`}>
          <img src={r.image} alt={r.alt} />
          <div className="region-inner">
            <div className="region-text">
              <span className="kicker">{r.kicker}</span>
              <h2>{r.title}</h2>
              <p>{r.text}</p>
              <Link href={lh(r.href)} className="btn btn-ghost">Ver expedición</Link>
            </div>
          </div>
        </div>
      ))}

      {/* QUIZ */}
      <HomeQuiz locale={locale} />

      {/* TOURS */}
      <section id="expediciones" className="tours">
        <div className="section-head" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <span className="kicker">Nuestras expediciones</span>
          <h2>Diseñadas para encuentros reales con la vida marina</h2>
          <p>Grupos pequeños, guía biólogo marino, foto y video incluidos. Sin guion, sin masificación.</p>
        </div>

        <div className="tour-grid">
          {tourCards.map((t) => (
            <Link key={t.href} className="tour-card" href={lh(t.href)}>
              <div className="tour-media">
                <span className={`tour-tag${t.coral ? " coral" : ""}`}>{t.tag}</span>
                <img src={t.image} alt={t.alt} />
              </div>
              <div className="tour-body">
                <h3>{t.title}</h3>
                <div className="tour-meta">
                  {t.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
                <div className="tour-foot">
                  <div className="tour-price"><b>{t.price}</b><span>{t.per}</span></div>
                  <span className="tour-link">Ver expedición</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="compare">
        <div className="section-head" style={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, margin: "0 auto 50px" }}>
          <span className="kicker">Comparativa directa</span>
          <h2>Lo que suele arruinar un safari — y cómo lo hacemos distinto</h2>
        </div>
        <div className="compare-grid">
          <div className="compare-col bad">
            <h4>LO TÍPICO</h4>
            <div className="compare-item"><span className="x">✕</span><p><strong>Panga con 20 personas</strong>Experiencia caótica, poco personal, cero conexión real.</p></div>
            <div className="compare-item"><span className="x">✕</span><p><strong>Guías sin formación científica</strong>No explican comportamiento ni respetan a los animales.</p></div>
            <div className="compare-item"><span className="x">✕</span><p><strong>Fotos que prometen y nunca llegan</strong>O llegan sin cumplir lo esperado.</p></div>
          </div>
          <div className="compare-col good">
            <h4>KEABELMET</h4>
            <div className="compare-item"><span className="ok">✓</span><p><strong>Grupos pequeños de verdad</strong>Máximo 8-10 personas por expedición, atención personalizada.</p></div>
            <div className="compare-item"><span className="ok">✓</span><p><strong>Guía biólogo marino</strong>Historias, comportamiento animal y buenas prácticas de conservación.</p></div>
            <div className="compare-item"><span className="ok">✓</span><p><strong>Foto y video incluidos</strong>Capturas profesionales entregadas siempre, sin letra chiquita.</p></div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="why">
        <div className="section-head" style={{ padding: 0 }}>
          <span className="kicker">Por qué Keabelmet</span>
          <h2>Aventuras auténticas, sustentables e inolvidables</h2>
        </div>
        <div className="why-grid">
          {whyItems.map((w) => (
            <div key={w.num} className="why-item" data-num={w.num}>
              <div className="why-icon">{w.icon}</div>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi">
        <div className="section-head">
          <span className="kicker">Lo que dicen nuestros aventureros</span>
          <h2>Experiencias reales, contadas por quienes las vivieron</h2>
        </div>
        <div className="testi-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testi-card">
              <div className="stars">★★★★★</div>
              <p>{t.text}</p>
              <div className="testi-name">{t.name}</div>
              <div className="testi-loc">{t.loc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section className="founder" id="historia">
        <div className="founder-media">
          <img src="/images/orca-safari.jpg" alt="Mauricio López Sosa, fundador de Keabelmet" />
        </div>
        <div className="founder-text">
          <span className="kicker">Nuestra historia</span>
          <h2>Fundada por un biólogo marino, no por una agencia de tours</h2>
          <p>Keabelmet nació en 2024 de la mano de Mauricio López Sosa, biólogo marino egresado de la UABCS, guía, videógrafo y capitán de cada expedición. El nombre viene del guaycura: "Kea" (siendo) y "Cabelmet" (agua y tierra).</p>
          <p>Cada expedición está diseñada para ser un encuentro real con la vida silvestre del Mar de Cortés — sin guion, sin masificación, con respeto por los animales y su hábitat.</p>
          <div className="sign">Mauricio López Sosa</div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="insta" id="instagram">
        <div className="insta-head">
          <div>
            <span className="kicker">Síguenos</span>
            <h2>@keabelmet_expeditions</h2>
          </div>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Ver en Instagram</a>
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
        <img src="/whale-breaching-ocean.jpg" alt="Ballena en el Mar de Cortés" />
        <div className="final-cta-inner">
          <h2>Tu próximo encuentro salvaje empieza aquí</h2>
          <p>Escríbenos por WhatsApp y armamos tu expedición — grupos pequeños, guía biólogo marino, foto y video incluidos.</p>
          <div className="hero-ctas">
            <a href={wa("Hola! quiero reservar una expedición con Keabelmet")} className="btn btn-solid" target="_blank" rel="noopener noreferrer">Reservar por WhatsApp</a>
            <a href="#expediciones" className="btn btn-ghost">Ver expediciones</a>
          </div>
        </div>
      </section>
    </main>
  )
}
