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
  "renta velero La Paz",
  "renta yate La Paz",
  "surf camp La Paz",
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
}

export interface PageMetaInput {
  path: string
  locale: Locale
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
}

type LocalizedString = Record<Locale, string>

export interface PageSeo {
  title: LocalizedString
  description: LocalizedString
}

export const pageSeoMap = {
  about: {
    title: {
      es: "Sobre Nosotros",
      en: "About Us",
      fr: "A propos",
      zh: "关于我们",
    },
    description: {
      es: "Conoce al equipo de Keabelmet Expeditions. Mas de 15 anos de experiencia en expediciones marinas en Baja California Sur.",
      en: "Meet the Keabelmet Expeditions team. Over 15 years of experience in marine expeditions in Baja California Sur.",
      fr: "Decouvrez l'equipe de Keabelmet Expeditions. Plus de 15 ans d'experience dans les expeditions marines en Basse-Californie du Sud.",
      zh: "认识 Keabelmet 探险团队。15 年以上下加利福尼亚州海洋探险经验。",
    },
  },
  contact: {
    title: {
      es: "Contacto",
      en: "Contact",
      fr: "Contact",
      zh: "联系我们",
    },
    description: {
      es: "Contacta a Keabelmet Expeditions. Escribenos a keabelmet@gmail.com o por WhatsApp +52 612 234 7897. Reserva tu aventura marina.",
      en: "Contact Keabelmet Expeditions. Email keabelmet@gmail.com or WhatsApp +52 612 234 7897. Book your marine adventure.",
      fr: "Contactez Keabelmet Expeditions. Email keabelmet@gmail.com ou WhatsApp +52 612 234 7897. Reservez votre aventure marine.",
      zh: "联系 Keabelmet 探险。邮件 keabelmet@gmail.com 或 WhatsApp +52 612 234 7897。预订海洋冒险。",
    },
  },
  blog: {
    title: {
      es: "Blog de Aventuras",
      en: "Adventure Blog",
      fr: "Blog d'aventures",
      zh: "探险博客",
    },
    description: {
      es: "Historias, consejos y guias sobre vida marina en Baja California Sur. Temporadas de ballenas, tips de surf, buceo y mas.",
      en: "Stories, tips and guides about marine life in Baja California Sur. Whale seasons, surf tips, diving and more.",
      fr: "Histoires, conseils et guides sur la vie marine en Basse-Californie du Sud. Saisons des baleines, conseils surf, plongee et plus.",
      zh: "下加利福尼亚州海洋生物的故事、技巧和指南。鲸鱼季节、冲浪技巧、潜水等。",
    },
  },
  experiences: {
    title: {
      es: "Experiencias y Tours",
      en: "Experiences & Tours",
      fr: "Experiences et tours",
      zh: "体验与行程",
    },
    description: {
      es: "Descubre nuestras experiencias marinas en Baja California Sur: safaris, surf camp, buceo y mas.",
      en: "Discover our marine experiences in Baja California Sur: safaris, surf camp, diving and more.",
      fr: "Decouvrez nos experiences marines en Basse-Californie du Sud : safaris, surf camp, plongee et plus.",
      zh: "探索我们在下加利福尼亚州的海洋体验：野生动物之旅、冲浪营、潜水等。",
    },
  },
  gallery: {
    title: {
      es: "Galeria de Aventuras",
      en: "Adventure Gallery",
      fr: "Galerie d'aventures",
      zh: "探险画廊",
    },
    description: {
      es: "Explora nuestra galeria de fotos de expediciones marinas en Baja California Sur. Ballenas, lobos marinos, surf y paisajes del Mar de Cortes.",
      en: "Explore our gallery of marine expedition photos in Baja California Sur. Whales, sea lions, surf and Sea of Cortez landscapes.",
      fr: "Explorez notre galerie de photos d'expeditions marines en Basse-Californie du Sud. Baleines, otaries, surf et paysages de la mer de Cortez.",
      zh: "探索我们在下加利福尼亚州海洋探险照片画廊。鲸鱼、海狮、冲浪和科尔特斯海风光。",
    },
  },
  rates: {
    title: {
      es: "Tarifas y Precios",
      en: "Rates & Prices",
      fr: "Tarifs et prix",
      zh: "价格与套餐",
    },
    description: {
      es: "Consulta las tarifas de nuestras expediciones marinas en Baja California Sur. Paquetes con todo incluido.",
      en: "Check rates for our marine expeditions in Baja California Sur. All-inclusive packages.",
      fr: "Consultez les tarifs de nos expeditions marines en Basse-Californie du Sud. Forfaits tout compris.",
      zh: "查看我们在下加利福尼亚州的海洋探险价格。全包套餐。",
    },
  },
  surfCamp: {
    title: {
      es: "Surf Camp La Paz",
      en: "Surf Camp La Paz",
      fr: "Surf Camp La Paz",
      zh: "拉巴斯冲浪营",
    },
    description: {
      es: "Surf camp de 6 dias en La Paz, Baja California Sur. Clases diarias, analisis de video, transporte y snacks incluidos. Aprende a surfear con instructores expertos.",
      en: "6-day surf camp in La Paz, Baja California Sur. Daily lessons, video analysis, transport and snacks included. Learn to surf with expert instructors.",
      fr: "Surf camp de 6 jours a La Paz, Basse-Californie du Sud. Cours quotidiens, analyse video, transport et snacks inclus. Apprenez a surfer avec des instructeurs experts.",
      zh: "拉巴斯 6 天冲浪营。每日课程、视频分析、交通和小吃包含。跟专家教练学冲浪。",
    },
  },
  quiz: {
    title: {
      es: "Quiz: Encuentra tu Tour Ideal",
      en: "Quiz: Find Your Ideal Tour",
      fr: "Quiz : Trouvez votre tour ideal",
      zh: "测验：找到适合您的行程",
    },
    description: {
      es: "Responde unas preguntas y recibe la recomendacion personalizada de tu expedicion marina ideal en Baja California Sur.",
      en: "Answer a few questions and get a personalized recommendation for your ideal marine expedition in Baja California Sur.",
      fr: "Repondez a quelques questions et obtenez une recommandation personnalisee pour votre expedition marine ideale en Basse-Californie du Sud.",
      zh: "回答几个问题，获得下加利福尼亚州理想海洋探险的个性化推荐。",
    },
  },
  tourEspirituSanto: {
    title: {
      es: "Tour Isla Espiritu Santo",
      en: "Espiritu Santo Island Tour",
      fr: "Tour Ile Espiritu Santo",
      zh: "圣灵岛之旅",
    },
    description: {
      es: "Nada con lobos marinos en la Isla Espiritu Santo, Patrimonio UNESCO. Snorkel, playas virgenes y picnic gourmet en el Mar de Cortes desde La Paz, BCS.",
      en: "Swim with sea lions at Espiritu Santo Island, UNESCO Heritage. Snorkeling, pristine beaches and gourmet picnic in the Sea of Cortez from La Paz, BCS.",
      fr: "Nagez avec les otaries a l'ile Espiritu Santo, patrimoine UNESCO. Snorkeling, plages vierges et pique-nique gourmand dans la mer de Cortez depuis La Paz, BCS.",
      zh: "在联合国教科文组织遗产圣灵岛与海狮共游。浮潜、原始海滩和科尔特斯海美食野餐，从拉巴斯出发。",
    },
  },
  tourBallenaGris: {
    title: {
      es: "Tour Ballena Gris en Bahia Magdalena",
      en: "Gray Whale Tour in Magdalena Bay",
      fr: "Tour Baleine Grise a Bahia Magdalena",
      zh: "马格达莱纳湾灰鲸之旅",
    },
    description: {
      es: "Vive la experiencia de avistar ballenas grises en Bahia Magdalena, BCS. Tour guiado con encuentros cercanos en su santuario natural de reproduccion.",
      en: "Experience gray whale watching in Magdalena Bay, BCS. Guided tour with close encounters in their natural breeding sanctuary.",
      fr: "Vivez l'observation des baleines grises a Bahia Magdalena, BCS. Tour guide avec des rencontres rapprochees dans leur sanctuaire naturel de reproduction.",
      zh: "在 BCS 马格达莱纳湾观赏灰鲸。在其自然繁殖保护区进行近距离接触的导游之旅。",
    },
  },
  tiburonBallena: {
    title: {
      es: "Nado con Tiburon Ballena en La Paz",
      en: "Whale Shark Swim in La Paz",
      fr: "Nage avec Requin-Baleine a La Paz",
      zh: "拉巴斯鲸鲨同游",
    },
    description: {
      es: "Nada con el pez mas grande del mundo en La Paz, Baja California Sur. Experiencia responsable guiada por expertos en aguas protegidas del Golfo de California.",
      en: "Swim with the world's largest fish in La Paz, Baja California Sur. Responsible expert-guided experience in protected Gulf of California waters.",
      fr: "Nagez avec le plus grand poisson du monde a La Paz, Basse-Californie du Sud. Experience responsable guidee par des experts dans les eaux protegees du golfe de Californie.",
      zh: "在下加利福尼亚州拉巴斯与世界最大的鱼共游。在加利福尼亚湾保护水域内由专家指导的负责任体验。",
    },
  },
  buceoCaboPulmo: {
    title: {
      es: "Buceo en Cabo Pulmo",
      en: "Cabo Pulmo Diving",
      fr: "Plongee a Cabo Pulmo",
      zh: "卡波普尔莫潜水",
    },
    description: {
      es: "Bucea en el Parque Nacional Cabo Pulmo, hogar del unico arrecife de coral del Mar de Cortes. Tiburones, tortugas, cardumenes y lobos marinos te esperan.",
      en: "Dive in Cabo Pulmo National Park, home to the only coral reef in the Sea of Cortez. Sharks, turtles, schools of fish and sea lions await.",
      fr: "Plongez dans le parc national de Cabo Pulmo, abritant l'unique recif corallien de la mer de Cortez. Requins, tortues, bancs de poissons et otaries vous attendent.",
      zh: "在卡波普尔莫国家公园潜水，科尔特斯海唯一的珊瑚礁所在地。鲨鱼、海龟、鱼群和海狮等待着您。",
    },
  },
  buceoLaPaz: {
    title: {
      es: "Buceo en La Paz",
      en: "La Paz Diving",
      fr: "Plongee a La Paz",
      zh: "拉巴斯潜水",
    },
    description: {
      es: "Bucea con lobos marinos en Los Islotes, La Paz. Explora cuevas submarinas y formaciones rocosas en el Mar de Cortes con guias certificados y equipo completo.",
      en: "Dive with sea lions at Los Islotes, La Paz. Explore underwater caves and rock formations in the Sea of Cortez with certified guides and full equipment.",
      fr: "Plongez avec les otaries a Los Islotes, La Paz. Explorez les grottes sous-marines et formations rocheuses dans la mer de Cortez avec des guides certifies et un equipement complet.",
      zh: "在拉巴斯洛斯伊斯洛特斯与海狮潜水。与认证导游一起探索科尔特斯海海底洞穴和岩石。",
    },
  },
  rentaVelero: {
    title: {
      es: "Renta de Velero",
      en: "Sailboat Rental",
      fr: "Location de Voilier",
      zh: "帆船租赁",
    },
    description: {
      es: "Renta un velero privado en La Paz, BCS. Navega el Mar de Cortes con capitan, snorkel, kayaks y comida gourmet. Tours romanticos y de aventura disponibles.",
      en: "Rent a private sailboat in La Paz, BCS. Sail the Sea of Cortez with captain, snorkeling, kayaks and gourmet food. Romantic and adventure tours available.",
      fr: "Louez un voilier prive a La Paz, BCS. Naviguez dans la mer de Cortez avec capitaine, snorkeling, kayaks et cuisine gourmande. Tours romantiques et d'aventure disponibles.",
      zh: "在 BCS 拉巴斯租用私人帆船。与船长一起航行科尔特斯海，浮潜、皮划艇和美食。提供浪漫和冒险之旅。",
    },
  },
  rentaYate: {
    title: {
      es: "Renta de Yate",
      en: "Yacht Rental",
      fr: "Location de Yacht",
      zh: "游艇租赁",
    },
    description: {
      es: "Renta un yate de lujo en La Paz, BCS. Chef a bordo, bebidas premium, deportes acuaticos y servicio VIP. La maxima experiencia en el Mar de Cortes.",
      en: "Rent a luxury yacht in La Paz, BCS. Onboard chef, premium drinks, water sports and VIP service. The ultimate Sea of Cortez experience.",
      fr: "Louez un yacht de luxe a La Paz, BCS. Chef a bord, boissons premium, sports nautiques et service VIP. L'experience ultime dans la mer de Cortez.",
      zh: "在 BCS 拉巴斯租用豪华游艇。船上厨师、高级饮品、水上运动和 VIP 服务。终极科尔特斯海体验。",
    },
  },
  safariBahiaMagdalena: {
    title: {
      es: "Safari Bahia Magdalena",
      en: "Magdalena Bay Safari",
      fr: "Safari Bahia Magdalena",
      zh: "马格达莱纳湾野生动物之旅",
    },
    description: {
      es: "Safari marino en Bahia Magdalena, BCS. Nada con lobos marinos, avista marlines y disfruta la corrida de sardinas. Una expedicion unica de noviembre a diciembre.",
      en: "Marine safari in Magdalena Bay, BCS. Swim with sea lions, watch marlins and enjoy the sardine run. A unique November-December expedition.",
      fr: "Safari marin a Bahia Magdalena, BCS. Nagez avec les otaries, observez les marlins et profitez de la course aux sardines. Une expedition unique de novembre a decembre.",
      zh: "BCS 马格达莱纳湾海洋探险。与海狮共游，观赏马林鱼，欣赏沙丁鱼洄游。11 月至 12 月独特探险。",
    },
  },
  safariLaVentana: {
    title: {
      es: "Safari La Ventana",
      en: "La Ventana Safari",
      fr: "Safari La Ventana",
      zh: "拉文塔纳野生动物之旅",
    },
    description: {
      es: "Expedicion marina en La Ventana, BCS. Observa la migracion de mobulas y ballenas con guias expertos. Aventura de medio dia de abril a junio en el Mar de Cortes.",
      en: "Marine expedition in La Ventana, BCS. Watch mobula ray and whale migration with expert guides. Half-day adventure April-June in the Sea of Cortez.",
      fr: "Expedition marine a La Ventana, BCS. Observez la migration des raies mobula et baleines avec des guides experts. Aventure d'une demi-journee d'avril a juin dans la mer de Cortez.",
      zh: "BCS 拉文塔纳海洋探险。与专家导游一起观赏海蝠鲼和鲸鱼迁徙。4 月至 6 月科尔特斯海半日冒险。",
    },
  },
  ballenaGris: {
    title: {
      es: "Expedicion Ballena Gris",
      en: "Gray Whale Expedition",
      fr: "Expedition Baleine Grise",
      zh: "灰鲸探险",
    },
    description: {
      es: "Expedicion para avistar ballenas grises en Baja California Sur. Encuentros cercanos en su santuario natural con guias certificados y embarcaciones seguras.",
      en: "Gray whale watching expedition in Baja California Sur. Close encounters in their natural sanctuary with certified guides and safe boats.",
      fr: "Expedition d'observation des baleines grises en Basse-Californie du Sud. Rencontres rapprochees dans leur sanctuaire naturel avec des guides certifies et des bateaux surs.",
      zh: "下加利福尼亚州灰鲸观赏探险。与认证导游和安全船只在其自然保护区进行近距离接触。",
    },
  },
} as const satisfies Record<string, PageSeo>

export type PageSeoKey = keyof typeof pageSeoMap

export function getPageSeo(key: PageSeoKey, locale: Locale): { title: string; description: string } {
  const entry = pageSeoMap[key]
  return {
    title: entry.title[locale] || entry.title[defaultLocale],
    description: entry.description[locale] || entry.description[defaultLocale],
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
