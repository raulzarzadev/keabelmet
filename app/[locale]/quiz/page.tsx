"use client"

import { useState, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Check, Thermometer, Waves } from "lucide-react"
import { Price } from "@/contexts/CurrencyContext"
import { defaultLocale } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import type { QuizAnswers, TourRecommendation } from "@/lib/quiz-recommendations"
import { getRecommendations, buildWhatsAppUrl } from "@/lib/quiz-recommendations"
import quizData from "@/locales/pages/quiz.json"

type StepKey = "season" | "group" | "size" | "swim" | "snorkel" | "dived" | "cert" | "groupCert" | "vibe" | "activities"

function l(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

const initialAnswers: QuizAnswers = {
  canSwim: null,
  snorkelLevel: null,
  hasDived: null,
  diveCert: null,
  groupCert: null,
  activities: [],
  vibe: [],
  groupType: null,
  groupSize: null,
  season: null,
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
}

export default function QuizPage() {
  const params = useParams()
  const locale = (params?.locale as Locale) || defaultLocale
  const t = (quizData as Record<string, typeof quizData.es>)[locale] || quizData.es

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers)
  const [direction, setDirection] = useState(1)
  const [showResults, setShowResults] = useState(false)

  const activeSteps = useMemo(() => {
    const steps: StepKey[] = ["season", "group", "size", "swim"]
    if (answers.canSwim) {
      steps.push("snorkel")
      steps.push("dived")
      if (answers.hasDived) {
        steps.push("cert")
        const isSolo = answers.groupType === "Solo" || answers.groupType === "Seul" || answers.groupType === "独自"
        if (!isSolo) {
          steps.push("groupCert")
        }
      }
    }
    steps.push("vibe", "activities")
    return steps
  }, [answers.canSwim, answers.hasDived, answers.groupType])

  const totalSteps = activeSteps.length
  const currentStepKey = activeSteps[step]

  const goNext = useCallback(() => {
    setDirection(1)
    if (step + 1 >= totalSteps) {
      setShowResults(true)
    } else {
      setStep((s) => s + 1)
    }
  }, [step, totalSteps])

  const goBack = useCallback(() => {
    setDirection(-1)
    if (showResults) {
      setShowResults(false)
    } else if (step > 0) {
      setStep((s) => s - 1)
    }
  }, [step, showResults])

  const handleBooleanAnswer = useCallback(
    (key: "canSwim" | "hasDived", value: boolean) => {
      setAnswers((prev) => {
        const updated = { ...prev, [key]: value }
        // Reset dependent answers when swim changes
        if (key === "canSwim" && !value) {
          updated.snorkelLevel = null
          updated.hasDived = null
          updated.diveCert = null
        }
        // Reset cert when diving changes
        if (key === "hasDived" && !value) {
          updated.diveCert = null
        }
        return updated
      })
      goNext()
    },
    [goNext]
  )

  const handleOptionAnswer = useCallback(
    (key: "snorkelLevel" | "diveCert" | "groupCert" | "groupType" | "groupSize", value: string) => {
      setAnswers((prev) => ({ ...prev, [key]: value }))
      goNext()
    },
    [goNext]
  )

  const handleSeasonAnswer = useCallback(
    (seasonId: string) => {
      setAnswers((prev) => ({ ...prev, season: seasonId }))
      goNext()
    },
    [goNext]
  )

  const handleVibeToggle = useCallback((vibeKey: string) => {
    setAnswers((prev) => {
      const current = prev.vibe
      const updated = current.includes(vibeKey)
        ? current.filter((v) => v !== vibeKey)
        : [...current, vibeKey]
      return { ...prev, vibe: updated }
    })
  }, [])

  const handleActivityToggle = useCallback((activity: string) => {
    setAnswers((prev) => {
      const current = prev.activities
      const updated = current.includes(activity)
        ? current.filter((a) => a !== activity)
        : [...current, activity]
      return { ...prev, activities: updated }
    })
  }, [])

  const resetQuiz = useCallback(() => {
    setStep(0)
    setAnswers(initialAnswers)
    setDirection(1)
    setShowResults(false)
  }, [])

  // Filter activity options based on canSwim
  const activityOptions = useMemo(() => {
    const allOptions = t.questions.activities.options as Record<string, string>
    if (!answers.canSwim) {
      const nonSwimKeys = ["embarcacion", "pesca", "avistamiento", "hikes"]
      return Object.fromEntries(
        Object.entries(allOptions).filter(([key]) => nonSwimKeys.includes(key))
      )
    }
    return allOptions
  }, [answers.canSwim, t.questions.activities.options])

  const recommendations = useMemo(() => {
    if (!showResults) return []
    return getRecommendations(answers)
  }, [showResults, answers])

  const whatsappUrl = useMemo(() => {
    if (!showResults) return ""
    return buildWhatsAppUrl(answers, recommendations, locale)
  }, [showResults, answers, recommendations, locale])

  // Results screen
  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-lg mx-auto px-4 py-8">
          <button
            onClick={goBack}
            className="flex items-center gap-1 text-teal-700 hover:text-teal-800 mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              {t.results.title}
            </h1>
            <p className="text-gray-600 text-center mb-8">
              {t.results.subtitle}
            </p>

            <div className="space-y-6">
              {recommendations.map((tour: TourRecommendation, index: number) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {tour.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-teal-700 font-bold text-lg">
                        <Price amount={tour.price} />
                      </span>
                      <span className="text-gray-500 text-sm">
                        {t.results.duration}: {tour.duration}
                      </span>
                    </div>
                    <Link
                      href={l(tour.href, locale)}
                      className="block w-full text-center bg-teal-700 text-white py-3 rounded-xl font-semibold hover:bg-teal-800 transition-colors"
                    >
                      {t.results.viewTour}
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.results.whatsapp}
              </a>
              <button
                onClick={resetQuiz}
                className="w-full text-teal-700 py-3 rounded-xl font-semibold border-2 border-teal-700 hover:bg-teal-50 transition-colors"
              >
                {t.results.retake}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  // Quiz step screen
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            {step > 0 ? (
              <button
                onClick={goBack}
                className="flex items-center gap-1 text-teal-700 hover:text-teal-800 text-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.back}
              </button>
            ) : (
              <div />
            )}
            <span className="text-sm text-gray-500">
              {t.progress
                .replace("{current}", String(step + 1))
                .replace("{total}", String(totalSteps))}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStepKey}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Season question */}
              {currentStepKey === "season" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {(t.questions as any).season.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {((t.questions as any).season.options as any[]).map((option: any) => {
                      const isSelected = answers.season === option.id
                      const accentMap: Record<string, string> = {
                        spring: "border-t-emerald-400",
                        summer: "border-t-amber-400",
                        fall:   "border-t-orange-500",
                        winter: "border-t-sky-400",
                      }
                      const accentColor = accentMap[option.id] ?? "border-t-gray-300"
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleSeasonAnswer(option.id)}
                          className={`group relative flex flex-col items-start text-left bg-white rounded-2xl border border-gray-100 border-t-4 ${accentColor} p-6 cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
                            isSelected
                              ? "shadow-md ring-2 ring-teal-600 ring-offset-2"
                              : "shadow-sm hover:shadow-md hover:border-gray-200"
                          }`}
                        >
                          {/* Selected indicator */}
                          {isSelected && (
                            <span className="absolute top-4 right-4 flex items-center justify-center w-5 h-5 rounded-full bg-teal-600">
                              <Check className="w-3 h-3 text-white" strokeWidth={3} />
                            </span>
                          )}

                          {/* Season name */}
                          <span className="text-xl font-semibold text-gray-900 leading-tight mb-1">
                            {option.name}
                          </span>

                          {/* Months */}
                          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-5">
                            {option.months}
                          </span>

                          {/* Temperature row */}
                          <div className="flex gap-4 mb-4">
                            <span className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Thermometer className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              {option.airTemp}
                            </span>
                            <span className="flex items-center gap-1.5 text-sm text-gray-600">
                              <Waves className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              {option.waterTemp}
                            </span>
                          </div>

                          {/* Species — comma-separated plain text */}
                          <span className="text-xs text-gray-400 leading-relaxed">
                            {option.species.join(", ")}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Swim question */}
              {currentStepKey === "swim" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t.questions.swim.title}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleBooleanAnswer("canSwim", true)}
                      className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-6 text-lg font-semibold text-gray-900 transition-colors"
                    >
                      {t.questions.swim.yes}
                    </button>
                    <button
                      onClick={() => handleBooleanAnswer("canSwim", false)}
                      className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-6 text-lg font-semibold text-gray-900 transition-colors"
                    >
                      {t.questions.swim.no}
                    </button>
                  </div>
                </div>
              )}

              {/* Snorkel question */}
              {currentStepKey === "snorkel" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t.questions.snorkel.title}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {t.questions.snorkel.options.map((option: string) => (
                      <button
                        key={option}
                        onClick={() => handleOptionAnswer("snorkelLevel", option)}
                        className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-4 text-lg font-semibold text-gray-900 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dived question */}
              {currentStepKey === "dived" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t.questions.dived.title}
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleBooleanAnswer("hasDived", true)}
                      className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-6 text-lg font-semibold text-gray-900 transition-colors"
                    >
                      {t.questions.dived.yes}
                    </button>
                    <button
                      onClick={() => handleBooleanAnswer("hasDived", false)}
                      className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-6 text-lg font-semibold text-gray-900 transition-colors"
                    >
                      {t.questions.dived.no}
                    </button>
                  </div>
                </div>
              )}

              {/* Cert question */}
              {currentStepKey === "cert" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t.questions.cert.title}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {t.questions.cert.options.map((option: string) => (
                      <button
                        key={option}
                        onClick={() => handleOptionAnswer("diveCert", option)}
                        className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-4 text-lg font-semibold text-gray-900 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group cert question */}
              {currentStepKey === "groupCert" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {(t.questions as any).groupCert.title}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {((t.questions as any).groupCert.options as string[]).map((option: string) => (
                      <button
                        key={option}
                        onClick={() => handleOptionAnswer("groupCert", option)}
                        className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-4 text-lg font-semibold text-gray-900 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Vibe question (multi-select) */}
              {currentStepKey === "vibe" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {(t.questions as any).vibe.title}
                  </h2>
                  <p className="text-gray-500 mb-8">
                    {(t.questions as any).vibe.subtitle}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries((t.questions as any).vibe.options as Record<string, string>).map(([key, label]) => {
                      const isSelected = answers.vibe.includes(key)
                      return (
                        <button
                          key={key}
                          onClick={() => handleVibeToggle(key)}
                          className={`flex items-center justify-between bg-white border-2 rounded-xl py-4 px-5 text-lg font-semibold transition-colors ${
                            isSelected
                              ? "border-teal-700 bg-teal-50 text-teal-700"
                              : "border-gray-200 text-gray-900 hover:border-teal-700 hover:bg-teal-50"
                          }`}
                        >
                          <span>{label}</span>
                          {isSelected && <Check className="w-5 h-5 text-teal-700" />}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={goNext}
                    disabled={answers.vibe.length === 0}
                    className="mt-6 w-full bg-teal-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t.continue}
                  </button>
                </div>
              )}

              {/* Activities question (multi-select) */}
              {currentStepKey === "activities" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.questions.activities.title}
                  </h2>
                  <p className="text-gray-500 mb-8">
                    {t.questions.activities.subtitle}
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(activityOptions).map(([key, label]) => {
                      const isSelected = answers.activities.includes(key)
                      return (
                        <button
                          key={key}
                          onClick={() => handleActivityToggle(key)}
                          className={`flex items-center justify-between bg-white border-2 rounded-xl py-4 px-5 text-lg font-semibold transition-colors ${
                            isSelected
                              ? "border-teal-700 bg-teal-50 text-teal-700"
                              : "border-gray-200 text-gray-900 hover:border-teal-700 hover:bg-teal-50"
                          }`}
                        >
                          <span>{label}</span>
                          {isSelected && <Check className="w-5 h-5 text-teal-700" />}
                        </button>
                      )
                    })}
                  </div>
                  <button
                    onClick={goNext}
                    disabled={answers.activities.length === 0}
                    className="mt-6 w-full bg-teal-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {t.continue}
                  </button>
                </div>
              )}

              {/* Group type question */}
              {currentStepKey === "group" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t.questions.group.title}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {t.questions.group.options.map((option: string) => (
                      <button
                        key={option}
                        onClick={() => handleOptionAnswer("groupType", option)}
                        className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-4 text-lg font-semibold text-gray-900 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Group size question */}
              {currentStepKey === "size" && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    {t.questions.size.title}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {t.questions.size.options.map((option: string) => (
                      <button
                        key={option}
                        onClick={() => handleOptionAnswer("groupSize", option)}
                        className="bg-white border-2 border-gray-200 hover:border-teal-700 hover:bg-teal-50 rounded-xl py-4 text-lg font-semibold text-gray-900 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
