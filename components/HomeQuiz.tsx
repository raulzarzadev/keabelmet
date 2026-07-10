"use client"

import { useState } from "react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"

interface QuizTour {
  id: string
  name: string
  tags: string[]
  months: number[]
  peak: number[]
  price: string
  reason: string
  seasonNotes?: string
  waText: string
  view: string
}

const quizTours: QuizTour[] = [
  {
    id: "la-ventana",
    name: "Safari La Ventana",
    tags: ["surface", "wildlife_watch", "adrenaline", "mobulas_dolphins", "half_day"],
    months: [4, 5, 6],
    peak: [5],
    price: "$3,000 MXN por persona",
    reason: "Media jornada en lancha con móbulas saltando y avistamientos sorpresa de ballenas y delfines — ideal si no buceas y quieres adrenalina en poco tiempo.",
    waText: "Hola! quiero reservar Safari La Ventana",
    view: "/experiencias/safari-la-ventana",
  },
  {
    id: "bahia-magdalena",
    name: "Safari Bahía Magdalena",
    tags: ["surface", "wildlife_watch", "adrenaline", "full_day"],
    months: [11, 12],
    peak: [11, 12],
    price: "$3,500 MXN por persona",
    reason: "Un día completo en mar abierto viendo el Sardine Run: miles de sardinas, marlines cazando y ballenas alimentándose. Solo pasa dos meses al año.",
    waText: "Hola! quiero reservar Safari Bahía Magdalena",
    view: "/experiencias/safari-bahia-magdalena",
  },
  {
    id: "ballena-gris",
    name: "Ballena Gris · Puerto Chale",
    tags: ["whales", "surface", "wildlife_watch", "full_day"],
    months: [1, 2, 3],
    peak: [2],
    price: "$2,800 MXN por persona",
    reason: "Encuentros cercanos con madres y crías de ballena gris en sus aguas de crianza — de los avistamientos más emotivos de Baja California Sur.",
    waText: "Hola! quiero reservar Ballena Gris Puerto Chale",
    view: "/experiencias/tour-ballena-gris",
  },
  {
    id: "tiburon-ballena",
    name: "Tiburón Ballena",
    tags: ["whale_shark", "surface", "half_day"],
    months: [10, 11, 12, 1, 2, 3, 4],
    peak: [12, 1],
    price: "$1,800 MXN por persona",
    reason: "Snorkel de medio día para nadar junto al pez más grande del mundo — perfecto si tienes poco tiempo y quieres algo inolvidable.",
    waText: "Hola! quiero reservar Tiburón Ballena",
    view: "/experiencias/tiburon-ballena",
  },
  {
    id: "espiritu-santo-dia",
    name: "Isla Espíritu Santo",
    tags: ["sea_lions", "surface", "wildlife_watch", "full_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [8],
    price: "$1,800 MXN por persona",
    reason: "Snorkel todo el año con una de las colonias de lobos marinos más grandes del Golfo, playas vírgenes y picnic incluido.",
    seasonNotes: "De jun a ago los lobeznos recién nacidos restringen el nado — se observa sin entrar al agua por su seguridad.",
    waText: "Hola! quiero reservar Isla Espíritu Santo",
    view: "/experiencias/tour-espiritu-santo",
  },
  {
    id: "cabo-pulmo",
    name: "Scuba Diving Cabo Pulmo",
    tags: ["certified_diver", "beginner_diver", "reef_sharks", "full_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [8, 9],
    price: "Certificado $3,200 MXN · Discovery $3,800 MXN",
    reason: "El único arrecife de coral vivo del Golfo de California — 25,000 años de coral, tiburones toro y cardúmenes masivos, todo el año.",
    waText: "Hola! quiero reservar Buceo en Cabo Pulmo",
    view: "/experiencias/buceo-cabo-pulmo",
  },
  {
    id: "espiritu-santo-buceo",
    name: "Scuba Diving Isla Espíritu Santo",
    tags: ["certified_diver", "beginner_diver", "sea_lions", "full_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [8],
    price: "Certificado $3,700 MXN · Discovery $4,200 MXN",
    reason: "Buceo junto a lobos marinos curiosos en un Patrimonio UNESCO — la combinación de buceo y fauna más juguetona de La Paz.",
    waText: "Hola! quiero reservar Buceo en Isla Espíritu Santo",
    view: "/experiencias/buceo-la-paz",
  },
  {
    id: "scuba-discovery",
    name: "Scuba Discovery desde Playa",
    tags: ["beginner_diver", "half_day"],
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    peak: [],
    price: "$1,500 MXN por persona",
    reason: "Tu primera vez bajo el agua, sin certificación, máximo 6 metros de profundidad y un instructor todo el tiempo contigo.",
    waText: "Hola! quiero reservar Scuba Discovery desde Playa",
    view: "/experiencias/scuba-discovery",
  },
]

function waLink(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]

export default function HomeQuiz({ locale = defaultLocale }: { locale?: Locale }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<{ q1?: string; q2?: string; q3?: string; month?: number | null }>({})
  const [result, setResult] = useState<{ best: QuizTour; alts: QuizTour[] } | null>(null)

  const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

  function showResult(finalAnswers: typeof answers) {
    const userTags = [finalAnswers.q1, finalAnswers.q2, finalAnswers.q3].filter(Boolean) as string[]
    const month = finalAnswers.month

    const candidates = quizTours.map((t) => {
      let score = 0
      userTags.forEach((tag) => {
        if (t.tags.includes(tag)) score += 2
      })
      if (month) {
        if (t.months.includes(month)) score += 3
        else score -= 4
        if (t.peak.includes(month)) score += 2
      }
      return { tour: t, score }
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

  return (
    <section id="quiz" className="quizsec">
      <div className="quiz-box">
        <div className="quiz-intro">
          <span className="quiz-badge">¿No sabes qué elegir?</span>
          <span className="kicker">Encuentra tu expedición</span>
          <h2>¿Estás en La Paz y no sabes qué tour tomar?</h2>
          <p>Responde 4 preguntas rápidas — incluyendo tu mes de viaje — y te decimos qué expedición te conviene más según la temporada real de cada una.</p>
          <p>Toma 30 segundos. Cero compromiso.</p>
        </div>

        <div className="quiz-panel">
          <div className="quiz-progress">
            {[1, 2, 3, 4].map((d) => (
              <div key={d} className={`quiz-dot${d <= dotsDone ? " done" : ""}`}></div>
            ))}
          </div>

          {!result && step === 1 && (
            <div className="quiz-step active">
              <h3>1. ¿Ya sabes bucear?</h3>
              <div className="quiz-options">
                <button className="quiz-opt" onClick={() => answer(1, "beginner_diver")}>Nunca he buceado y no sé qué esperar</button>
                <button className="quiz-opt" onClick={() => answer(1, "surface")}>No buceo, prefiero quedarme en superficie / snorkel</button>
                <button className="quiz-opt" onClick={() => answer(1, "certified_diver")}>Sí, tengo certificación de buceo</button>
                <button className="quiz-opt" onClick={() => answer(1, "wildlife_watch")}>No me interesa el agua, quiero ver fauna desde la lancha</button>
                <button className="quiz-opt subtle" onClick={() => answer(1, "")}>No estoy seguro/a, sorpréndeme</button>
              </div>
            </div>
          )}

          {!result && step === 2 && (
            <div className="quiz-step active">
              <h3>2. ¿Qué te emociona más ver?</h3>
              <div className="quiz-options">
                <button className="quiz-opt" onClick={() => answer(2, "whales")}>Ballenas grises (madres y crías, muy de cerca)</button>
                <button className="quiz-opt" onClick={() => answer(2, "sea_lions")}>Lobos marinos jugando junto a ti</button>
                <button className="quiz-opt" onClick={() => answer(2, "reef_sharks")}>Arrecife de coral, tiburones y cardúmenes</button>
                <button className="quiz-opt" onClick={() => answer(2, "adrenaline")}>Adrenalina pura: marlines cazando sardinas</button>
                <button className="quiz-opt" onClick={() => answer(2, "mobulas_dolphins")}>Móbulas volando y delfines escoltando la lancha</button>
                <button className="quiz-opt" onClick={() => answer(2, "whale_shark")}>Nadar junto al pez más grande del mundo</button>
                <button className="quiz-opt subtle" onClick={() => answer(2, "")}>No estoy seguro/a, sorpréndeme</button>
              </div>
              <div className="quiz-back" onClick={() => setStep(1)}>← Regresar</div>
            </div>
          )}

          {!result && step === 3 && (
            <div className="quiz-step active">
              <h3>3. ¿Cuánto tiempo tienes disponible?</h3>
              <div className="quiz-options">
                <button className="quiz-opt" onClick={() => answer(3, "half_day")}>Medio día (mañana o tarde)</button>
                <button className="quiz-opt" onClick={() => answer(3, "full_day")}>Día completo</button>
                <button className="quiz-opt subtle" onClick={() => answer(3, "")}>Cualquiera, me adapto</button>
              </div>
              <div className="quiz-back" onClick={() => setStep(2)}>← Regresar</div>
            </div>
          )}

          {!result && step === 4 && (
            <div className="quiz-step active">
              <h3>4. ¿En qué mes viajas?</h3>
              <div className="quiz-months">
                {MONTHS.map((m, i) => (
                  <button key={m} className="quiz-month" onClick={() => answer(4, String(i + 1))}>{m}</button>
                ))}
              </div>
              <div className="quiz-back" onClick={() => setStep(3)}>← Regresar</div>
            </div>
          )}

          {result && (
            <div className="quiz-result active">
              <span className="quiz-eyebrow">Tu expedición ideal</span>
              <h3>{result.best.name}</h3>
              <p className="reason">
                {result.best.reason}
                {result.best.seasonNotes ? ` ${result.best.seasonNotes}` : ""}
              </p>
              <div className="quiz-result-price">{result.best.price}</div>
              <div className="quiz-result-ctas">
                <Link href={lh(result.best.view)} className="btn btn-solid">Ver expedición</Link>
                <a href={waLink(result.best.waText)} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Reservar por WhatsApp</a>
              </div>
              <div className="quiz-alts">
                <span>También te podría gustar</span>
                {result.alts.map((a) => (
                  <div key={a.id} className="quiz-alt-item"><b>{a.name}</b> — {a.price}</div>
                ))}
              </div>
              <div className="quiz-reset" onClick={reset}>↺ Volver a empezar</div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
