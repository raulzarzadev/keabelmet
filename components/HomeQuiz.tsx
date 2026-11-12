"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Locale } from "@/lib/i18n"
import { defaultLocale } from "@/lib/i18n"
import { Price } from "@/contexts/CurrencyContext"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"
import {
	MODE_IMAGES,
	SEASON_GROUPS,
	SEA_LION_NO_SWIM,
	STEP_ORDER,
	animalOptions,
	pickImage,
	recommend,
	shouldAsk,
	type AnimalId,
	type Comfort,
	type FinderAnswers,
	type Group,
	type Mode,
	type Pick,
	type StepId,
	type Time,
	type TourId,
} from "@/lib/tour-finder"

import { quizDicts as dicts, type QuizDict } from "@/lib/tour-finder-i18n"

function waLink(text: string): string {
	return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

function seasonRange(months: number[], t: QuizDict): string {
	if (months.length === 12) return t.allYear
	const a = t.monthsLong[months[0] - 1]
	const b = t.monthsLong[months[months.length - 1] - 1]
	return `${a} – ${b}`
}

function nextStep(after: StepId | null, ans: FinderAnswers): StepId | null {
	const start = after ? STEP_ORDER.indexOf(after) + 1 : 0
	for (const s of STEP_ORDER.slice(start)) if (shouldAsk(s, ans)) return s
	return null
}

function PickPrice({ pick, t }: { pick: Pick; t: QuizDict }) {
	const p = pick.tour.modes[pick.mode]
	if (!p) return null
	return (
		<>
			{p.from ? `${t.from} ` : ""}
			<Price amount={p.mxn} /> <span className="tf-per">{t.perPerson}</span>
		</>
	)
}

function Photo({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
	return <Image src={src} alt={alt} fill sizes={sizes} className="tf-img" />
}

export default function HomeQuiz({ locale = defaultLocale, showGuideLink = true }: { locale?: Locale; showGuideLink?: boolean }) {
	const t = dicts[locale] || dicts.es
	const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)

	const [answers, setAnswers] = useState<FinderAnswers>({})
	const [history, setHistory] = useState<StepId[]>([])
	const [step, setStep] = useState<StepId | null>("month")

	function answer<K extends keyof FinderAnswers>(key: K & StepId, value: FinderAnswers[K]) {
		const next: FinderAnswers = { ...answers, [key]: value }
		// Al cambiar una respuesta se borran las posteriores: pueden dejar de tener sentido.
		for (const s of STEP_ORDER.slice(STEP_ORDER.indexOf(key) + 1)) delete next[s as keyof FinderAnswers]
		setAnswers(next)
		setHistory([...history, key])
		setStep(nextStep(key, next))
	}

	function back() {
		const prev = history[history.length - 1]
		if (!prev) return
		const next: FinderAnswers = { ...answers }
		for (const s of STEP_ORDER.slice(STEP_ORDER.indexOf(prev))) delete next[s as keyof FinderAnswers]
		setAnswers(next)
		setHistory(history.slice(0, -1))
		setStep(prev)
	}

	function reset() {
		setAnswers({})
		setHistory([])
		setStep("month")
	}

	// Progreso: pasos ya contestados + los que faltan con las respuestas actuales.
	const remaining = step ? STEP_ORDER.slice(STEP_ORDER.indexOf(step)).filter((s) => s === step || shouldAsk(s, answers)) : []
	const total = history.length + remaining.length
	const result = step === null ? recommend(answers) : null
	const monthName = answers.month ? t.monthsLong[answers.month - 1] : null

	return (
		<section id="quiz" className="quizsec">
			<div className="quiz-box">
				<div className="quiz-intro">
					<span className="quiz-badge">{t.badge}</span>
					<span className="kicker">{t.kicker}</span>
					<h2>{t.title}</h2>
					<p>{t.sub}</p>
					<p>{t.note}</p>
					{showGuideLink && (
						<p>
							<Link href={lh("/que-hacer-en-la-paz")} className="tf-guide-link">
								{t.guideLink}
							</Link>
						</p>
					)}
				</div>

				<div className="quiz-panel">
					<div className="quiz-progress" aria-hidden="true">
						{Array.from({ length: Math.max(total, 1) }).map((_, i) => (
							<div key={i} className={`quiz-dot${i < history.length ? " done" : ""}`}></div>
						))}
					</div>

					{step === "month" && (
						<div className="quiz-step active">
							<h3>{t.qMonth}</h3>
							<p className="tf-hint">{t.monthHint}</p>
							<div className="tf-seasons">
								{SEASON_GROUPS.map((g) => (
									<div key={g.id} className="tf-season">
										<div className="tf-season-photo">
											<Photo src={g.image} alt={t.seasons[g.id].hint} sizes="(max-width: 700px) 50vw, 280px" />
											<div className="tf-season-text">
												<b>{t.seasons[g.id].name}</b>
												<span>{t.seasons[g.id].hint}</span>
											</div>
										</div>
										<div className="tf-season-months">
											{g.months.map((m) => (
												<button
													key={m}
													type="button"
													className={`tf-chip${answers.month === m ? " on" : ""}`}
													onClick={() => answer("month", m)}
												>
													{t.monthsShort[m - 1]}
												</button>
											))}
										</div>
									</div>
								))}
							</div>
							<button type="button" className="quiz-opt subtle tf-skip" onClick={() => answer("month", null)}>
								{t.monthUnknown}
							</button>
						</div>
					)}

					{step === "mode" && (
						<div className="quiz-step active">
							<h3>{t.qMode}</h3>
							<div className="tf-grid tf-grid-2">
								{(Object.keys(MODE_IMAGES) as Mode[]).map((m) => (
									<button key={m} type="button" className={`tf-card${answers.mode === m ? " on" : ""}`} onClick={() => answer("mode", m)}>
										<div className="tf-card-photo">
											<Photo src={MODE_IMAGES[m]} alt={t.modes[m].title} sizes="(max-width: 700px) 50vw, 280px" />
										</div>
										<b>{t.modes[m].title}</b>
										<span>{t.modes[m].desc}</span>
									</button>
								))}
							</div>
						</div>
					)}

					{step === "comfort" && (
						<div className="quiz-step active">
							<h3>{t.qComfort}</h3>
							<div className="quiz-options">
								{(["openSea", "easy"] as Comfort[]).map((c) => (
									<button key={c} type="button" className="quiz-opt" onClick={() => answer("comfort", c)}>
										{t.comfort[c]}
									</button>
								))}
							</div>
						</div>
					)}

					{step === "animal" && (
						<div className="quiz-step active">
							<h3>{t.qAnimal}</h3>
							<p className="tf-hint">{t.animalHint}</p>
							<div className="tf-grid tf-grid-3">
								{animalOptions(answers).map((a) => {
									const spots = a.where.filter((s) => !answers.mode || s.modes.includes(answers.mode))
									const peak = !!answers.month && spots.some((s) => s.peak?.includes(answers.month!))
									const maybe = spots.every((s) => s.maybe)
									return (
										<button key={a.id} type="button" className={`tf-card tf-animal${answers.animal === a.id ? " on" : ""}`} onClick={() => answer("animal", a.id)}>
											<div className="tf-card-photo">
												<Photo src={a.image} alt={t.animals[a.id]} sizes="(max-width: 700px) 50vw, 190px" />
												{maybe ? <em className="tf-tag">{t.maybeTag}</em> : peak ? <em className="tf-tag tf-tag-peak">{t.peakTag}</em> : null}
											</div>
											<b>{t.animals[a.id]}</b>
										</button>
									)
								})}
							</div>
							<button type="button" className="quiz-opt subtle tf-skip" onClick={() => answer("animal", null)}>
								{t.surprise}
							</button>
						</div>
					)}

					{step === "group" && (
						<div className="quiz-step active">
							<h3>{t.qGroup}</h3>
							<div className="quiz-options">
								{(["adults", "teens", "kids"] as Group[]).map((g) => (
									<button key={g} type="button" className="quiz-opt" onClick={() => answer("group", g)}>
										{t.groups[g]}
									</button>
								))}
							</div>
						</div>
					)}

					{step === "time" && (
						<div className="quiz-step active">
							<h3>{t.qTime}</h3>
							<div className="quiz-options">
								{(["short", "medium", "full"] as Time[]).concat(answers.mode === "firstDive" ? ["days"] : []).map((v) => (
									<button key={v} type="button" className="quiz-opt" onClick={() => answer("time", v)}>
										{t.times[v]}
									</button>
								))}
								<button type="button" className="quiz-opt subtle" onClick={() => answer("time", null)}>
									{t.anyTime}
								</button>
							</div>
						</div>
					)}

					{step !== null && history.length > 0 && (
						<button type="button" className="quiz-back" onClick={back}>
							{t.back}
						</button>
					)}

					{result && (
						<Result
							pickResult={result}
							answers={answers}
							t={t}
							lh={lh}
							monthName={monthName}
							onBack={back}
							onReset={reset}
						/>
					)}
				</div>
			</div>
		</section>
	)
}

function Result({
	pickResult,
	answers,
	t,
	lh,
	monthName,
	onBack,
	onReset,
}: {
	pickResult: NonNullable<ReturnType<typeof recommend>>
	answers: FinderAnswers
	t: QuizDict
	lh: (p: string) => string
	monthName: string | null
	onBack: () => void
	onReset: () => void
}) {
	const { best, alts, relaxedMode } = pickResult
	const text = t.tours[best.tour.id]
	const animalName = answers.animal ? t.animals[answers.animal] : null

	const why: string[] = []
	if (animalName && best.animalMatch) {
		// Orcas: en vez de la línea genérica va un mensaje honesto (notes.orca); no las vendemos.
		if (answers.animal === "orca") {
			/* nada */
		} else if (best.animalMatch.maybe) why.push(t.why.maybe(animalName))
		else if (monthName && answers.month && best.animalMatch.peak?.includes(answers.month)) why.push(t.why.peak(animalName, monthName))
		else why.push(t.why.match(animalName))
	}
	if (monthName) why.push(t.why.inMonth(monthName))
	else why.push(t.why.season(seasonRange(best.tour.months, t)))

	const notes: string[] = []
	if (answers.animal === "orca") notes.push(t.notes.orca)
	const seaLionTour = best.tour.id === "tour-espiritu-santo" || best.tour.id === "buceo-la-paz"
	if (seaLionTour && (!answers.month || SEA_LION_NO_SWIM.includes(answers.month))) notes.push(t.notes.sealionSummer)
	if (best.tour.id === "safari-la-ventana" && best.mode === "boat") notes.push(t.notes.lvBoat)
	if (best.tour.id === "buceo-cabo-pulmo") notes.push(t.notes.caboPulmo)
	if (best.tour.needsOpenSea) notes.push(t.notes.openSea)
	if (best.privateOnly) notes.push(t.notes.privateOnly)

	const modeLabel = t.modes[best.mode].badge

	return (
		<div className="quiz-result active tf-result">
			{relaxedMode && <p className="tf-note tf-note-top">{t.notes.relaxed}</p>}
			<div className="tf-result-photo">
				<Photo src={pickImage(best)} alt={text.name} sizes="(max-width: 700px) 100vw, 560px" />
				<span className={`tf-mode tf-mode-${best.mode}`}>{modeLabel}</span>
			</div>
			<span className="quiz-eyebrow">{t.eyebrow}</span>
			<h3>{text.name}</h3>
			<p className="reason">{text.blurb}</p>
			<ul className="tf-why">
				{why.map((w) => (
					<li key={w}>{w}</li>
				))}
				<li>
					{t.duration}: {text.duration}
				</li>
			</ul>
			{notes.map((n) => (
				<p key={n} className="tf-note">
					{n}
				</p>
			))}
			<div className="quiz-result-price">
				<PickPrice pick={best} t={t} />
			</div>
			<div className="quiz-result-ctas">
				<Link href={lh(best.tour.href)} className="btn btn-solid">
					{t.view}
				</Link>
				<a href={waLink(t.wa(text.name, monthName, modeLabel))} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">
					{t.book}
				</a>
			</div>

			{alts.length > 0 && (
				<div className="tf-alts">
					<span className="tf-alts-title">{t.alts}</span>
					{alts.map((a) => (
						<Link key={a.tour.id} href={lh(a.tour.href)} className="tf-alt">
							<div className="tf-alt-photo">
								<Photo src={pickImage(a)} alt={t.tours[a.tour.id].name} sizes="96px" />
							</div>
							<div className="tf-alt-body">
								<b>{t.tours[a.tour.id].name}</b>
								<span className={`tf-mode tf-mode-${a.mode} tf-mode-sm`}>{t.modes[a.mode].badge}</span>
								<span className="tf-alt-price">
									<PickPrice pick={a} t={t} /> · {t.tours[a.tour.id].duration}
								</span>
							</div>
						</Link>
					))}
				</div>
			)}

			<div className="tf-result-foot">
				<button type="button" className="quiz-back" onClick={onBack}>
					{t.back}
				</button>
				<button type="button" className="quiz-reset" onClick={onReset}>
					{t.reset}
				</button>
			</div>
		</div>
	)
}
