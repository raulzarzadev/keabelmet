"use client"

import { useState } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"

interface QuizPrice {
  label?: string
  mxn: number
}

interface QuizTourBase {
  id: string
  tags: string[]
  months: number[]
  peak: number[]
  prices: QuizPrice[]
  per?: "person" | "none"
  view: string
}

interface QuizTourText {
  name: string
  reason: string
  seasonNotes?: string
  waText: string
}

const tourBase: QuizTourBase[] = [
  {
    id: "la-ventana",
    tags: ["surface", "wildlife_watch", "adrenaline", "mobulas_dolphins", "half_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [4, 5, 6],
    prices: [{ mxn: 3000 }],
    per: "person",
    view: "/experiencias/safari-la-ventana",
  },
  {
    id: "bahia-magdalena",
    tags: ["surface", "wildlife_watch", "adrenaline", "full_day"],
    months: [11, 12],
    peak: [11, 12],
    prices: [{ mxn: 3500 }],
    per: "person",
    view: "/experiencias/safari-bahia-magdalena",
  },
  {
    id: "ballena-gris",
    tags: ["whales", "surface", "wildlife_watch", "full_day"],
    months: [1, 2, 3],
    peak: [2, 3],
    prices: [{ mxn: 2800 }],
    per: "person",
    view: "/experiencias/tour-ballena-gris",
  },
  {
    id: "tiburon-ballena",
    tags: ["whale_shark", "surface", "half_day"],
    months: [11, 12, 1, 2, 3],
    peak: [12, 1, 2],
    prices: [{ mxn: 1800 }],
    per: "person",
    view: "/experiencias/tiburon-ballena",
  },
  {
    id: "espiritu-santo-dia",
    tags: ["sea_lions", "surface", "wildlife_watch", "full_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [6, 8, 12, 1],
    prices: [{ mxn: 1800 }],
    per: "person",
    view: "/experiencias/tour-espiritu-santo",
  },
  {
    id: "cabo-pulmo",
    tags: ["certified_diver", "beginner_diver", "reef_sharks", "full_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [7, 8, 9, 10, 11, 12],
    prices: [
      { label: "certified", mxn: 3200 },
      { label: "discovery", mxn: 3800 },
    ],
    per: "none",
    view: "/experiencias/buceo-cabo-pulmo",
  },
  {
    id: "espiritu-santo-buceo",
    tags: ["certified_diver", "beginner_diver", "sea_lions", "full_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [5, 6, 7, 8, 9, 10, 11, 12],
    prices: [
      { label: "certified", mxn: 3700 },
      { label: "discovery", mxn: 4200 },
    ],
    per: "none",
    view: "/experiencias/buceo-la-paz",
  },
  {
    id: "scuba-discovery",
    tags: ["beginner_diver", "half_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [5, 6, 7, 8, 9, 10, 11, 12],
    prices: [{ mxn: 1500 }],
    per: "person",
    view: "/experiencias/scuba-discovery",
  },
]

interface QuizDict {
  badge: string
  kicker: string
  title: string
  sub: string
  note: string
  q1: string
  q1opts: { value: string; label: string; subtle?: boolean }[]
  q2: string
  q2opts: { value: string; label: string; subtle?: boolean }[]
  q3: string
  q3opts: { value: string; label: string; subtle?: boolean }[]
  q4: string
  months: string[]
  back: string
  eyebrow: string
  view: string
  book: string
  alts: string
  reset: string
  perPerson: string
  certified: string
  discovery: string
  tours: Record<string, QuizTourText>
}

const es: QuizDict = {
  badge: "¿No sabes qué elegir?",
  kicker: "Encuentra tu expedición",
  title: "¿Estás en La Paz y no sabes qué tour tomar?",
  sub: "Responde 4 preguntas rápidas — incluyendo tu mes de viaje — y te decimos qué expedición te conviene más según la temporada real de cada una.",
  note: "Toma 30 segundos. Cero compromiso.",
  q1: "1. ¿Ya sabes bucear?",
  q1opts: [
    { value: "beginner_diver", label: "Nunca he buceado y no sé qué esperar" },
    { value: "surface", label: "No buceo, prefiero quedarme en superficie / snorkel" },
    { value: "certified_diver", label: "Sí, tengo certificación de buceo" },
    { value: "wildlife_watch", label: "No me interesa el agua, quiero ver fauna desde la lancha" },
    { value: "", label: "No estoy seguro/a, sorpréndeme", subtle: true },
  ],
  q2: "2. ¿Qué te emociona más ver?",
  q2opts: [
    { value: "whales", label: "Ballenas grises (madres y crías, muy de cerca)" },
    { value: "sea_lions", label: "Lobos marinos jugando junto a ti" },
    { value: "reef_sharks", label: "Arrecife de coral, tiburones y cardúmenes" },
    { value: "adrenaline", label: "Adrenalina pura: marlines cazando sardinas" },
    { value: "mobulas_dolphins", label: "Móbulas volando y delfines escoltando la lancha" },
    { value: "whale_shark", label: "Nadar junto al pez más grande del mundo" },
    { value: "", label: "No estoy seguro/a, sorpréndeme", subtle: true },
  ],
  q3: "3. ¿Cuánto tiempo tienes disponible?",
  q3opts: [
    { value: "half_day", label: "Medio día (mañana o tarde)" },
    { value: "full_day", label: "Día completo" },
    { value: "", label: "Cualquiera, me adapto", subtle: true },
  ],
  q4: "4. ¿En qué mes viajas?",
  months: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  back: "← Regresar",
  eyebrow: "Tu expedición ideal",
  view: "Ver expedición",
  book: "Reservar por WhatsApp",
  alts: "También te podría gustar",
  reset: "↺ Volver a empezar",
  perPerson: "por persona",
  certified: "Certificado",
  discovery: "Discovery",
  tours: {
    "la-ventana": {
      name: "Ocean Safari La Ventana",
      reason: "Media jornada en lancha con móbulas saltando y avistamientos sorpresa de ballenas y delfines — ideal si no buceas y quieres adrenalina en poco tiempo.",
      waText: "Hola! quiero reservar Ocean Safari La Ventana",
    },
    "bahia-magdalena": {
      name: "Safari Bahía Magdalena",
      reason: "Un día completo en mar abierto viendo el Sardine Run: miles de sardinas, marlines cazando y ballenas alimentándose. Solo pasa dos meses al año.",
      waText: "Hola! quiero reservar Safari Bahía Magdalena",
    },
    "ballena-gris": {
      name: "Ballena Gris · Puerto Chale",
      reason: "Encuentros cercanos con madres y crías de ballena gris en sus aguas de crianza — de los avistamientos más emotivos de Baja California Sur.",
      waText: "Hola! quiero reservar Ballena Gris Puerto Chale",
    },
    "tiburon-ballena": {
      name: "Tiburón Ballena",
      reason: "Snorkel de medio día para nadar junto al pez más grande del mundo — perfecto si tienes poco tiempo y quieres algo inolvidable.",
      waText: "Hola! quiero reservar Tiburón Ballena",
    },
    "espiritu-santo-dia": {
      name: "Tour Snorkel Isla Espíritu Santo",
      reason: "Snorkel todo el año con una de las colonias de lobos marinos más grandes del Golfo, playas vírgenes y picnic incluido.",
      seasonNotes: "De jun a ago los lobeznos recién nacidos restringen el nado — se observa sin entrar al agua por su seguridad.",
      waText: "Hola! quiero reservar Isla Espíritu Santo",
    },
    "cabo-pulmo": {
      name: "Scuba Diving Cabo Pulmo",
      reason: "El único arrecife de coral vivo del Golfo de California — 25,000 años de coral, tiburones toro y cardúmenes masivos, todo el año.",
      waText: "Hola! quiero reservar Buceo en Cabo Pulmo",
    },
    "espiritu-santo-buceo": {
      name: "Scuba Diving Isla Espíritu Santo",
      reason: "Buceo junto a lobos marinos curiosos y barcos hundidos en un Patrimonio UNESCO — la combinación de buceo y fauna más juguetona de La Paz.",
      waText: "Hola! quiero reservar Buceo en Isla Espíritu Santo",
    },
    "scuba-discovery": {
      name: "Scuba Discovery desde Playa",
      reason: "Tu primera vez bajo el agua, sin certificación, máximo 6 metros de profundidad y un instructor todo el tiempo contigo.",
      waText: "Hola! quiero reservar Scuba Discovery desde Playa",
    },
  },
}

const en: QuizDict = {
  badge: "Not sure what to pick?",
  kicker: "Find your expedition",
  title: "In La Paz and not sure which tour to take?",
  sub: "Answer 4 quick questions — including your travel month — and we'll tell you which expedition suits you best based on each one's real season.",
  note: "Takes 30 seconds. Zero commitment.",
  q1: "1. Do you know how to dive?",
  q1opts: [
    { value: "beginner_diver", label: "I've never dived and don't know what to expect" },
    { value: "surface", label: "I don't dive, I prefer staying at the surface / snorkeling" },
    { value: "certified_diver", label: "Yes, I'm a certified diver" },
    { value: "wildlife_watch", label: "Not into the water — I want to watch wildlife from the boat" },
    { value: "", label: "Not sure, surprise me", subtle: true },
  ],
  q2: "2. What excites you most?",
  q2opts: [
    { value: "whales", label: "Gray whales (mothers and calves, up close)" },
    { value: "sea_lions", label: "Sea lions playing right next to you" },
    { value: "reef_sharks", label: "Coral reef, sharks and schools of fish" },
    { value: "adrenaline", label: "Pure adrenaline: marlin hunting sardines" },
    { value: "mobulas_dolphins", label: "Flying mobulas and dolphins escorting the boat" },
    { value: "whale_shark", label: "Swimming next to the biggest fish in the world" },
    { value: "", label: "Not sure, surprise me", subtle: true },
  ],
  q3: "3. How much time do you have?",
  q3opts: [
    { value: "half_day", label: "Half day (morning or afternoon)" },
    { value: "full_day", label: "Full day" },
    { value: "", label: "Either works for me", subtle: true },
  ],
  q4: "4. Which month are you traveling?",
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  back: "← Back",
  eyebrow: "Your ideal expedition",
  view: "View expedition",
  book: "Book on WhatsApp",
  alts: "You might also like",
  reset: "↺ Start over",
  perPerson: "per person",
  certified: "Certified",
  discovery: "Discovery",
  tours: {
    "la-ventana": {
      name: "Ocean Safari La Ventana",
      reason: "Half a day on the boat with jumping mobulas and surprise sightings of whales and dolphins — ideal if you don't dive and want adrenaline in little time.",
      waText: "Hi! I want to book the Ocean Safari La Ventana",
    },
    "bahia-magdalena": {
      name: "Magdalena Bay Safari",
      reason: "A full day in open water watching the Sardine Run: thousands of sardines, hunting marlin and feeding whales. It only happens two months a year.",
      waText: "Hi! I want to book the Magdalena Bay Safari",
    },
    "ballena-gris": {
      name: "Gray Whale · Puerto Chale",
      reason: "Close encounters with gray whale mothers and calves in their nursing waters — among the most moving sightings in Baja California Sur.",
      waText: "Hi! I want to book Gray Whale Puerto Chale",
    },
    "tiburon-ballena": {
      name: "Whale Shark",
      reason: "A half-day snorkel to swim next to the biggest fish in the world — perfect if you're short on time and want something unforgettable.",
      waText: "Hi! I want to book the Whale Shark tour",
    },
    "espiritu-santo-dia": {
      name: "Snorkel Tour Espiritu Santo Island",
      reason: "Year-round snorkeling with one of the largest sea lion colonies in the Gulf, pristine beaches and picnic included.",
      seasonNotes: "From Jun to Aug newborn pups restrict swimming — observation is done from the boat for their safety.",
      waText: "Hi! I want to book Espiritu Santo Island",
    },
    "cabo-pulmo": {
      name: "Scuba Diving Cabo Pulmo",
      reason: "The only living coral reef in the Gulf of California — 25,000 years of coral, bull sharks and massive schools of fish, year-round.",
      waText: "Hi! I want to book Diving in Cabo Pulmo",
    },
    "espiritu-santo-buceo": {
      name: "Scuba Diving Espiritu Santo Island",
      reason: "Diving alongside curious sea lions and shipwrecks in a UNESCO World Heritage site — the most playful combination of diving and wildlife in La Paz.",
      waText: "Hi! I want to book Diving at Espiritu Santo Island",
    },
    "scuba-discovery": {
      name: "Scuba Discovery from the Beach",
      reason: "Your first time underwater, no certification needed, max 6 meters deep with an instructor by your side the whole time.",
      waText: "Hi! I want to book Scuba Discovery from the Beach",
    },
  },
}

const fr: QuizDict = {
  badge: "Vous ne savez pas quoi choisir ?",
  kicker: "Trouvez votre expédition",
  title: "À La Paz et vous ne savez pas quel tour choisir ?",
  sub: "Répondez à 4 questions rapides — dont votre mois de voyage — et nous vous dirons quelle expédition vous convient le mieux selon la vraie saison de chacune.",
  note: "Ça prend 30 secondes. Aucun engagement.",
  q1: "1. Savez-vous plonger ?",
  q1opts: [
    { value: "beginner_diver", label: "Je n'ai jamais plongé et je ne sais pas à quoi m'attendre" },
    { value: "surface", label: "Je ne plonge pas, je préfère rester en surface / snorkeling" },
    { value: "certified_diver", label: "Oui, je suis plongeur certifié" },
    { value: "wildlife_watch", label: "L'eau ne m'intéresse pas — je veux observer la faune depuis le bateau" },
    { value: "", label: "Pas sûr(e), surprenez-moi", subtle: true },
  ],
  q2: "2. Qu'est-ce qui vous enthousiasme le plus ?",
  q2opts: [
    { value: "whales", label: "Les baleines grises (mères et baleineaux, de très près)" },
    { value: "sea_lions", label: "Les otaries qui jouent juste à côté de vous" },
    { value: "reef_sharks", label: "Le récif corallien, les requins et les bancs de poissons" },
    { value: "adrenaline", label: "L'adrénaline pure : les marlins qui chassent les sardines" },
    { value: "mobulas_dolphins", label: "Les mobules qui volent et les dauphins qui escortent le bateau" },
    { value: "whale_shark", label: "Nager à côté du plus grand poisson du monde" },
    { value: "", label: "Pas sûr(e), surprenez-moi", subtle: true },
  ],
  q3: "3. De combien de temps disposez-vous ?",
  q3opts: [
    { value: "half_day", label: "Une demi-journée (matin ou après-midi)" },
    { value: "full_day", label: "Une journée complète" },
    { value: "", label: "Peu importe, je m'adapte", subtle: true },
  ],
  q4: "4. En quel mois voyagez-vous ?",
  months: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
  back: "← Retour",
  eyebrow: "Votre expédition idéale",
  view: "Voir l'expédition",
  book: "Réserver sur WhatsApp",
  alts: "Vous pourriez aussi aimer",
  reset: "↺ Recommencer",
  perPerson: "par personne",
  certified: "Certifié",
  discovery: "Baptême",
  tours: {
    "la-ventana": {
      name: "Ocean Safari La Ventana",
      reason: "Une demi-journée en bateau avec des mobules qui sautent et des observations surprises de baleines et de dauphins — idéal si vous ne plongez pas et voulez de l'adrénaline en peu de temps.",
      waText: "Bonjour ! Je veux réserver Ocean Safari La Ventana",
    },
    "bahia-magdalena": {
      name: "Safari Bahía Magdalena",
      reason: "Une journée complète en mer ouverte pour observer le Sardine Run : des milliers de sardines, des marlins qui chassent et des baleines qui se nourrissent. Cela n'arrive que deux mois par an.",
      waText: "Bonjour ! Je veux réserver le Safari Bahía Magdalena",
    },
    "ballena-gris": {
      name: "Baleine Grise · Puerto Chale",
      reason: "Des rencontres rapprochées avec des mères et des baleineaux gris dans leurs eaux de reproduction — parmi les observations les plus émouvantes de Basse-Californie du Sud.",
      waText: "Bonjour ! Je veux réserver Baleine Grise Puerto Chale",
    },
    "tiburon-ballena": {
      name: "Requin-Baleine",
      reason: "Une demi-journée de snorkeling pour nager à côté du plus grand poisson du monde — parfait si vous manquez de temps et voulez quelque chose d'inoubliable.",
      waText: "Bonjour ! Je veux réserver le tour Requin-Baleine",
    },
    "espiritu-santo-dia": {
      name: "Tour Snorkel Île Espíritu Santo",
      reason: "Du snorkeling toute l'année avec l'une des plus grandes colonies d'otaries du Golfe, des plages vierges et un pique-nique inclus.",
      seasonNotes: "De juin à août, les nouveau-nés limitent la baignade — l'observation se fait depuis le bateau pour leur sécurité.",
      waText: "Bonjour ! Je veux réserver Île Espíritu Santo",
    },
    "cabo-pulmo": {
      name: "Plongée Cabo Pulmo",
      reason: "Le seul récif corallien vivant du golfe de Californie — 25 000 ans de corail, des requins bouledogues et d'immenses bancs de poissons, toute l'année.",
      waText: "Bonjour ! Je veux réserver la plongée à Cabo Pulmo",
    },
    "espiritu-santo-buceo": {
      name: "Plongée Île Espíritu Santo",
      reason: "Plonger aux côtés d'otaries curieuses et d'épaves dans un site du patrimoine mondial de l'UNESCO — la combinaison de plongée et de faune la plus ludique de La Paz.",
      waText: "Bonjour ! Je veux réserver la plongée à l'Île Espíritu Santo",
    },
    "scuba-discovery": {
      name: "Baptême de Plongée depuis la Plage",
      reason: "Votre première fois sous l'eau, sans certification, à 6 mètres de profondeur maximum, avec un instructeur à vos côtés en permanence.",
      waText: "Bonjour ! Je veux réserver le Baptême de Plongée depuis la Plage",
    },
  },
}

const zh: QuizDict = {
  badge: "不知道该选哪个？",
  kicker: "找到你的探险",
  title: "在拉巴斯，不知道该参加哪个行程？",
  sub: "回答4个快速问题——包括你的出行月份——我们会根据每个行程的真实季节，告诉你最适合你的探险。",
  note: "只需30秒。毫无约束。",
  q1: "1. 你会潜水吗？",
  q1opts: [
    { value: "beginner_diver", label: "我从未潜过水，也不知道会怎样" },
    { value: "surface", label: "我不潜水，更喜欢待在水面 / 浮潜" },
    { value: "certified_diver", label: "会，我有潜水证书" },
    { value: "wildlife_watch", label: "我对下水没兴趣，想在船上观赏动物" },
    { value: "", label: "不确定，给我个惊喜", subtle: true },
  ],
  q2: "2. 你最想看到什么？",
  q2opts: [
    { value: "whales", label: "灰鲸（母鲸与幼鲸，近距离）" },
    { value: "sea_lions", label: "在你身边嬉戏的海狮" },
    { value: "reef_sharks", label: "珊瑚礁、鲨鱼和鱼群" },
    { value: "adrenaline", label: "纯粹的刺激：马林鱼捕猎沙丁鱼" },
    { value: "mobulas_dolphins", label: "飞翔的蝠鲼和护送船只的海豚" },
    { value: "whale_shark", label: "与世界上最大的鱼同游" },
    { value: "", label: "不确定，给我个惊喜", subtle: true },
  ],
  q3: "3. 你有多少时间？",
  q3opts: [
    { value: "half_day", label: "半天（上午或下午）" },
    { value: "full_day", label: "一整天" },
    { value: "", label: "都行，我很灵活", subtle: true },
  ],
  q4: "4. 你在哪个月出行？",
  months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  back: "← 返回",
  eyebrow: "你的理想探险",
  view: "查看行程",
  book: "通过 WhatsApp 预订",
  alts: "你可能也会喜欢",
  reset: "↺ 重新开始",
  perPerson: "每人",
  certified: "持证",
  discovery: "体验潜水",
  tours: {
    "la-ventana": {
      name: "拉文塔纳海洋探险",
      reason: "半天的乘船之旅，蝠鲼跃起、鲸鱼与海豚不期而遇——如果你不潜水又想在短时间里体验刺激，这是理想之选。",
      waText: "你好！我想预订拉文塔纳海洋探险",
    },
    "bahia-magdalena": {
      name: "马格达莱纳湾探险",
      reason: "在开阔海域度过一整天，观赏沙丁鱼洄游：成千上万的沙丁鱼、捕猎的马林鱼和觅食的鲸鱼。一年仅两个月。",
      waText: "你好！我想预订马格达莱纳湾探险",
    },
    "ballena-gris": {
      name: "灰鲸 · 查莱港",
      reason: "在灰鲸的育幼海域近距离接触母鲸与幼鲸——下加利福尼亚州最动人的观赏体验之一。",
      waText: "你好！我想预订灰鲸查莱港",
    },
    "tiburon-ballena": {
      name: "鲸鲨",
      reason: "半天浮潜，与世界上最大的鱼同游——如果你时间有限又想要难忘的体验，非常合适。",
      waText: "你好！我想预订鲸鲨行程",
    },
    "espiritu-santo-dia": {
      name: "圣灵岛浮潜之旅",
      reason: "全年浮潜，畅游海湾最大的海狮群之一，含原始海滩与野餐。",
      seasonNotes: "6月至8月，新生幼崽期间限制下水——为了它们的安全，将在船上观赏。",
      waText: "你好！我想预订圣灵岛",
    },
    "cabo-pulmo": {
      name: "卡波普尔莫潜水",
      reason: "加利福尼亚湾唯一的活珊瑚礁——25,000年的珊瑚、公牛鲨和庞大的鱼群，全年开放。",
      waText: "你好！我想预订卡波普尔莫潜水",
    },
    "espiritu-santo-buceo": {
      name: "圣灵岛潜水",
      reason: "在联合国教科文组织世界遗产地，与好奇的海狮和沉船一同潜水——拉巴斯最有趣的潜水与野生动物组合。",
      waText: "你好！我想预订圣灵岛潜水",
    },
    "scuba-discovery": {
      name: "海滩体验潜水",
      reason: "你的首次水下体验，无需证书，最深6米，全程有教练陪伴。",
      waText: "你好！我想预订海滩体验潜水",
    },
  },
}

/** ES, EN, FR y ZH nativos. */
const dicts: Record<Locale, QuizDict> = { es, en, fr, zh }

function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

function TourPrice({ tour, t }: { tour: QuizTourBase; t: QuizDict }) {
  if (tour.prices.length === 1) {
    return (
      <>
        <Price amount={tour.prices[0].mxn} /> {tour.per === "person" ? t.perPerson : ""}
      </>
    )
  }
  return (
    <>
      {tour.prices.map((p, i) => (
        <span key={i}>
          {i > 0 && " · "}
          {p.label === "certified" ? t.certified : t.discovery} <Price amount={p.mxn} />
        </span>
      ))}
    </>
  )
}

export default function HomeQuiz({ locale = defaultLocale }: { locale?: Locale }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ q1?: string; q2?: string; q3?: string; month?: number | null }>({})
  const [result, setResult] = useState<{ best: QuizTourBase; alts: QuizTourBase[] } | null>(null)

  const t = dicts[locale] || dicts.es
  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

  function showResult(finalAnswers: typeof answers) {
    const userTags = [finalAnswers.q1, finalAnswers.q2, finalAnswers.q3].filter(Boolean) as string[]
    const month = finalAnswers.month

    const candidates = tourBase.map((tour) => {
      let score = 0
      userTags.forEach((tag) => {
        if (tour.tags.includes(tag)) score += 2
      })
      if (month) {
        if (tour.months.includes(month)) score += 3
        else score -= 4
        if (tour.peak.includes(month)) score += 2
      }
      return { tour, score }
    })

    candidates.sort((a, b) => b.score - a.score)
    setResult({ best: candidates[0].tour, alts: candidates.slice(1, 3).map((c) => c.tour) })
  }

  function answer(currentStep: number, value: string) {
    const next = { ...answers }
    if (currentStep === 1) next.q1 = value
    if (currentStep === 2) next.q2 = value
    if (currentStep === 3) next.q3 = value
    if (currentStep === 4) next.month = value ? parseInt(value) : null
    setAnswers(next)

    if (currentStep < 4) setStep(currentStep + 1)
    else showResult(next)
  }

  function reset() {
    setAnswers({})
    setResult(null)
    setStep(1)
  }

  const dotsDone = result ? 4 : step - 1
  const bestText = result ? t.tours[result.best.id] : null

  return (
    <section id="quiz" className="quizsec">
      <div className="quiz-box">
        <div className="quiz-intro">
          <span className="quiz-badge">{t.badge}</span>
          <span className="kicker">{t.kicker}</span>
          <h2>{t.title}</h2>
          <p>{t.sub}</p>
          <p>{t.note}</p>
        </div>

        <div className="quiz-panel">
          <div className="quiz-progress">
            {[1, 2, 3, 4].map((d) => (
              <div key={d} className={`quiz-dot${d <= dotsDone ? " done" : ""}`}></div>
            ))}
          </div>

          {!result && step === 1 && (
            <div className="quiz-step active">
              <h3>{t.q1}</h3>
              <div className="quiz-options">
                {t.q1opts.map((o) => (
                  <button key={o.label} className={`quiz-opt${o.subtle ? " subtle" : ""}`} onClick={() => answer(1, o.value)}>{o.label}</button>
                ))}
              </div>
            </div>
          )}

          {!result && step === 2 && (
            <div className="quiz-step active">
              <h3>{t.q2}</h3>
              <div className="quiz-options">
                {t.q2opts.map((o) => (
                  <button key={o.label} className={`quiz-opt${o.subtle ? " subtle" : ""}`} onClick={() => answer(2, o.value)}>{o.label}</button>
                ))}
              </div>
              <div className="quiz-back" onClick={() => setStep(1)}>{t.back}</div>
            </div>
          )}

          {!result && step === 3 && (
            <div className="quiz-step active">
              <h3>{t.q3}</h3>
              <div className="quiz-options">
                {t.q3opts.map((o) => (
                  <button key={o.label} className={`quiz-opt${o.subtle ? " subtle" : ""}`} onClick={() => answer(3, o.value)}>{o.label}</button>
                ))}
              </div>
              <div className="quiz-back" onClick={() => setStep(2)}>{t.back}</div>
            </div>
          )}

          {!result && step === 4 && (
            <div className="quiz-step active">
              <h3>{t.q4}</h3>
              <div className="quiz-months">
                {t.months.map((m, i) => (
                  <button key={m} className="quiz-month" onClick={() => answer(4, String(i + 1))}>{m}</button>
                ))}
              </div>
              <div className="quiz-back" onClick={() => setStep(3)}>{t.back}</div>
            </div>
          )}

          {result && bestText && (
            <div className="quiz-result active">
              <span className="quiz-eyebrow">{t.eyebrow}</span>
              <h3>{bestText.name}</h3>
              <p className="reason">
                {bestText.reason}
                {bestText.seasonNotes ? ` ${bestText.seasonNotes}` : ""}
              </p>
              <div className="quiz-result-price"><TourPrice tour={result.best} t={t} /></div>
              <div className="quiz-result-ctas">
                <Link href={lh(result.best.view)} className="btn btn-solid">{t.view}</Link>
                <a href={waLink(bestText.waText)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">{t.book}</a>
              </div>
              <div className="quiz-alts">
                <span>{t.alts}</span>
                {result.alts.map((a) => (
                  <div key={a.id} className="quiz-alt-item">
                    <b>{t.tours[a.id].name}</b> — <TourPrice tour={a} t={t} />
                  </div>
                ))}
              </div>
              <div className="quiz-reset" onClick={reset}>{t.reset}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
