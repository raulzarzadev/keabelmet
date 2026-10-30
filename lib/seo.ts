import type { Metadata } from "next"
import { locales, defaultLocale, type Locale } from "@/lib/i18n"

export const SITE_URL = "https://www.keabelmet.com"

/**
 * Brand-name variants and common misspellings of "Keabelmet".
 * Indexed as <meta keywords> so the site surfaces for typo searches.
 * Also useful for AI search engines disambiguating brand mentions.
 */
export const BRAND_NAME_VARIANTS = [
  "Keabelmet",
  "Keabelmet Expeditions",
  "keabelmet",
  "keablemet",
  "keabelment",
  "keabelmt",
  "keabelmed",
  "keablemed",
  "keabelnet",
  "keavelmet",
  "kebelmet",
  "kabelmet",
  "cabelmet",
  "kavelmet",
  "cavelmet",
  "keiabelmet",
  "queabelmet",
  "queibelmet",
  "kea belmet",
  "key abelmet",
  "kea-belmet",
  "keabel met",
  "keabel-met",
  "keablment",
  "keabllemet",
  "keablemet expeditions",
  "keabelmet tours",
  "keabelmet la paz",
  "keabelmet baja",
  "keabelmet baja california",
] as const

export const BASE_KEYWORDS = [
  ...BRAND_NAME_VARIANTS,
  "ecoturismo La Paz",
  "safari marino Baja California Sur",
  "tours La Paz BCS",
  "avistamiento ballena gris",
  "ballena gris Bahía Magdalena",
  "tiburón ballena La Paz",
  "buceo Cabo Pulmo",
  "buceo La Paz",
  "Isla Espíritu Santo tour",
  "Mar de Cortés tours",
  "Sea of Cortez tours",
  "marine safari Baja California",
  "whale watching Mexico",
  "whale shark La Paz",
] as const

export function buildUrl(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path
  if (locale === defaultLocale) return `${SITE_URL}${clean || "/"}`
  return `${SITE_URL}/${locale}${clean}`
}

export function buildLanguageAlternates(path: string): Record<string, string> {
  const alternates: Record<string, string> = {}
  for (const loc of locales) {
    const hrefLang = loc === "zh" ? "zh-CN" : loc
    alternates[hrefLang] = buildUrl(path, loc)
  }
  alternates["x-default"] = buildUrl(path, defaultLocale)
  return alternates
}

const localeToOg: Record<Locale, string> = {
  es: "es_MX",
  en: "en_US",
  fr: "fr_FR",
  zh: "zh_CN",
  ca: "ca_ES",
}

