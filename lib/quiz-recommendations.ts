import { buildWhatsAppLink } from "@/config/whatsapp"

export interface QuizAnswers {
  canSwim: boolean | null
  snorkelLevel: string | null
  hasDived: boolean | null
  diveCert: string | null
  groupCert: string | null
  activities: string[]
  vibe: string[]
  groupType: string | null
  groupSize: string | null
  season: string | null
}

export interface TourRecommendation {
  id: string
  title: string
  image: string
  price: number
  duration: string
  description: string
  href: string
  season: string[]
  vibe: string[]
}

const allTours: TourRecommendation[] = [
  {
    id: "espiritu-santo",
    title: "Isla Espiritu Santo",
    image: "/lobo-marino-espiritu-santo.jpg",
    price: 1800,
    duration: "6 horas",
    description: "Nada con lobos marinos en aguas cristalinas, snorkel y picnic en playas virgenes.",
    href: "/experiencias/tour-espiritu-santo",
    season: ["invierno", "primavera", "verano", "otono"],
    vibe: ["relajada", "aventurera", "educativa"],
  },
  {
    id: "ballena-gris",
    title: "Ballena Gris · Puerto Chale",
    image: "/ballena-gris-spyhop-new.jpg",
    price: 2800,
    duration: "Día completo",
    description: "Observa ballenas grises en su entorno natural en Baja California Sur.",
    href: "/experiencias/tour-ballena-gris",
    season: ["invierno"],
    vibe: ["relajada", "educativa"],
  },
  {
    id: "tiburon-ballena",
    title: "Tiburon Ballena",
    image: "/tiburon-ballena.jpg",
    price: 1800,
    duration: "2 horas",
    description: "Nada con el pez mas grande del mundo en las aguas de La Paz.",
    href: "/experiencias/tiburon-ballena",
    season: ["invierno", "primavera", "otono"],
    vibe: ["aventurera", "educativa"],
  },
  {
    id: "buceo-cabo-pulmo",
    title: "Scuba Diving Cabo Pulmo",
    image: "/buceo-cabo-pulmo-cardumen.jpg",
    price: 3200,
    duration: "Dia completo",
    description: "Descubre uno de los mejores sitios de buceo en Mexico.",
    href: "/experiencias/buceo-cabo-pulmo",
    season: ["invierno", "primavera", "verano", "otono"],
    vibe: ["aventurera", "deportiva"],
  },
  {
    id: "buceo-la-paz",
    title: "Scuba Diving Isla Espiritu Santo",
    image: "/buceo-la-paz-buzo.jpg",
    price: 3700,
    duration: "Dia completo",
    description: "Buceo con lobos marinos en el Archipielago Espiritu Santo.",
    href: "/experiencias/buceo-la-paz",
    season: ["invierno", "primavera", "verano", "otono"],
    vibe: ["aventurera", "deportiva"],
  },
  {
    id: "safari-bahia-magdalena",
    title: "Safari Bahia Magdalena",
    image: "/images/marlin-bahia-magdalena-hero.jpeg",
    price: 3500,
    duration: "Dia completo",
    description: "Corrida de sardinas, marlines y lobos marinos en mar abierto.",
    href: "/experiencias/safari-bahia-magdalena",
    season: ["otono"],
    vibe: ["aventurera", "deportiva"],
  },
  {
    id: "safari-la-ventana",
    title: "Seafari La Ventana",
    image: "/images/orca-la-ventana-hero.jpeg",
    price: 3000,
    duration: "6 horas",
    description: "Seafari exclusivo en busca de mobulas, delfines, ballenas y orcas en el Golfo de California.",
    href: "/experiencias/safari-la-ventana",
    season: ["invierno", "primavera", "verano", "otono"],
    vibe: ["aventurera", "educativa"],
  },
  {
    id: "scuba-discovery",
    title: "Scuba Discovery desde Playa",
    image: "/snorkeling-coral-reef.jpg",
    price: 1500,
    duration: "Medio dia",
    description: "Tu primera respiracion bajo el agua, sin experiencia previa. Max. 6 m.",
    href: "/experiencias/scuba-discovery",
    season: ["invierno", "primavera", "verano", "otono"],
    vibe: ["aventurera", "educativa"],
  },
  {
    id: "surf-camp",
    title: "Surf Camp La Paz",
    image: "/images/surf-camp-hero.jpeg",
    price: 7500,
    duration: "6 dias",
    description: "Campamento de surf con fisioterapeuta y video-analisis diario.",
    href: "/surf-camp",
    season: ["invierno", "primavera", "verano", "otono"],
    vibe: ["deportiva", "aventurera"],
  },
]

