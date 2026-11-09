/**
 * Motor del cuestionario "¿Qué tour tomar?" de la portada.
 *
 * Funciona como filtro real: primero descarta lo que no se puede hacer
 * (fuera de temporada, otra forma de vivir el mar, edad mínima, nivel de
 * snorkel) y después ordena lo que queda según el animal, la temporada alta
 * y el tiempo disponible. Los datos salen de las páginas de cada expedición
 * (precios, duración, edad mínima) y de lib/fauna-calendar.ts y
 * lib/expedition-seasons.ts (meses).
 */

const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

/** Cómo quiere vivir el mar la persona. Es excluyente: no mezcla buceo con snorkel ni con lancha. */
export type Mode = "boat" | "snorkel" | "firstDive" | "certified"
/** adults = todos de 14 años o más; teens = alguien de 12 o 13; kids = alguien menor de 12. */
export type Group = "adults" | "teens" | "kids"
export type Time = "short" | "medium" | "full" | "days"
export type Comfort = "easy" | "openSea"

export type TourId =
	| "tiburon-ballena"
	| "tour-espiritu-santo"
	| "safari-la-ventana"
	| "safari-bahia-magdalena"
	| "tour-ballena-gris"
	| "buceo-cabo-pulmo"
	| "buceo-la-paz"
	| "scuba-discovery"
	| "certificacion-open-water"

export interface FinderTour {
	id: TourId
	href: string
	image: string
	/** Foto según la forma de vivirlo (p. ej. La Ventana desde la lancha vs. con snorkel). */
	imageByMode?: Partial<Record<Mode, string>>
	/** Precio por persona (MXN) según la forma de vivirlo. `from` = "desde". */
	modes: Partial<Record<Mode, { mxn: number; from?: boolean }>>
	months: number[]
	time: Exclude<Time, "days"> | "days"
	/** Edad mínima publicada en la página. 0 = apto para familias. */
	minAge: number
	/** Menores de 14 solo en salida privada (La Ventana). */
	privateUnder14?: boolean
	/** Requiere experiencia de snorkel en mar abierto (Bahía Magdalena). */
	needsOpenSea?: boolean
}

export const TOURS: FinderTour[] = [
	{
		id: "tiburon-ballena",
		href: "/experiencias/tiburon-ballena",
		image: "/tiburon-ballena-drone.jpg",
		modes: { snorkel: { mxn: 2300 } },
		months: [10, 11, 12, 1, 2, 3, 4],
		time: "short",
		minAge: 12,
	},
	{
		id: "tour-espiritu-santo",
		href: "/experiencias/tour-espiritu-santo",
		image: "/lobo-marino-espiritu-card.jpg",
		modes: { snorkel: { mxn: 1800 } },
		months: ALL,
		time: "medium",
		minAge: 0,
	},
	{
		id: "safari-la-ventana",
		href: "/experiencias/safari-la-ventana",
		image: "/images/gallery/mobula-saltando.jpeg",
		imageByMode: { boat: "/images/safari/lancha-avistando-ballena.jpg", snorkel: "/images/gallery/snorkelmobulas.jpeg" },
		modes: { boat: { mxn: 3000 }, snorkel: { mxn: 3000 } },
		months: ALL,
		time: "medium",
		minAge: 14,
		privateUnder14: true,
	},
	{
		id: "safari-bahia-magdalena",
		href: "/experiencias/safari-bahia-magdalena",
		image: "/images/marlin-bahia-magdalena-hero.jpeg",
		modes: { snorkel: { mxn: 3500 } },
		months: [11, 12],
		time: "full",
		// La página no publica edad mínima; no lo recomendamos con menores de 12 (10 h en mar abierto).
		minAge: 12,
		needsOpenSea: true,
	},
	{
		id: "tour-ballena-gris",
		href: "/experiencias/tour-ballena-gris",
		image: "/ballena-gris-spyhop-new.jpg",
		modes: { boat: { mxn: 2800, from: true } },
		months: [1, 2, 3],
		time: "full",
		minAge: 0,
	},
	{
		id: "scuba-discovery",
		href: "/experiencias/scuba-discovery",
		image: "/scuba-discovery-shaka.jpg",
		modes: { firstDive: { mxn: 1500 } },
		months: ALL,
		time: "short",
		minAge: 12,
	},
	{
		id: "buceo-la-paz",
		href: "/experiencias/buceo-la-paz",
		image: "/buceo-espiritu-santo-lobo-buzo.jpg",
		modes: { firstDive: { mxn: 4200 }, certified: { mxn: 3800 } },
		months: ALL,
		time: "medium",
		minAge: 12,
	},
	{
		id: "buceo-cabo-pulmo",
		href: "/experiencias/buceo-cabo-pulmo",
		image: "/cabo-pulmo-cardumen-buzo.jpg",
		imageByMode: { snorkel: "/snorkeling-coral-reef.jpg" },
		modes: { snorkel: { mxn: 1500 }, firstDive: { mxn: 3800 }, certified: { mxn: 3200 } },
		months: ALL,
		// ~5 h de actividad, pero sin transporte desde La Paz: en la práctica es el día.
		time: "full",
		minAge: 12,
	},
	{
		id: "certificacion-open-water",
		href: "/experiencias/certificacion-open-water",
		image: "/scuba-diving-underwater-la-paz-sea-lions-swimming.jpg",
		modes: { firstDive: { mxn: 8000 } },
		months: ALL,
		time: "days",
		// La página no publica edad mínima; no lo recomendamos con menores de 12.
		minAge: 12,
	},
]

