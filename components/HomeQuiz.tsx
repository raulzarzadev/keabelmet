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

/** ES y EN completos; FR y ZH usan EN mientras se traducen. */
const dicts: Record<Locale, QuizDict> = { es, en, fr: en, zh: en }

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
