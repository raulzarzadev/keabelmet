import Link from "next/link"
import { defaultLocale, type Locale } from "@/lib/i18n"
import Logo from "@/components/Logo"
import { buildWhatsAppLink } from "@/config/whatsapp"

const INSTAGRAM_URL = "https://www.instagram.com/keabelmet__expeditions/"

interface FooterDict {
  tagline: string
  exploreTitle: string
  companyTitle: string
  contactTitle: string
  rights: string
  motto: string
  about: string
  quiz: string
  gallery: string
  espirituSanto: string
  ballenaGris: string
  tiburonBallena: string
  caboPulmo: string
  laPaz: string
  scubaDiscovery: string
  safariBahia: string
  safariVentana: string
}

const dict: Record<Locale, FooterDict> = {
  es: {
    tagline: "Safaris marinos y buceo en el Golfo de California. Encuentros auténticos con la vida salvaje, guiados por biólogos.",
    exploreTitle: "Expediciones",
    companyTitle: "Keabelmet",
    contactTitle: "Contacto",
    rights: "Todos los derechos reservados.",
    motto: "Siendo agua y tierra.",
    about: "Nuestra historia",
    quiz: "¿Qué tour elegir?",
    gallery: "Galería",
    espirituSanto: "Tour Snorkel Isla Espíritu Santo",
    ballenaGris: "Ballena Gris Puerto Chale",
    tiburonBallena: "Tiburón Ballena",
    caboPulmo: "Scuba Diving Cabo Pulmo",
    laPaz: "Scuba Diving Espíritu Santo",
    scubaDiscovery: "Scuba Discovery desde Playa",
    safariBahia: "Safari Bahía Magdalena",
    safariVentana: "Ocean Safari La Ventana",
  },
  en: {
    tagline: "Marine safaris and diving in the Gulf of California. Authentic wildlife encounters, guided by biologists.",
    exploreTitle: "Expeditions",
    companyTitle: "Keabelmet",
    contactTitle: "Contact",
    rights: "All rights reserved.",
    motto: "Being water and land.",
    about: "Our story",
    quiz: "Which tour to choose?",
    gallery: "Gallery",
    espirituSanto: "Snorkel Tour Espiritu Santo Island",
    ballenaGris: "Gray Whale Puerto Chale",
    tiburonBallena: "Whale Shark",
    caboPulmo: "Scuba Diving Cabo Pulmo",
    laPaz: "Scuba Diving Espiritu Santo",
    scubaDiscovery: "Scuba Discovery from the Beach",
    safariBahia: "Magdalena Bay Safari",
    safariVentana: "Ocean Safari La Ventana",
  },
  fr: {
    tagline: "Safaris marins et plongée dans le Golfe de Californie. Rencontres authentiques avec la vie sauvage, guidées par des biologistes.",
    exploreTitle: "Expéditions",
    companyTitle: "Keabelmet",
    contactTitle: "Contact",
    rights: "Tous droits réservés.",
    motto: "Être eau et terre.",
    about: "Notre histoire",
    quiz: "Quel tour choisir ?",
    gallery: "Galerie",
    espirituSanto: "Tour Snorkel Île Espiritu Santo",
    ballenaGris: "Baleine Grise Puerto Chale",
    tiburonBallena: "Requin-Baleine",
    caboPulmo: "Plongée Cabo Pulmo",
    laPaz: "Plongée Espiritu Santo",
    scubaDiscovery: "Scuba Discovery depuis la plage",
    safariBahia: "Safari Bahía Magdalena",
    safariVentana: "Ocean Safari La Ventana",
  },
  zh: {
    tagline: "加利福尼亚湾海洋探险与潜水。由生物学家带领，与野生动物的真实相遇。",
    exploreTitle: "探险项目",
    companyTitle: "Keabelmet",
    contactTitle: "联系",
    rights: "保留所有权利。",
    motto: "成为水与陆地。",
    about: "我们的故事",
    quiz: "选择哪个行程？",
    gallery: "图库",
    espirituSanto: "圣灵岛浮潜之旅",
    ballenaGris: "Puerto Chale 灰鲸",
    tiburonBallena: "鲸鲨",
    caboPulmo: "卡波普尔莫水肺潜水",
    laPaz: "圣灵岛水肺潜水",
    scubaDiscovery: "海滩体验潜水",
    safariBahia: "马格达莱纳湾探险",
    safariVentana: "拉文塔纳探险",
  },
}

function localizeHref(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export default function Footer({ locale = defaultLocale }: { locale?: Locale }) {
  const t = dict[locale] || dict.es
  const lh = (path: string) => localizeHref(path, locale)
  const year = new Date().getFullYear()

  const experiences = [
    { label: t.safariVentana, path: "/experiencias/safari-la-ventana" },
    { label: t.safariBahia, path: "/experiencias/safari-bahia-magdalena" },
    { label: t.ballenaGris, path: "/experiencias/tour-ballena-gris" },
    { label: t.tiburonBallena, path: "/experiencias/tiburon-ballena" },
    { label: t.espirituSanto, path: "/experiencias/tour-espiritu-santo" },
    { label: t.caboPulmo, path: "/experiencias/buceo-cabo-pulmo" },
    { label: t.laPaz, path: "/experiencias/buceo-la-paz" },
    { label: t.scubaDiscovery, path: "/experiencias/scuba-discovery" },
  ]

  const company = [
    { label: t.about, path: "/#historia" },
    { label: t.quiz, path: "/#quiz" },
    { label: t.gallery, path: "/#instagram" },
  ]

  return (
    <footer className="kbm-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo href={lh("/")} />
          <p>{t.tagline}</p>
          <div className="footer-social">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
          </div>
        </div>
        <div>
          <h5>{t.exploreTitle}</h5>
          <ul>
            {experiences.map((e) => (
              <li key={e.path}>
                <Link href={lh(e.path)}>{e.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>{t.companyTitle}</h5>
          <ul>
            {company.map((c) => (
              <li key={c.path}>
                <Link href={lh(c.path)}>{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h5>{t.contactTitle}</h5>
          <ul>
            <li><a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@keabelmet_expeditions</a></li>
            <li>La Paz, BCS, México</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {year} Keabelmet Expeditions. {t.rights}</span>
        <span>{t.motto}</span>
      </div>
    </footer>
  )
}