export type AnimalId =
	| "grayWhale"
	| "bigWhales"
	| "whaleShark"
	| "sealion"
	| "mobula"
	| "giantManta"
	| "orca"
	| "dolphin"
	| "spermWhale"
	| "sardineRun"
	| "reef"

interface Sighting {
	tour: TourId
	modes: Mode[]
	months: number[]
	/** Meses de mayor probabilidad (fauna-calendar). */
	peak?: number[]
	/** Avistamiento ocasional: puede aparecer, no es el objetivo del tour. */
	maybe?: boolean
	/** Lugar secundario para ese animal (pesa menos que el principal). */
	secondary?: boolean
}

export interface FinderAnimal {
	id: AnimalId
	image: string
	where: Sighting[]
}

const LV_ALL: Mode[] = ["boat", "snorkel"]
const DIVE: Mode[] = ["firstDive", "certified"]

export const ANIMALS: FinderAnimal[] = [
	{
		id: "grayWhale",
		image: "/gray-whale-mother-calf-magdalena.jpg",
		where: [{ tour: "tour-ballena-gris", modes: ["boat"], months: [1, 2, 3] }],
	},
	{
		id: "whaleShark",
		image: "/tiburon-ballena-snorkel-h.jpg",
		where: [
			{ tour: "tiburon-ballena", modes: ["snorkel"], months: [10, 11, 12, 1, 2, 3, 4], peak: [11, 12, 1, 2, 3] },
			{ tour: "safari-la-ventana", modes: ["boat"], months: [10, 11, 12, 1, 2, 3, 4], peak: [11, 12, 1, 2, 3], maybe: true },
		],
	},
	{
		id: "sealion",
		image: "/images/especies/lobomarinonadando.jpeg",
		where: [
			{ tour: "tour-espiritu-santo", modes: ["snorkel"], months: ALL },
			{ tour: "buceo-la-paz", modes: DIVE, months: ALL },
			{ tour: "safari-bahia-magdalena", modes: ["snorkel"], months: [11, 12], secondary: true },
			{ tour: "safari-la-ventana", modes: LV_ALL, months: ALL, maybe: true },
		],
	},
	{
		id: "bigWhales",
		image: "/images/especies/ballena-jorobada-saltando.jpeg",
		where: [{ tour: "safari-la-ventana", modes: LV_ALL, months: [11, 12, 1, 2, 3, 4], peak: [1, 2, 3, 4] }],
	},
	{
		id: "mobula",
		image: "/images/gallery/mobula-saltando.jpeg",
		where: [{ tour: "safari-la-ventana", modes: LV_ALL, months: [1, 3, 4, 5, 6, 7, 8, 12], peak: [4, 5, 6] }],
	},
	{
		id: "sardineRun",
		image: "/images/gallery/marlin-cazando.jpeg",
		where: [{ tour: "safari-bahia-magdalena", modes: ["snorkel"], months: [11, 12] }],
	},
	{
		id: "reef",
		image: "/buceo-cabo-pulmo-cardumen.jpg",
		where: [
			{ tour: "buceo-cabo-pulmo", modes: ["snorkel", "firstDive", "certified"], months: ALL },
			{ tour: "buceo-la-paz", modes: DIVE, months: ALL, secondary: true },
			{ tour: "tour-espiritu-santo", modes: ["snorkel"], months: ALL, secondary: true },
			{ tour: "scuba-discovery", modes: ["firstDive"], months: ALL, secondary: true },
		],
	},
	{
		id: "orca",
		image: "/images/especies/orcalaventana.jpeg",
		where: [{ tour: "safari-la-ventana", modes: LV_ALL, months: ALL, peak: [3, 4, 5, 6], maybe: true }],
	},
	{
		id: "spermWhale",
		image: "/images/especies/cachalote-buceo.jpg",
		where: [{ tour: "safari-la-ventana", modes: LV_ALL, months: [5, 6, 7, 8, 9, 10, 11], maybe: true }],
	},
	{
		id: "giantManta",
		image: "/images/gallery/manta-gigante.jpeg",
		where: [{ tour: "safari-la-ventana", modes: LV_ALL, months: [8, 9, 10], maybe: true }],
	},
	{
		id: "dolphin",
		image: "/images/especies/delfin-salto.jpg",
		where: [
			{ tour: "safari-la-ventana", modes: LV_ALL, months: ALL },
			{ tour: "safari-bahia-magdalena", modes: ["snorkel"], months: [11, 12], secondary: true },
		],
	},
]