export function getRecommendations(answers: QuizAnswers): TourRecommendation[] {
  const { canSwim, hasDived, diveCert, activities, groupType, groupSize } = answers
  let results: TourRecommendation[] = []

  if (!canSwim) {
    // Can't swim: boat-based activities only
    results = allTours.filter((t) => ["ballena-gris"].includes(t.id))
  } else {
    // Can swim
    const hasDiveAccess = hasDived || (diveCert && diveCert !== "No")

    // Start with swim-friendly tours
    results = allTours.filter((t) =>
      ["espiritu-santo", "safari-la-ventana", "tiburon-ballena", "safari-bahia-magdalena", "ballena-gris"].includes(t.id)
    )

    // Add diving tours if applicable; beginners get Scuba Discovery instead
    if (hasDiveAccess) {
      const diveTours = allTours.filter((t) =>
        ["buceo-cabo-pulmo", "buceo-la-paz"].includes(t.id)
      )
      results = [...diveTours, ...results]
    } else if (activities.includes("buceo")) {
      const discovery = allTours.find((t) => t.id === "scuba-discovery")
      if (discovery) results = [discovery, ...results]
    }

    // Add surf camp if interested
    if (activities.includes("surf")) {
      const surfTour = allTours.find((t) => t.id === "surf-camp")
      if (surfTour) results.push(surfTour)
    }

  }

  // Group modifiers: prioritize certain tours
  if (groupType === "Familia" || groupType === "Family" || groupType === "En famille" || groupType === "家庭") {
    const familyIds = ["espiritu-santo", "ballena-gris", "tiburon-ballena"]
    results.sort((a, b) => {
      const aFamily = familyIds.includes(a.id) ? 0 : 1
      const bFamily = familyIds.includes(b.id) ? 0 : 1
      return aFamily - bFamily
    })
  }

  if (groupType === "Pareja" || groupType === "Couple" || groupType === "En couple" || groupType === "情侣") {
    const coupleIds = ["safari-la-ventana", "espiritu-santo"]
    results.sort((a, b) => {
      const aCouple = coupleIds.includes(a.id) ? 0 : 1
      const bCouple = coupleIds.includes(b.id) ? 0 : 1
      return aCouple - bCouple
    })
  }

  const isLargeGroup = groupSize === "5-6" || groupSize === "7+"
  if (isLargeGroup) {
    const largeIds = ["espiritu-santo"]
    results.sort((a, b) => {
      const aLarge = largeIds.includes(a.id) ? 0 : 1
      const bLarge = largeIds.includes(b.id) ? 0 : 1
      return aLarge - bLarge
    })
  }

  // Filter by selected activities if any
  if (activities.length > 0) {
    const activityTourMap: Record<string, string[]> = {
      snorkel: ["espiritu-santo", "safari-la-ventana", "tiburon-ballena", "safari-bahia-magdalena"],
      buceo: ["buceo-cabo-pulmo", "buceo-la-paz", "scuba-discovery"],
      surf: ["surf-camp"],
      avistamiento: ["ballena-gris", "safari-la-ventana", "safari-bahia-magdalena"],
      hikes: ["espiritu-santo"],
    }
    const relevantIds = new Set(activities.flatMap((a) => activityTourMap[a] || []))
    if (relevantIds.size > 0) {
      const filtered = results.filter((t) => relevantIds.has(t.id))
      if (filtered.length > 0) results = filtered
    }
  }

  // Filter by selected season
  if (answers.season) {
    const seasonFiltered = results.filter((t) => t.season.includes(answers.season!))
    if (seasonFiltered.length > 0) results = seasonFiltered
  }

  // Filter by vibe preference
  if (answers.vibe.length > 0) {
    const vibeFiltered = results.filter((t) =>
      answers.vibe.some((v) => t.vibe.includes(v))
    )
    if (vibeFiltered.length > 0) results = vibeFiltered
  }

  // Group cert affects dive recommendations
  if (answers.groupCert) {
    const nobodyDives = answers.groupCert === "Nadie" || answers.groupCert === "Nobody" || answers.groupCert === "Personne" || answers.groupCert === "没有人"
    if (nobodyDives) {
      results = results.filter((t) => !["buceo-cabo-pulmo", "buceo-la-paz"].includes(t.id))
    }
  }

  // Deduplicate and limit to 3
  const seen = new Set<string>()
  const unique = results.filter((t) => {
    if (seen.has(t.id)) return false
    seen.add(t.id)
    return true
  })

  return unique.slice(0, 3)
}