export interface PageMetaInput {
  path: string
  locale: Locale
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

type LocalizedString = Partial<Record<Locale, string>> & { es: string }

export interface PageSeo {
  title: LocalizedString
  description: LocalizedString
}

export const pageSeoMap = {
  // Títulos de ≤ 50 caracteres: el layout agrega " | Keabelmet" y Google
  // corta alrededor de 60. Cada título lleva la búsqueda principal de la página.
  about: {
    title: {
      es: "Quiénes somos: guías biólogos marinos en La Paz",
      en: "About Us: Marine Biologist Guides in La Paz",
      fr: "Qui sommes-nous : guides biologistes à La Paz",
      zh: "关于我们：拉巴斯海洋生物学家向导",
      ca: "Qui som: guies biòlegs marins a La Paz",
    },
    description: {
      es: "Somos Keabelmet Expeditions, guías biólogos marinos en La Paz, BCS. Más de 15 años de experiencia en expediciones de fauna marina con grupos pequeños.",
      en: "We're Keabelmet Expeditions, marine biologist guides in La Paz, BCS. Over 15 years of experience running small-group marine wildlife expeditions.",
      fr: "Keabelmet Expeditions : guides biologistes marins à La Paz, BCS. Plus de 15 ans d'expérience en expéditions marines en petits groupes.",
      zh: "我们是 Keabelmet 探险，拉巴斯的海洋生物学家向导团队。拥有15年以上小团海洋野生动物探险经验。",
      ca: "Som Keabelmet Expeditions, guies biòlegs marins a La Paz, BCS. Més de 15 anys d'experiència en expedicions de fauna marina amb grups petits.",
    },
  },
  contact: {
    title: {
      es: "Contacto y reservas por WhatsApp",
      en: "Contact & Bookings via WhatsApp",
      fr: "Contact et réservations par WhatsApp",
      zh: "联系与 WhatsApp 预订",
      ca: "Contacte i reserves per WhatsApp",
    },
    description: {
      es: "Escríbenos por WhatsApp al +52 612 234 7897 para reservar tu tour de fauna marina en La Paz, BCS: tiburón ballena, Espíritu Santo, ballenas y buceo.",
      en: "Message us on WhatsApp at +52 612 234 7897 to book your marine wildlife tour in La Paz, BCS: whale sharks, Espíritu Santo, whales and diving.",
      fr: "Écrivez-nous sur WhatsApp au +52 612 234 7897 pour réserver votre sortie à La Paz, BCS : requin-baleine, Espíritu Santo, baleines et plongée.",
      zh: "通过 WhatsApp +52 612 234 7897 联系我们，预订拉巴斯海洋生物之旅：鲸鲨、圣灵岛、鲸鱼和潜水。",
      ca: "Escriu-nos per WhatsApp al +52 612 234 7897 per reservar el teu tour de fauna marina a La Paz, BCS: tauró balena, Espíritu Santo, balenes i busseig.",
    },
  },
  blog: {
    title: {
      es: "Blog de fauna marina de La Paz y la Baja",
      en: "La Paz & Baja California Sur Marine Wildlife Blog",
      fr: "Blog : faune marine de La Paz et de la Baja",
      zh: "拉巴斯与南下加州海洋生物博客",
      ca: "Blog de fauna marina de La Paz i la Baixa",
    },
    description: {
      es: "Guías con base científica sobre la fauna marina de La Paz y Baja California Sur: temporadas, tiburón ballena, ballenas, Sardine Run y buceo.",
      en: "Science-based guides to the marine wildlife of La Paz and Baja California Sur: seasons, whale sharks, whales, the Sardine Run and diving.",
      fr: "Guides scientifiques sur la faune marine de La Paz et de la Basse-Californie du Sud : saisons, requins-baleines, baleines et plongée.",
      zh: "基于科学的拉巴斯与南下加州海洋生物指南：季节、鲸鲨、鲸鱼、沙丁鱼奔流和潜水。",
      ca: "Guies amb base científica sobre la fauna marina de La Paz i Baixa Califòrnia Sud: temporades, tauró balena, balenes, Sardine Run i busseig.",
    },
  },
  experiences: {
    title: {
      es: "Tours en La Paz, BCS: expediciones marinas",
      en: "La Paz, Mexico Tours: Marine Expeditions",
      fr: "Excursions à La Paz, Mexique : expéditions marines",
      zh: "拉巴斯行程：海洋探险",
      ca: "Tours a La Paz, BCS: expedicions marines",
    },
    description: {
      es: "Todas nuestras expediciones en La Paz y Baja California Sur: tiburón ballena, Isla Espíritu Santo, ballena gris, Sardine Run, móbulas y buceo.",
      en: "All our expeditions in La Paz and Baja California Sur: whale sharks, Espíritu Santo Island, gray whales, the Sardine Run, mobula rays and diving.",
      fr: "Toutes nos expéditions à La Paz et en Basse-Californie du Sud : requin-baleine, île Espíritu Santo, baleine grise, Sardine Run, raies mobula et plongée.",
      zh: "我们在拉巴斯与南下加州的全部探险：鲸鲨、圣灵岛、灰鲸、沙丁鱼奔流、蝠鲼和潜水。",
      ca: "Totes les nostres expedicions a La Paz i Baixa Califòrnia Sud: tauró balena, Illa Espíritu Santo, balena grisa, Sardine Run, móbules i busseig.",
    },
  },
  gallery: {
    title: {
      es: "Fotos de fauna marina en La Paz y la Baja",
      en: "Photos: Marine Wildlife of La Paz & Baja",
      fr: "Photos : faune marine de La Paz et de la Baja",
      zh: "照片：拉巴斯与下加州海洋生物",
      ca: "Fotos de fauna marina a La Paz i la Baixa",
    },
    description: {
      es: "Fotos reales de nuestras expediciones en La Paz y la Baja: tiburón ballena, lobos marinos, ballenas, móbulas y paisajes del Mar de Cortés.",
      en: "Real photos from our expeditions in La Paz and Baja: whale sharks, sea lions, whales, mobula rays and Sea of Cortez landscapes.",
      fr: "Vraies photos de nos expéditions à La Paz et en Basse-Californie : requins-baleines, otaries, baleines, raies mobula et mer de Cortez.",
      zh: "我们在拉巴斯与下加州探险的真实照片：鲸鲨、海狮、鲸鱼、蝠鲼和科尔特斯海风光。",
      ca: "Fotos reals de les nostres expedicions a La Paz i la Baixa: tauró balena, lleons marins, balenes, móbules i paisatges del Mar de Cortés.",
    },
  },
  rates: {
    title: {
      es: "Precios de tours en La Paz, BCS",
      en: "La Paz, Mexico Tour Prices",
      fr: "Prix des excursions à La Paz, Mexique",
      zh: "拉巴斯行程价格",
      ca: "Preus dels tours a La Paz, BCS",
    },
    description: {
      es: "Precios por persona de todos nuestros tours en La Paz, BCS: tiburón ballena, Espíritu Santo, ballena gris, Sardine Run, buceo y más. Aparta con 20%.",
      en: "Per-person prices for all our tours in La Paz, BCS: whale sharks, Espíritu Santo, gray whales, the Sardine Run, diving and more. Reserve with 20%.",
      fr: "Prix par personne de toutes nos excursions à La Paz, BCS : requin-baleine, Espíritu Santo, baleine grise, Sardine Run et plongée. Acompte de 20 %.",
      zh: "拉巴斯全部行程的每人价格：鲸鲨、圣灵岛、灰鲸、沙丁鱼奔流、潜水等。只需付20%即可预订。",
      ca: "Preus per persona de tots els nostres tours a La Paz, BCS: tauró balena, Espíritu Santo, balena grisa, Sardine Run, busseig i més. Aparta amb el 20%.",
    },
  },
  quiz: {
    title: {
      es: "¿Qué tour hacer en La Paz? Encuentra el tuyo",
      en: "Which Tour to Do in La Paz? Find Yours",
      fr: "Quelle excursion faire à La Paz ? Trouvez la vôtre",
      zh: "在拉巴斯参加哪个行程？找到适合你的",
      ca: "Quin tour fer a La Paz? Troba el teu",
    },
    description: {
      es: "Responde 4 preguntas, incluido tu mes de viaje, y te recomendamos el tour ideal en La Paz según la temporada real de cada animal.",
      en: "Answer 4 questions, including your travel month, and we'll recommend the best tour in La Paz based on each animal's real season.",
      fr: "Répondez à 4 questions, dont votre mois de voyage, et nous vous recommandons l'excursion idéale à La Paz selon la vraie saison de chaque animal.",
      zh: "回答4个问题（包括出行月份），我们会根据每种动物的真实季节推荐最适合你的拉巴斯行程。",
      ca: "Respon 4 preguntes, inclòs el teu mes de viatge, i et recomanem el tour ideal a La Paz segons la temporada real de cada animal.",
    },
  },
  tourEspirituSanto: {
    title: {
      es: "Isla Espíritu Santo: snorkel con lobos marinos",
      en: "Espíritu Santo Island Tour: Snorkel with Sea Lions",
      fr: "Île Espíritu Santo : snorkeling avec les otaries",
      zh: "圣灵岛之旅：与海狮浮潜",
      ca: "Illa Espíritu Santo: snorkel amb lleons marins",
    },
    description: {
      es: "Snorkel con lobos marinos en Isla Espíritu Santo, Patrimonio de la UNESCO: Balandra desde el mar, playas vírgenes y picnic en la isla. Sale de La Paz.",
      en: "Snorkel with sea lions at Espíritu Santo Island, a UNESCO World Heritage site: Balandra from the sea, pristine beaches and a picnic. Departs La Paz.",
      fr: "Snorkeling avec les otaries à l'île Espíritu Santo, patrimoine de l'UNESCO : Balandra depuis la mer, plages vierges et pique-nique. Départ de La Paz.",
      zh: "在联合国教科文组织世界遗产圣灵岛与海狮浮潜：从海上看巴兰德拉、原始海滩和岛上野餐。从拉巴斯出发。",
      ca: "Snorkel amb lleons marins a l'Illa Espíritu Santo, Patrimoni de la UNESCO: Balandra des del mar, platges verges i pícnic. Surt de La Paz.",
    },
  },
  tourBallenaGris: {
    title: {
      es: "Tour de ballena gris en Bahía Magdalena",
      en: "Gray Whale Tour in Magdalena Bay, Mexico",
      fr: "Excursion baleine grise à Bahía Magdalena",
      zh: "马格达莱纳湾灰鲸之旅",
      ca: "Tour de balena grisa a Bahía Magdalena",
    },
    description: {
      es: "Ve ballenas grises y sus crías de cerca en Puerto Chale, Bahía Magdalena, de enero a marzo. Día completo desde La Paz con guías biólogos marinos.",
      en: "See gray whales and their calves up close in Puerto Chale, Magdalena Bay, from January to March. Full-day trip from La Paz with marine biologist guides.",
      fr: "Observez les baleines grises et leurs petits de près à Puerto Chale, Bahía Magdalena, de janvier à mars. Journée complète depuis La Paz.",
      zh: "1月至3月在马格达莱纳湾普埃尔托查莱近距离观赏灰鲸母子。由海洋生物学家向导带领，从拉巴斯出发的一日游。",
      ca: "Veu balenes grises i les seves cries de prop a Puerto Chale, Bahía Magdalena, de gener a març. Dia complet des de La Paz amb guies biòlegs marins.",
    },
  },
  tiburonBallena: {
    title: {
      es: "Tour de nado con tiburón ballena en La Paz, BCS",
      en: "Swim with Whale Sharks in La Paz, Mexico",
      fr: "Nager avec le requin-baleine à La Paz, Mexique",
      zh: "拉巴斯鲸鲨同游之旅",
      ca: "Nedar amb el tauró balena a La Paz, BCS",
    },
    description: {
      es: "Nada con el tiburón ballena en La Paz, BCS, de octubre a abril. Grupos pequeños, guías biólogos y nado responsable con las reglas de la NOM-171.",
      en: "Swim with whale sharks in La Paz, BCS, from October to April. Small groups, marine biologist guides and responsible swimming under Mexico's NOM-171 rules.",
      fr: "Nagez avec le requin-baleine à La Paz, BCS, d'octobre à avril. Petits groupes, guides biologistes et nage responsable selon la norme NOM-171.",
      zh: "10月至4月在拉巴斯与鲸鲨同游。小团出行，海洋生物学家向导，遵守墨西哥 NOM-171 规定的负责任游泳。",
      ca: "Neda amb el tauró balena a La Paz, BCS, d'octubre a abril. Grups petits, guies biòlegs i nedada responsable amb les regles de la NOM-171.",
    },
  },
  buceoCaboPulmo: {
    title: {
      es: "Buceo en Cabo Pulmo, Parque Nacional",
      en: "Cabo Pulmo Diving: National Park Reef",
      fr: "Plongée à Cabo Pulmo, parc national",
      zh: "卡波普尔莫国家公园潜水",
      ca: "Busseig a Cabo Pulmo, Parc Nacional",
    },
    description: {
      es: "Bucea en el Parque Nacional Cabo Pulmo, uno de los mayores ejemplos de recuperación marina del planeta: cardúmenes, tortugas y tiburones.",
      en: "Dive Cabo Pulmo National Park, one of the planet's greatest marine recovery stories: schools of fish, turtles and sharks. Discover Scuba and certified dives.",
      fr: "Plongez au parc national de Cabo Pulmo, l'un des plus grands exemples de récupération marine : bancs de poissons, tortues et requins.",
      zh: "在卡波普尔莫国家公园潜水，这是全球最成功的海洋恢复案例之一：鱼群、海龟和鲨鱼。提供体验潜水和持证潜水。",
      ca: "Busseja al Parc Nacional Cabo Pulmo, un dels grans exemples de recuperació marina del planeta: bancs de peixos, tortugues i taurons.",
    },
  },
  buceoLaPaz: {
    title: {
      es: "Buceo en Isla Espíritu Santo y Los Islotes",
      en: "Scuba Diving Espíritu Santo & Los Islotes",
      fr: "Plongée à Espíritu Santo et Los Islotes",
      zh: "圣灵岛与洛斯伊斯洛特斯潜水",
      ca: "Busseig a l'Illa Espíritu Santo i Los Islotes",
    },
    description: {
      es: "Bucea con lobos marinos en Los Islotes y explora el archipiélago Espíritu Santo, en el Mar de Cortés. Guías certificados y equipo completo incluido.",
      en: "Dive with sea lions at Los Islotes and explore the Espíritu Santo archipelago in the Sea of Cortez. Certified guides and full gear included.",
      fr: "Plongez avec les otaries à Los Islotes et explorez l'archipel Espíritu Santo, en mer de Cortez. Guides certifiés et équipement complet inclus.",
      zh: "在洛斯伊斯洛特斯与海狮潜水，探索科尔特斯海的圣灵岛群岛。认证向导，含全套装备。",
      ca: "Busseja amb lleons marins a Los Islotes i explora l'arxipèlag Espíritu Santo, al Mar de Cortés. Guies certificats i equip complet inclòs.",
    },
  },
  scubaDiscovery: {
    title: {
      es: "Scuba Discovery: bucea sin certificación en La Paz",
      en: "Discover Scuba in La Paz: No Certification Needed",
      fr: "Baptême de plongée à La Paz, sans certification",
      zh: "拉巴斯体验潜水：无需证书",
      ca: "Busseja sense certificació a La Paz",
    },
    description: {
      es: "Tu primer buceo en La Paz, sin certificación: entras desde la playa con un instructor, máximo 6 m de profundidad y equipo incluido.",
      en: "Your first dive in La Paz, no certification needed: shore entry with an instructor, max depth 6 m (20 ft) and all gear included.",
      fr: "Votre première plongée à La Paz, sans certification : départ de la plage avec un instructeur, 6 m maximum et équipement inclus.",
      zh: "在拉巴斯的第一次潜水，无需证书：与教练从海滩下水，最大深度6米，含全套装备。",
      ca: "El teu primer busseig a La Paz, sense certificació: entres des de la platja amb un instructor, màxim 6 m de profunditat i equip inclòs.",
    },
  },
  safariBahiaMagdalena: {
    title: {
      es: "Sardine Run en Bahía Magdalena: safari de marlines",
      en: "Magdalena Bay Sardine Run: Striped Marlin Safari",
      fr: "Sardine Run à Bahía Magdalena : safari marlins",
      zh: "马格达莱纳湾沙丁鱼奔流：马林鱼之旅",
      ca: "Sardine Run a Bahía Magdalena: safari de marlins",
    },
    description: {
      es: "Vive el Sardine Run en Bahía Magdalena: marlines rayados cazando sardinas, lobos marinos y aves. Safari de un día desde La Paz en noviembre y diciembre.",
      en: "Experience the Magdalena Bay Sardine Run: striped marlin hunting sardines, sea lions and seabirds. One-day safari from La Paz in November and December.",
      fr: "Vivez le Sardine Run de Bahía Magdalena : marlins rayés chassant les sardines, otaries et oiseaux. Safari d'un jour depuis La Paz, en novembre et décembre.",
      zh: "体验马格达莱纳湾沙丁鱼奔流：条纹马林鱼捕猎沙丁鱼、海狮和海鸟。11月和12月从拉巴斯出发的一日游。",
      ca: "Viu el Sardine Run a Bahía Magdalena: marlins ratllats caçant sardines, lleons marins i aus. Safari d'un dia des de La Paz al novembre i desembre.",
    },
  },
  safariLaVentana: {
    title: {
      es: "Ocean Safari en La Ventana: móbulas y delfines",
      en: "La Ventana Ocean Safari: Mobula Rays & Dolphins",
      fr: "Safari à La Ventana : raies mobula et dauphins",
      zh: "拉文塔纳海洋之旅：蝠鲼与海豚",
      ca: "Ocean Safari a La Ventana: móbules i dofins",
    },
    description: {
      es: "Safari marino en La Ventana e Isla Cerralvo, BCS: móbulas, delfines, lobos marinos y ballenas según la temporada. Grupos pequeños con guías expertos.",
      en: "Marine safari in La Ventana and Cerralvo Island, BCS: mobula rays, dolphins, sea lions and whales depending on the season. Small groups, expert guides.",
      fr: "Safari marin à La Ventana et à l'île Cerralvo, BCS : raies mobula, dauphins, otaries et baleines selon la saison. Petits groupes et guides experts.",
      zh: "在拉文塔纳和塞拉尔沃岛的海洋之旅：根据季节可见蝠鲼、海豚、海狮和鲸鱼。小团出行，专业向导。",
      ca: "Safari marí a La Ventana i l'Illa Cerralvo, BCS: móbules, dofins, lleons marins i balenes segons la temporada. Grups petits amb guies experts.",
    },
  },
  openWater: {
    title: {
      es: "Certificación PADI Open Water en La Paz",
      en: "PADI Open Water Certification in La Paz",
      fr: "Certification PADI Open Water à La Paz",
      zh: "拉巴斯 PADI 开放水域认证",
      ca: "Certificació PADI Open Water a La Paz",
    },
    description: {
      es: "Certifícate PADI Open Water en La Paz, BCS. eLearning + 2 inmersiones en playa y 2 desde embarcación. Licencia internacional de por vida. $8,000 MXN.",
      en: "Get PADI Open Water certified in La Paz, BCS. eLearning + 2 beach dives and 2 boat dives. Lifetime international license, from 1 person. $8,000 MXN.",
      fr: "Certifiez-vous PADI Open Water à La Paz, BCS. eLearning + 2 plongées en plage et 2 en bateau. Licence internationale à vie, dès 1 personne. 8 000 MXN.",
      zh: "在 BCS 拉巴斯获得 PADI 开放水域认证。eLearning + 2次海滩潜水和2次船潜。终身国际执照，一人成行。8,000 MXN。",
      ca: "Certifica't PADI Open Water a La Paz, BCS. eLearning + 2 immersions a platja i 2 en vaixell. Llicència internacional de per vida, des d'1 persona. 8.000 MXN.",
    },
  },
  buildReservation: {
    title: {
      es: "Arma tu reserva · aparta con 20%",
      en: "Build your reservation · reserve with 20%",
      fr: "Composez votre réservation · 20% d'acompte",
      zh: "定制你的预订 · 付20%预订",
      ca: "Munta la teva reserva · aparta amb 20%",
    },
    description: {
      es: "Elige varias actividades en La Paz y la Baja, aparta con solo el 20% y paga el resto en efectivo, transferencia o tarjeta el día de tus tours.",
      en: "Pick several activities in La Paz and Baja, reserve with just 20% and pay the rest in cash, transfer or card on the day of your tours.",
      fr: "Choisissez plusieurs activités à La Paz et en Basse-Californie, réservez avec seulement 20% et payez le reste en espèces, virement ou carte le jour de vos tours.",
      zh: "在拉巴斯和下加州选择多个活动，只需付20%即可预订，其余在行程当天以现金、转账或刷卡支付。",
      ca: "Tria diverses activitats a La Paz i la Baixa, aparta amb només el 20% i paga la resta en efectiu, transferència o targeta el dia dels teus tours.",
    },
  },
} as const satisfies Record<string, PageSeo>

export type PageSeoKey = keyof typeof pageSeoMap

export function getPageSeo(key: PageSeoKey, locale: Locale): { title: string; description: string } {
  const entry = pageSeoMap[key]
  return {
    title: (entry.title as Record<string, string>)[locale] || entry.title.es,
    description: (entry.description as Record<string, string>)[locale] || entry.description.es,
  }
}

export function buildPageMeta(key: PageSeoKey, path: string, locale: Locale, image?: string): Metadata {
  const { title, description } = getPageSeo(key, locale)
  return {
    title,
    description,
    ...pageMeta({ path, locale, title, description, image }),
  }
}

export function pageMeta({ path, locale, title, description, image, noIndex }: PageMetaInput): Metadata {
  const url = buildUrl(path, locale)
  const ogImage = image || "/cachalotecta.jpeg"

  return {
    title,
    description,
    keywords: [...BASE_KEYWORDS],
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: title || description ? {
      title,
      description,
      url,
      siteName: "Keabelmet Expeditions",
      locale: localeToOg[locale],
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title || "Keabelmet Expeditions" }],
    } : undefined,
    twitter: title || description ? {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    } : undefined,
    robots: noIndex ? { index: false, follow: true } : undefined,
  }
}