/** Estaciones con lo que representa cada una en La Paz (meses de lib/fauna-calendar.ts). */
export const SEASON_GROUPS: { id: "winter" | "spring" | "summer" | "autumn"; months: number[]; image: string }[] = [
	{ id: "winter", months: [12, 1, 2], image: "/ballena-gris-spyhop-new.jpg" },
	{ id: "spring", months: [3, 4, 5], image: "/images/especies/mobula-salto.jpg" },
	{ id: "summer", months: [6, 7, 8], image: "/images/especies/cachalote-buceo.jpg" },
	{ id: "autumn", months: [9, 10, 11], image: "/images/especies/sardinas-banco.jpeg" },
]

export const MODE_IMAGES: Record<Mode, string> = {
	boat: "/images/safari/lancha-avistando-ballena.jpg",
	snorkel: "/images/safari/snorkel-pulgares.jpg",
	firstDive: "/images/buceo/discovery-buzo-ok.jpg",
	certified: "/images/buceo/espiritu-buzo-cardumen.jpg",
}

/** Entre junio y agosto no se nada con los lobos marinos (temporada reproductiva). */
export const SEA_LION_NO_SWIM = [6, 7, 8]

export interface FinderAnswers {
	month?: number | null // null = aún no sé
	mode?: Mode
	comfort?: Comfort
	animal?: AnimalId | null // null = sorpréndeme
	group?: Group
	time?: Time | null // null = me adapto
}

export interface Pick {
	tour: FinderTour
	mode: Mode
	score: number
	animalMatch?: Sighting
	/** Con menores de 14: La Ventana solo en privado. */
	privateOnly: boolean
}

export interface FinderResult {
	best: Pick
	alts: Pick[]
	/** Se relajó la forma de vivir el mar porque ninguna opción cumplía todo (p. ej. buceo con menores de 12). */
	relaxedMode: boolean
}

const TIME_RANK: Record<Time, number> = { short: 0, medium: 1, full: 2, days: 3 }

function ageOk(tour: FinderTour, group?: Group): boolean {
	if (!group || group === "adults") return true
	const youngest = group === "kids" ? 11 : 12
	if (tour.privateUnder14 && youngest < tour.minAge) return true // posible en privado
	return youngest >= tour.minAge
}

function inSeason(months: number[], month?: number | null) {
	return !month || months.includes(month)
}

function sightingFor(animal: AnimalId, tour: TourId, mode: Mode, month?: number | null): Sighting | undefined {
	const a = ANIMALS.find((x) => x.id === animal)
	return a?.where.find((s) => s.tour === tour && s.modes.includes(mode) && inSeason(s.months, month))
}

/** Tours posibles con las respuestas dadas (filtros duros). */
export function candidates(ans: FinderAnswers, opts: { ignoreMode?: boolean } = {}): Pick[] {
	const out: Pick[] = []
	for (const tour of TOURS) {
		if (!inSeason(tour.months, ans.month)) continue
		if (!ageOk(tour, ans.group)) continue
		if (tour.needsOpenSea && ans.comfort === "easy") continue
		const modes = (Object.keys(tour.modes) as Mode[]).filter((m) => opts.ignoreMode || !ans.mode || m === ans.mode)
		if (!modes.length) continue
		// Con el modo relajado, toma la forma de vivirlo más cercana a la elegida.
		const mode = modes[0]
		out.push({ tour, mode, score: 0, privateOnly: !!tour.privateUnder14 && !!ans.group && ans.group !== "adults" })
	}
	return out
}

