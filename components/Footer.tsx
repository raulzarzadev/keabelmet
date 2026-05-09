import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { socialLinks } from "@/config/mediaLinks"
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, buildWhatsAppLink } from "@/config/whatsapp"

interface FooterDict {
  tagline: string
  exploreTitle: string
  companyTitle: string
  contactTitle: string
  followTitle: string
  rights: string
  scheduleValue: string
  about: string
  contact: string
  blog: string
  rates: string
  gallery: string
  surfCamp: string
  experiences: string
  espirituSanto: string
  ballenaGris: string
  tiburonBallena: string
  caboPulmo: string
  laPaz: string
  safariBahia: string
  safariVentana: string
}

const dict: Record<Locale, FooterDict> = {
  es: {
    tagline: "Safaris marinos y buceo en el Golfo de California. Encuentros autenticos con la vida salvaje, guiados por biologos.",
    exploreTitle: "Explora",
    companyTitle: "Compania",
    contactTitle: "Contacto",
    followTitle: "Siguenos",
    rights: "Todos los derechos reservados.",
    scheduleValue: "Lun - Dom: 7:00 AM - 7:00 PM",
    about: "Sobre Nosotros",
    contact: "Contacto",
    blog: "Blog",
    rates: "Tarifas",
    gallery: "Galeria",
    surfCamp: "Surf Camp",
    experiences: "Experiencias",
    espirituSanto: "Tour Isla Espiritu Santo",
    ballenaGris: "Tour Ballena Gris",
    tiburonBallena: "Tiburon Ballena",
    caboPulmo: "Buceo Cabo Pulmo",
    laPaz: "Buceo La Paz",
    safariBahia: "Safari Bahia Magdalena",
    safariVentana: "Safari La Ventana",
  },
  en: {
    tagline: "Marine safaris and diving in the Gulf of California. Authentic wildlife encounters, guided by biologists.",
    exploreTitle: "Explore",
    companyTitle: "Company",
    contactTitle: "Contact",
    followTitle: "Follow Us",
    rights: "All rights reserved.",
    scheduleValue: "Mon - Sun: 7:00 AM - 7:00 PM",
    about: "About Us",
    contact: "Contact",
    blog: "Blog",
    rates: "Rates",
    gallery: "Gallery",
    surfCamp: "Surf Camp",
    experiences: "Experiences",
    espirituSanto: "Espiritu Santo Island Tour",
    ballenaGris: "Gray Whale Tour",
    tiburonBallena: "Whale Shark Swim",
    caboPulmo: "Cabo Pulmo Diving",
    laPaz: "La Paz Diving",
    safariBahia: "Magdalena Bay Safari",
    safariVentana: "La Ventana Safari",
  },
  fr: {
    tagline: "Safaris marins et plongee dans le Golfe de Californie. Rencontres authentiques avec la vie sauvage, guidees par des biologistes.",
    exploreTitle: "Explorer",
    companyTitle: "Entreprise",
    contactTitle: "Contact",
    followTitle: "Suivez-nous",
    rights: "Tous droits reserves.",
    scheduleValue: "Lun - Dim : 7h00 - 19h00",
    about: "A Propos",
    contact: "Contact",
    blog: "Blog",
    rates: "Tarifs",
    gallery: "Galerie",
    surfCamp: "Surf Camp",
    experiences: "Experiences",
    espirituSanto: "Tour Ile Espiritu Santo",
    ballenaGris: "Tour Baleine Grise",
    tiburonBallena: "Nage avec Requin-Baleine",
    caboPulmo: "Plongee Cabo Pulmo",
    laPaz: "Plongee La Paz",
    safariBahia: "Safari Bahia Magdalena",
    safariVentana: "Safari La Ventana",
  },
  zh: {
    tagline: "加利福尼亚湾海洋探险与潜水。由生物学家带领，与野生动物的真实相遇。",
    exploreTitle: "探索",
    companyTitle: "公司",
    contactTitle: "联系",
    followTitle: "关注我们",
    rights: "保留所有权利。",
    scheduleValue: "周一至周日：上午 7:00 - 晚上 7:00",
    about: "关于我们",
    contact: "联系我们",
    blog: "博客",
    rates: "价格",
    gallery: "图库",
    surfCamp: "冲浪营",
    experiences: "体验项目",
    espirituSanto: "圣灵岛之旅",
    ballenaGris: "灰鲸之旅",
    tiburonBallena: "鲸鲨同游",
    caboPulmo: "卡波普尔莫潜水",
    laPaz: "拉巴斯潜水",
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
    { label: t.espirituSanto, path: "/experiencias/tour-espiritu-santo" },
    { label: t.ballenaGris, path: "/experiencias/tour-ballena-gris" },
    { label: t.tiburonBallena, path: "/experiencias/tiburon-ballena" },
    { label: t.caboPulmo, path: "/experiencias/buceo-cabo-pulmo" },
    { label: t.laPaz, path: "/experiencias/buceo-la-paz" },
    { label: t.safariBahia, path: "/experiencias/safari-bahia-magdalena" },
    { label: t.safariVentana, path: "/experiencias/safari-la-ventana" },
    { label: t.surfCamp, path: "/surf-camp" },
  ]

  const company = [
    { label: t.about, path: "/sobre-nosotros" },
    { label: t.experiences, path: "/experiencias" },
    { label: t.rates, path: "/tarifas" },
    { label: t.gallery, path: "/galeria" },
    { label: t.blog, path: "/blog" },
    { label: t.contact, path: "/contacto" },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href={lh("/")} className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/logo.png"
                alt="Keabelmet"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-contain bg-white p-0.5"
              />
              <span className="text-lg font-semibold text-white">Keabelmet</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">{t.tagline}</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{t.exploreTitle}</h3>
            <ul className="space-y-2 text-sm">
              {experiences.map((e) => (
                <li key={e.path}>
                  <Link href={lh(e.path)} className="hover:text-white transition-colors">
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{t.companyTitle}</h3>
            <ul className="space-y-2 text-sm">
              {company.map((c) => (
                <li key={c.path}>
                  <Link href={lh(c.path)} className="hover:text-white transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">{t.contactTitle}</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <a href="mailto:keabelmet@gmail.com" className="hover:text-white transition-colors">
                  keabelmet@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <a
                  href="https://maps.google.com/?q=La+Ventana+BCS+Mexico"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  La Ventana, Baja California Sur, Mexico
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 flex-shrink-0 text-teal-400" />
                <span>{t.scheduleValue}</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white font-semibold mb-3 text-xs uppercase tracking-wide">{t.followTitle}</h4>
              <div className="flex gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="w-9 h-9 rounded-full bg-gray-800 hover:bg-teal-600 flex items-center justify-center transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  )
                })}
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-full bg-green-600 hover:bg-green-500 flex items-center justify-center transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {year} Keabelmet Expeditions. {t.rights}</p>
          <p>La Paz · La Ventana · Bahia Magdalena · Cabo Pulmo</p>
        </div>
      </div>
    </footer>
  )
}