export function buildWhatsAppUrl(answers: QuizAnswers, recommendations: TourRecommendation[], locale: string): string {
  const labels: Record<string, Record<string, string>> = {
    es: { swim: "Nadar", snorkel: "Snorkel", dive: "Buceo", cert: "Certificado", activities: "Actividades", group: "Grupo", size: "Personas", recommended: "Tours recomendados", greeting: "Hola! Hice el quiz de Keabelmet y estos son mis datos:", closing: "Me gustaria mas informacion!", season: "Temporada", groupCert: "Certificado grupo", vibe: "Tipo experiencia" },
    en: { swim: "Swim", snorkel: "Snorkel", dive: "Diving", cert: "Certificate", activities: "Activities", group: "Group", size: "People", recommended: "Recommended tours", greeting: "Hi! I took the Keabelmet quiz and here are my details:", closing: "I would like more information!", season: "Season", groupCert: "Group cert", vibe: "Experience type" },
    fr: { swim: "Nager", snorkel: "Snorkeling", dive: "Plongee", cert: "Certificat", activities: "Activites", group: "Groupe", size: "Personnes", recommended: "Tours recommandes", greeting: "Bonjour ! J'ai fait le quiz Keabelmet et voici mes infos :", closing: "Je souhaiterais plus d'informations !", season: "Saison", groupCert: "Certificat groupe", vibe: "Type experience" },
    zh: { swim: "游泳", snorkel: "浮潜", dive: "潜水", cert: "证书", activities: "活动", group: "团体", size: "人数", recommended: "推荐行程", greeting: "你好！我做了 Keabelmet 测验，以下是我的信息：", closing: "我想了解更多信息！", season: "季节", groupCert: "团体证书", vibe: "体验类型" },
  }

  const l = labels[locale] || labels.es
  const lines = [l.greeting]

  lines.push(`- ${l.swim}: ${answers.canSwim ? "Si" : "No"}`)
  if (answers.snorkelLevel) lines.push(`- ${l.snorkel}: ${answers.snorkelLevel}`)
  if (answers.hasDived !== null) lines.push(`- ${l.dive}: ${answers.hasDived ? "Si" : "No"}`)
  if (answers.diveCert) lines.push(`- ${l.cert}: ${answers.diveCert}`)
  if (answers.groupCert) lines.push(`- ${l.groupCert}: ${answers.groupCert}`)
  if (answers.vibe.length > 0) lines.push(`- ${l.vibe}: ${answers.vibe.join(", ")}`)
  if (answers.season) lines.push(`- ${l.season}: ${answers.season}`)
  if (answers.activities.length > 0) lines.push(`- ${l.activities}: ${answers.activities.join(", ")}`)
  if (answers.groupType) lines.push(`- ${l.group}: ${answers.groupType}`)
  if (answers.groupSize) lines.push(`- ${l.size}: ${answers.groupSize}`)
  lines.push(`- ${l.recommended}: ${recommendations.map((r) => r.title).join(", ")}`)
  lines.push("")
  lines.push(l.closing)

  return buildWhatsAppLink(lines.join("\n"))
}