function score(p: Pick, ans: FinderAnswers): Pick {
	let s = 0
	let animalMatch: Sighting | undefined
	if (ans.animal) {
		animalMatch = sightingFor(ans.animal, p.tour.id, p.mode, ans.month)
		if (animalMatch) {
			s += animalMatch.maybe ? 4 : animalMatch.secondary ? 6 : 8
			if (ans.month && animalMatch.peak?.includes(ans.month)) s += 2
			// Lobos marinos en verano: se ven desde la lancha, no se nada con ellos.
			if (ans.animal === "sealion" && ans.month && SEA_LION_NO_SWIM.includes(ans.month) && p.mode !== "boat") s -= 2
		}
	}
	if (p.tour.time === "days") s += ans.time === "days" ? 10 : -10
	else if (ans.time && ans.time !== "days") {
		const d = Math.abs(TIME_RANK[ans.time] - TIME_RANK[p.tour.time])
		s += d === 0 ? 3 : -3 * d
	} else if (ans.time === "days") s -= 1
	if (p.privateOnly) s -= 2
	// Temporadas cortas: si estás justo en ellas, vale la pena aprovecharlas.
	if (ans.month && p.tour.months.length <= 3) s += 1
	return { ...p, score: s, animalMatch }
}

export function recommend(ans: FinderAnswers): FinderResult | null {
	let relaxedMode = false
	let list = candidates(ans)
	if (!list.length) {
		list = candidates(ans, { ignoreMode: true })
		relaxedMode = true
	}
	if (!list.length) return null
	const order = TOURS.map((t) => t.id)
	// Primero lo que la persona pidió explícitamente (certificarse, o el animal elegido); luego el puntaje.
	const tier = (p: Pick) => (ans.time === "days" && p.tour.time === "days" ? 2 : p.animalMatch ? 1 : 0)
	const ranked = list
		.map((p) => score(p, ans))
		.sort((a, b) => tier(b) - tier(a) || b.score - a.score || order.indexOf(a.tour.id) - order.indexOf(b.tour.id))
	return { best: ranked[0], alts: ranked.slice(1, 3), relaxedMode }
}

/** Animales que de verdad se pueden ver con el mes y la forma de vivir el mar elegidos. */
export function animalOptions(ans: FinderAnswers): FinderAnimal[] {
	const possible = new Set(candidates(ans).map((p) => p.tour.id))
	return ANIMALS.filter((a) =>
		a.where.some((s) => possible.has(s.tour) && (!ans.mode || s.modes.includes(ans.mode)) && inSeason(s.months, ans.month)),
	)
}

export type StepId = "month" | "mode" | "comfort" | "animal" | "group" | "time"

const STEP_VALUES: Record<"time", (string | null)[]> = {
	time: ["short", "medium", "full", null],
}

function signature(ans: FinderAnswers) {
	const r = recommend(ans)
	if (!r) return ""
	return `${r.best.tour.id}:${r.best.mode}:${r.best.privateOnly}`
}

/**
 * Pregunta solo lo que cambia el resultado: si todas las respuestas posibles
 * dan la misma recomendación principal, la pregunta se salta.
 */
export function shouldAsk(step: StepId, ans: FinderAnswers): boolean {
	// "group" siempre: filtra por edad mínima los animales y tours que se ofrecen después.
	if (step === "month" || step === "mode" || step === "group") return true
	if (step === "animal") return animalOptions(ans).length >= 2
	if (step === "comfort") {
		if (ans.mode !== "snorkel") return false
		return candidates({ ...ans, comfort: undefined }).some((p) => p.tour.needsOpenSea)
	}
	// Con buceo por primera vez incluye la opción de certificarse (si hay buceo posible para el grupo).
	if (step === "time" && ans.mode === "firstDive" && candidates(ans).length > 0) return true
	const sigs = new Set(STEP_VALUES.time.map((v) => signature({ ...ans, time: v as Time | null })))
	return sigs.size > 1
}

// "group" va antes que "animal" para no ofrecer animales que el grupo no puede ver (edad mínima).
export const STEP_ORDER: StepId[] = ["month", "mode", "group", "comfort", "animal", "time"]

export function pickImage(p: { tour: FinderTour; mode: Mode }): string {
	return p.tour.imageByMode?.[p.mode] ?? p.tour.image
}
