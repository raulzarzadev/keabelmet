/**
 * Guía "Qué hacer en La Paz y La Ventana": versión en texto (rastreable por
 * Google, Bing y asistentes como ChatGPT, Claude o Perplexity) del
 * cuestionario de la portada. Todo se genera desde lib/tour-finder.ts para
 * que la guía, el cuestionario y llms.txt digan siempre lo mismo.
 */
import type { Locale } from "@/lib/i18n"
import {
	ANIMALS,
	SEA_LION_NO_SWIM,
	TOURS,
	type AnimalId,
	type FinderTour,
	type Mode,
	type TourId,
} from "@/lib/tour-finder"
import { quizDicts, type QuizDict } from "@/lib/tour-finder-i18n"

export const GUIDE_PATH = "/que-hacer-en-la-paz"

const MODES: Mode[] = ["boat", "snorkel", "firstDive", "certified"]

export function tourById(id: TourId): FinderTour {
	return TOURS.find((t) => t.id === id)!
}

export function mxn(n: number): string {
	return `$${n.toLocaleString("en-US")} MXN`
}

/** Precio más bajo del tour (para "desde"). */
export function minPrice(t: FinderTour): number {
	return Math.min(...Object.values(t.modes).map((p) => p!.mxn))
}

/** Convierte una lista de meses en rangos legibles, considerando que dic → ene es continuo. */
export function monthRanges(months: number[], q: QuizDict): string {
	if (months.length >= 12) return q.allYear
	const has = (m: number) => months.includes(((m - 1 + 12) % 12) + 1)
	// Empieza en un mes incluido cuyo anterior no esté incluido.
	let start = 1
	for (let m = 1; m <= 12; m++) if (has(m) && !has(m - 1)) { start = m; break }
	const ranges: string[] = []
	let m = start
	for (let i = 0; i < 12; ) {
		const cur = ((m - 1) % 12) + 1
		if (!has(cur)) { m++; i++; continue }
		let len = 0
		while (len < 12 && has(((cur - 1 + len) % 12) + 1)) len++
		const end = ((cur - 1 + len - 1) % 12) + 1
		const a = q.monthsLong[cur - 1]
		ranges.push(len === 1 ? a : `${a} – ${q.monthsLong[end - 1]}`)
		m += len
		i += len
	}
	return ranges.join(", ")
}

export interface MonthRow {
	month: number
	highlights: { id: AnimalId; peak: boolean; maybe: boolean }[]
	seasonalTours: TourId[]
	sealionNoSwim: boolean
}

/** Tabla mes por mes: lo que solo pasa en algunos meses (lo de todo el año va aparte). */
export function monthRows(): MonthRow[] {
	return Array.from({ length: 12 }, (_, i) => {
		const month = i + 1
		const highlights: MonthRow["highlights"] = []
		for (const a of ANIMALS) {
			const spots = a.where.filter((s) => s.months.includes(month))
			if (!spots.length) continue
			const seasonal = spots.some((s) => s.months.length < 12)
			// Lo ocasional (orcas, cachalotes…) nunca se anuncia como "temporada alta".
			const peak = spots.some((s) => !s.maybe && s.peak?.includes(month) && s.peak.length < 12)
			if (!seasonal && !peak) continue
			highlights.push({ id: a.id, peak, maybe: spots.every((s) => s.maybe) })
		}
		highlights.sort((x, y) => Number(y.peak) - Number(x.peak) || Number(x.maybe) - Number(y.maybe))
		const seasonalTours = TOURS.filter((t) => t.months.length < 12 && t.months.includes(month)).map((t) => t.id)
		return { month, highlights, seasonalTours, sealionNoSwim: SEA_LION_NO_SWIM.includes(month) }
	})
}

export const allYearTours = (): TourId[] => TOURS.filter((t) => t.months.length === 12).map((t) => t.id)

export function toursForMode(mode: Mode): FinderTour[] {
	return TOURS.filter((t) => t.modes[mode])
}

export interface AnimalGuide {
	id: AnimalId
	image: string
	spots: { tour: TourId; modes: Mode[]; months: number[]; peak?: number[]; maybe?: boolean }[]
}

export function animalGuides(): AnimalGuide[] {
	return ANIMALS.map((a) => ({
		id: a.id,
		image: a.image,
		spots: a.where.filter((s, i, arr) => arr.findIndex((x) => x.tour === s.tour) === i),
	}))
}

// ---------------------------------------------------------------------------
// Textos de la guía por idioma
// ---------------------------------------------------------------------------

export interface Helpers {
	q: QuizDict
	name: (id: TourId) => string
	price: (id: TourId, mode?: Mode) => string
	range: (months: number[]) => string
	animal: (id: AnimalId) => string
	mode: (m: Mode) => string
}

export function helpers(locale: Locale): Helpers {
	const q = quizDicts[locale] || quizDicts.es
	return {
		q,
		name: (id) => q.tours[id].name,
		price: (id, mode) => {
			const t = tourById(id)
			const p = mode ? t.modes[mode] : undefined
			return mxn(p ? p.mxn : minPrice(t))
		},
		range: (months) => monthRanges(months, q),
		animal: (id) => q.animals[id],
		mode: (m) => q.modes[m].badge,
	}
}

export interface GuideText {
	metaTitle: string
	metaDesc: string
	breadcrumb: string
	kicker: string
	h1: string
	lead: string
	quickTitle: string
	quickWhale: (h: Helpers) => string
	quickShark: (h: Helpers) => string
	quickMobula: (h: Helpers) => string
	quickSardine: (h: Helpers) => string
	quickAllYear: (h: Helpers, names: string) => string
	quizTitle: string
	quizSub: string
	monthTitle: string
	monthIntro: string
	colMonth: string
	colHighlights: string
	colTours: string
	peak: string
	maybe: string
	sealionNoSwim: string
	allYearRow: (names: string) => string
	modeTitle: string
	modeIntro: string
	colTour: string
	colPrice: string
	colDuration: string
	colSeason: string
	colAge: string
	ageFamily: string
	ageMin: (n: number) => string
	agePrivate: string
	animalTitle: string
	animalIntro: string
	animalWhere: (tour: string, mode: string, range: string) => string
	animalPeak: (range: string) => string
	animalMaybe: string
	situationsTitle: string
	situations: (h: Helpers) => { title: string; text: string }[]
	faqTitle: string
	faqs: (h: Helpers) => { q: string; a: string }[]
	ctaTitle: string
	ctaText: string
	ctaWa: string
	waText: string
	view: string
	updated: string
}

const lvMob = () => ANIMALS.find((a) => a.id === "mobula")!.where[0]
const shark = () => tourById("tiburon-ballena")
const gray = () => tourById("tour-ballena-gris")
const bm = () => tourById("safari-bahia-magdalena")

const es: GuideText = {
	metaTitle: "Qué hacer en La Paz y La Ventana: qué tour elegir según el mes",
	metaDesc: "Guía honesta para elegir tour en La Paz y La Ventana, BCS: qué animales ves cada mes (tiburón ballena, ballena gris, móbulas, lobos marinos), si es en lancha, snorkel o buceo, precios, duración y edad mínima.",
	breadcrumb: "Qué hacer en La Paz",
	kicker: "Guía para elegir tu tour",
	h1: "Qué hacer en La Paz y La Ventana: qué tour elegir según tu mes",
	lead: "Elegir bien depende de tres cosas: el mes en que vienes, cómo quieres vivir el mar (desde la lancha, con snorkel o buceando) y qué animal te gustaría ver. Aquí está todo, mes por mes, con precios reales y sin promesas que el mar no puede cumplir.",
	quickTitle: "Respuesta rápida",
	quickWhale: (h) => `${h.range(gray().months)}: ballena gris con sus crías en Puerto Chale, todo desde la lancha (${h.name("tour-ballena-gris")}, desde ${h.price("tour-ballena-gris")}).`,
	quickShark: (h) => `${h.range(shark().months)}: nado con tiburón ballena en La Paz con snorkel, 2 a 3 h (${h.price("tiburon-ballena")}).`,
	quickMobula: (h) => `${h.range(lvMob().peak!)}: temporada alta de móbulas en La Ventana (${h.name("safari-la-ventana")}, ${h.price("safari-la-ventana")}).`,
	quickSardine: (h) => `${h.range(bm().months)}: Sardine Run en Bahía Magdalena, snorkel en mar abierto con marlines y sardinas (${h.price("safari-bahia-magdalena")}).`,
	quickAllYear: (_h, names) => `Todo el año: ${names}.`,
	quizTitle: "Haz el cuestionario (30 segundos)",
	quizSub: "Con fotos: tu mes, cómo quieres vivir el mar, quién viene y qué animal te gustaría ver. Solo te mostramos lo que de verdad puedes hacer en tu fecha.",
	monthTitle: "Qué ver en La Paz mes por mes",
	monthIntro: "Solo lo que cambia con la temporada. Lo que se puede hacer todo el año está en la última fila.",
	colMonth: "Mes",
	colHighlights: "Lo que puedes ver",
	colTours: "Tours de temporada",
	peak: "temporada alta",
	maybe: "ocasional",
	sealionNoSwim: "Lobos marinos solo desde la lancha (temporada reproductiva).",
	allYearRow: (n) => `Todo el año: ${n}.`,
	modeTitle: "Según cómo quieres vivir el mar",
	modeIntro: "No es lo mismo ver desde la lancha que hacer snorkel o bucear. Cada tour está en la modalidad que realmente ofrece.",
	colTour: "Tour",
	colPrice: "Precio por persona",
	colDuration: "Duración",
	colSeason: "Temporada",
	colAge: "Edad",
	ageFamily: "Apto para familias",
	ageMin: (n) => `${n} años o más`,
	agePrivate: "14+ (menores, en privado)",
	animalTitle: "Según el animal que quieres ver",
	animalIntro: "Dónde, cómo y cuándo. Ningún avistamiento de fauna silvestre se puede garantizar.",
	animalWhere: (t, m, r) => `${t} · ${m} · ${r}`,
	animalPeak: (r) => `más probabilidad: ${r}`,
	animalMaybe: "puede aparecer, no es el objetivo del tour",
	situationsTitle: "Casos comunes",
	situations: (h) => [
		{ title: "Con niños", text: `Menores de 12: ${h.name("tour-espiritu-santo")} (niños de 0 a 3 años gratis) y ${h.name("tour-ballena-gris")} (${h.range(gray().months)}). Desde 12 años: ${h.name("tiburon-ballena")}, ${h.name("scuba-discovery")} y el buceo. ${h.name("safari-la-ventana")}: 14 años en salida compartida; con menores de 14, solo en privado.` },
		{ title: "Si tienes pocas horas", text: `${h.name("tiburon-ballena")} dura 2 a 3 h (${h.range(shark().months)}) y ${h.name("scuba-discovery")} unas 4 h, todo el año.` },
		{ title: "Si no quieres meterte al agua", text: `${h.name("tour-ballena-gris")} es todo desde la lancha (${h.range(gray().months)}). En ${h.name("safari-la-ventana")} puedes quedarte en la lancha durante los encuentros.` },
		{ title: "Si nunca has buceado", text: `${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, máximo 6 m, sin certificación). También hay Discovery en Espíritu Santo (${h.price("buceo-la-paz", "firstDive")}) y en Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). Para certificarte: ${h.name("certificacion-open-water")} (${h.price("certificacion-open-water")}).` },
		{ title: "La Paz o La Ventana", text: `Desde La Paz salen Espíritu Santo (snorkel y buceo) y el tiburón ballena. ${h.name("safari-la-ventana")} sale de La Ventana; podemos organizar transporte redondo desde La Paz por $1,000 MXN adicionales (hasta 4 personas, sujeto a disponibilidad). Cabo Pulmo no incluye transporte desde La Paz.` },
	],
	faqTitle: "Preguntas frecuentes",
	faqs: (h) => [
		{ q: "¿Qué hacer en La Paz, Baja California Sur?", a: `Lo mejor de La Paz está en el mar y depende del mes: nadar con tiburón ballena (${h.range(shark().months)}), ver ballena gris en Puerto Chale (${h.range(gray().months)}), el Sardine Run en Bahía Magdalena (${h.range(bm().months)}) y, todo el año, snorkel con lobos marinos en Isla Espíritu Santo, buceo y el safari de La Ventana.` },
		{ q: "¿Qué hacer en La Ventana?", a: `${h.name("safari-la-ventana")}: 6 h en lancha por el canal de Cerralvo buscando móbulas (más probabilidad ${h.range(lvMob().peak!)}), delfines, lobos marinos y ballenas (${h.range([11, 12, 1, 2, 3, 4])}). Hay entradas de snorkel cuando es seguro, pero puedes quedarte en la lancha. ${h.price("safari-la-ventana")} por persona; 14 años o más en salida compartida.` },
		{ q: "¿Cuál es el mejor mes para ir a La Paz?", a: `Depende de lo que quieras ver. ${h.range(gray().months)}: ballena gris. ${h.range(shark().months)}: tiburón ballena. ${h.range(lvMob().peak!)}: móbulas en La Ventana. ${h.range(bm().months)}: Sardine Run. Isla Espíritu Santo y el buceo, todo el año (entre junio y agosto los lobos marinos se observan desde la lancha).` },
		{ q: "¿Cuándo es la temporada del tiburón ballena en La Paz?", a: `De ${h.range(shark().months)}. Es nado con snorkel de 2 a 3 h desde el malecón, ${h.price("tiburon-ballena")} por persona y edad mínima de 12 años.` },
		{ q: "¿Cuándo se ven las ballenas grises?", a: `De ${h.range(gray().months)} en Puerto Chale. Es todo desde la lancha, unas 9 h con el traslado desde La Paz, desde ${h.price("tour-ballena-gris")} por persona. Apto para familias.` },
		{ q: "¿Se puede nadar con lobos marinos en Isla Espíritu Santo?", a: "Sí, todo el año excepto de junio a agosto: es su temporada reproductiva y en esos meses se observan desde la lancha." },
		{ q: "¿Se ven orcas en La Paz o La Ventana?", a: quizDicts.es.notes.orca },
		{ q: "¿Qué tour hacer si no sé nadar o no quiero meterme al agua?", a: `${h.name("tour-ballena-gris")} (${h.range(gray().months)}) es todo desde la lancha. En ${h.name("safari-la-ventana")} puedes quedarte en la lancha. Avísanos antes de reservar si alguien no sabe nadar.` },
		{ q: "¿Qué hacer en La Paz con niños?", a: `Con menores de 12: ${h.name("tour-espiritu-santo")} (0 a 3 años gratis) o la ballena gris (${h.range(gray().months)}). Desde 12 años: tiburón ballena, Scuba Discovery y buceo. La Ventana: 14 años en compartido; menores, en privado.` },
		{ q: "¿Puedo bucear sin certificación?", a: `Sí. ${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, máximo 6 m, instructor contigo), Discovery en Espíritu Santo (${h.price("buceo-la-paz", "firstDive")}) o en Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). Edad mínima 12 años.` },
		{ q: "¿Qué hago si solo tengo unas horas en La Paz?", a: `${h.name("tiburon-ballena")} (2 a 3 h, ${h.range(shark().months)}) o ${h.name("scuba-discovery")} (unas 4 h, todo el año).` },
		{ q: "¿Cuánto cuestan los tours en La Paz?", a: TOURS.map((t) => `${h.name(t.id)}: ${t.modes.boat?.from ? "desde " : ""}${h.price(t.id)}`).join("; ") + ". Precios por persona." },
	],
	ctaTitle: "¿Dudas? Te ayudamos a elegir",
	ctaText: "Escríbenos por WhatsApp con tus fechas y quién viene, y te decimos con honestidad qué vale la pena.",
	ctaWa: "Escribir por WhatsApp",
	waText: "Hola! Estoy viendo la guía de qué hacer en La Paz y quiero ayuda para elegir tour.",
	view: "Ver expedición",
	updated: "Precios y temporadas tomados de cada expedición de Keabelmet.",
}

const en: GuideText = {
	metaTitle: "Things to do in La Paz and La Ventana: which tour to choose by month",
	metaDesc: "An honest guide to choosing a tour in La Paz and La Ventana, BCS: which animals you can see each month (whale sharks, gray whales, mobula rays, sea lions), boat vs snorkel vs diving, prices, duration and minimum age.",
	breadcrumb: "Things to do in La Paz",
	kicker: "Guide to choosing your tour",
	h1: "Things to do in La Paz and La Ventana: which tour to choose for your month",
	lead: "Choosing well depends on three things: the month you're coming, how you want to experience the sea (from the boat, snorkeling or diving) and which animal you'd love to see. Here it all is, month by month, with real prices and no promises the sea can't keep.",
	quickTitle: "Quick answer",
	quickWhale: (h) => `${h.range(gray().months)}: gray whale mothers and calves in Puerto Chale, all from the boat (${h.name("tour-ballena-gris")}, from ${h.price("tour-ballena-gris")}).`,
	quickShark: (h) => `${h.range(shark().months)}: swim with whale sharks in La Paz, snorkeling, 2 to 3 h (${h.price("tiburon-ballena")}).`,
	quickMobula: (h) => `${h.range(lvMob().peak!)}: peak mobula ray season in La Ventana (${h.name("safari-la-ventana")}, ${h.price("safari-la-ventana")}).`,
	quickSardine: (h) => `${h.range(bm().months)}: the Sardine Run in Magdalena Bay, open-water snorkeling with marlin and sardines (${h.price("safari-bahia-magdalena")}).`,
	quickAllYear: (_h, names) => `All year: ${names}.`,
	quizTitle: "Take the quiz (30 seconds)",
	quizSub: "With photos: your month, how you want to experience the sea, who's coming and which animal you'd love to see. We only show what you can really do on your dates.",
	monthTitle: "What to see in La Paz month by month",
	monthIntro: "Only what changes with the season. Year-round options are in the last row.",
	colMonth: "Month",
	colHighlights: "What you can see",
	colTours: "Seasonal tours",
	peak: "peak season",
	maybe: "occasional",
	sealionNoSwim: "Sea lions from the boat only (breeding season).",
	allYearRow: (n) => `All year: ${n}.`,
	modeTitle: "By how you want to experience the sea",
	modeIntro: "Watching from the boat is not the same as snorkeling or diving. Each tour is listed under what it really offers.",
	colTour: "Tour",
	colPrice: "Price per person",
	colDuration: "Duration",
	colSeason: "Season",
	colAge: "Age",
	ageFamily: "Family friendly",
	ageMin: (n) => `${n}+`,
	agePrivate: "14+ (younger, private only)",
	animalTitle: "By the animal you want to see",
	animalIntro: "Where, how and when. No wildlife sighting can ever be guaranteed.",
	animalWhere: (t, m, r) => `${t} · ${m} · ${r}`,
	animalPeak: (r) => `best chances: ${r}`,
	animalMaybe: "may appear, not the goal of the tour",
	situationsTitle: "Common situations",
	situations: (h) => [
		{ title: "With kids", text: `Under 12: ${h.name("tour-espiritu-santo")} (ages 0 to 3 free) and ${h.name("tour-ballena-gris")} (${h.range(gray().months)}). From age 12: ${h.name("tiburon-ballena")}, ${h.name("scuba-discovery")} and diving. ${h.name("safari-la-ventana")}: 14+ on shared trips; with kids under 14, private only.` },
		{ title: "If you only have a few hours", text: `${h.name("tiburon-ballena")} takes 2 to 3 h (${h.range(shark().months)}) and ${h.name("scuba-discovery")} about 4 h, all year.` },
		{ title: "If you don't want to get in the water", text: `${h.name("tour-ballena-gris")} is all from the boat (${h.range(gray().months)}). On ${h.name("safari-la-ventana")} you can stay on the boat during encounters.` },
		{ title: "If you've never dived", text: `${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, 6 m max, no certification). There's also Discovery at Espiritu Santo (${h.price("buceo-la-paz", "firstDive")}) and Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). To get certified: ${h.name("certificacion-open-water")} (${h.price("certificacion-open-water")}).` },
		{ title: "La Paz or La Ventana", text: `Espiritu Santo (snorkeling and diving) and the whale shark tour leave from La Paz. ${h.name("safari-la-ventana")} leaves from La Ventana; we can arrange round-trip transport from La Paz for an extra $1,000 MXN (up to 4 people, subject to availability). Cabo Pulmo doesn't include transport from La Paz.` },
	],
	faqTitle: "Frequently asked questions",
	faqs: (h) => [
		{ q: "What is there to do in La Paz, Baja California Sur?", a: `The best of La Paz is in the sea, and it depends on the month: swimming with whale sharks (${h.range(shark().months)}), gray whales in Puerto Chale (${h.range(gray().months)}), the Sardine Run in Magdalena Bay (${h.range(bm().months)}) and, all year, snorkeling with sea lions at Espiritu Santo Island, diving and the La Ventana safari.` },
		{ q: "What is there to do in La Ventana?", a: `${h.name("safari-la-ventana")}: 6 h on a boat through the Cerralvo channel looking for mobula rays (best chances ${h.range(lvMob().peak!)}), dolphins, sea lions and whales (${h.range([11, 12, 1, 2, 3, 4])}). There are snorkel entries when it's safe, but you can stay on the boat. ${h.price("safari-la-ventana")} per person; 14+ on shared trips.` },
		{ q: "What is the best month to visit La Paz?", a: `It depends on what you want to see. ${h.range(gray().months)}: gray whales. ${h.range(shark().months)}: whale sharks. ${h.range(lvMob().peak!)}: mobula rays in La Ventana. ${h.range(bm().months)}: the Sardine Run. Espiritu Santo Island and diving, all year (from June to August sea lions are watched from the boat).` },
		{ q: "When is whale shark season in La Paz?", a: `${h.range(shark().months)}. It's a 2 to 3 h snorkel swim from the malecón, ${h.price("tiburon-ballena")} per person, minimum age 12.` },
		{ q: "When can you see gray whales?", a: `${h.range(gray().months)} in Puerto Chale. It's all from the boat, about 9 h including transfer from La Paz, from ${h.price("tour-ballena-gris")} per person. Family friendly.` },
		{ q: "Can you swim with sea lions at Espiritu Santo Island?", a: "Yes, all year except June to August: it's their breeding season and during those months they're watched from the boat." },
		{ q: "Can you see orcas in La Paz or La Ventana?", a: quizDicts.en.notes.orca },
		{ q: "Which tour if I can't swim or don't want to get in the water?", a: `${h.name("tour-ballena-gris")} (${h.range(gray().months)}) is all from the boat. On ${h.name("safari-la-ventana")} you can stay on the boat. Let us know before booking if someone can't swim.` },
		{ q: "What to do in La Paz with kids?", a: `Under 12: ${h.name("tour-espiritu-santo")} (ages 0 to 3 free) or the gray whales (${h.range(gray().months)}). From 12: whale sharks, Scuba Discovery and diving. La Ventana: 14+ on shared trips; younger kids, private only.` },
		{ q: "Can I dive without certification?", a: `Yes. ${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, 6 m max, instructor with you), Discovery at Espiritu Santo (${h.price("buceo-la-paz", "firstDive")}) or Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). Minimum age 12.` },
		{ q: "What can I do if I only have a few hours in La Paz?", a: `${h.name("tiburon-ballena")} (2 to 3 h, ${h.range(shark().months)}) or ${h.name("scuba-discovery")} (about 4 h, all year).` },
		{ q: "How much do tours in La Paz cost?", a: TOURS.map((t) => `${h.name(t.id)}: ${t.modes.boat?.from ? "from " : ""}${h.price(t.id)}`).join("; ") + ". Prices per person." },
	],
	ctaTitle: "Still unsure? We'll help you choose",
	ctaText: "Message us on WhatsApp with your dates and who's coming, and we'll honestly tell you what's worth it.",
	ctaWa: "Message us on WhatsApp",
	waText: "Hi! I'm reading the guide on things to do in La Paz and I'd like help choosing a tour.",
	view: "View expedition",
	updated: "Prices and seasons taken from each Keabelmet expedition.",
}

const fr: GuideText = {
	metaTitle: "Que faire à La Paz et La Ventana : quelle excursion choisir selon le mois",
	metaDesc: "Guide honnête pour choisir une excursion à La Paz et La Ventana, BCS : quels animaux voir chaque mois (requin-baleine, baleine grise, mobules, otaries), bateau, snorkeling ou plongée, prix, durée et âge minimum.",
	breadcrumb: "Que faire à La Paz",
	kicker: "Guide pour choisir votre excursion",
	h1: "Que faire à La Paz et La Ventana : quelle excursion choisir selon votre mois",
	lead: "Bien choisir dépend de trois choses : le mois de votre venue, votre façon de vivre la mer (depuis le bateau, en snorkeling ou en plongée) et l'animal que vous aimeriez voir. Voici tout, mois par mois, avec les vrais prix et sans promesses que la mer ne peut pas tenir.",
	quickTitle: "Réponse rapide",
	quickWhale: (h) => `${h.range(gray().months)} : mères et baleineaux gris à Puerto Chale, tout depuis le bateau (${h.name("tour-ballena-gris")}, dès ${h.price("tour-ballena-gris")}).`,
	quickShark: (h) => `${h.range(shark().months)} : nager avec le requin-baleine à La Paz en snorkeling, 2 à 3 h (${h.price("tiburon-ballena")}).`,
	quickMobula: (h) => `${h.range(lvMob().peak!)} : haute saison des mobules à La Ventana (${h.name("safari-la-ventana")}, ${h.price("safari-la-ventana")}).`,
	quickSardine: (h) => `${h.range(bm().months)} : le Sardine Run à Bahía Magdalena, snorkeling en pleine mer avec marlins et sardines (${h.price("safari-bahia-magdalena")}).`,
	quickAllYear: (_h, names) => `Toute l'année : ${names}.`,
	quizTitle: "Faites le quiz (30 secondes)",
	quizSub: "En photos : votre mois, votre façon de vivre la mer, qui vient et l'animal que vous aimeriez voir. Nous ne montrons que ce qui est vraiment possible à vos dates.",
	monthTitle: "Que voir à La Paz mois par mois",
	monthIntro: "Seulement ce qui change selon la saison. Ce qui se fait toute l'année est sur la dernière ligne.",
	colMonth: "Mois",
	colHighlights: "Ce que vous pouvez voir",
	colTours: "Excursions de saison",
	peak: "haute saison",
	maybe: "occasionnel",
	sealionNoSwim: "Otaries seulement depuis le bateau (saison de reproduction).",
	allYearRow: (n) => `Toute l'année : ${n}.`,
	modeTitle: "Selon votre façon de vivre la mer",
	modeIntro: "Observer depuis le bateau n'est pas la même chose que faire du snorkeling ou plonger. Chaque excursion est classée selon ce qu'elle offre vraiment.",
	colTour: "Excursion",
	colPrice: "Prix par personne",
	colDuration: "Durée",
	colSeason: "Saison",
	colAge: "Âge",
	ageFamily: "Idéal en famille",
	ageMin: (n) => `${n} ans et plus`,
	agePrivate: "14+ (plus jeunes, en privé)",
	animalTitle: "Selon l'animal que vous voulez voir",
	animalIntro: "Où, comment et quand. Aucune observation de faune sauvage ne peut être garantie.",
	animalWhere: (t, m, r) => `${t} · ${m} · ${r}`,
	animalPeak: (r) => `plus de chances : ${r}`,
	animalMaybe: "peut apparaître, ce n'est pas le but de l'excursion",
	situationsTitle: "Cas fréquents",
	situations: (h) => [
		{ title: "Avec des enfants", text: `Moins de 12 ans : ${h.name("tour-espiritu-santo")} (gratuit de 0 à 3 ans) et ${h.name("tour-ballena-gris")} (${h.range(gray().months)}). Dès 12 ans : ${h.name("tiburon-ballena")}, ${h.name("scuba-discovery")} et la plongée. ${h.name("safari-la-ventana")} : 14 ans en sortie partagée ; avec des moins de 14 ans, uniquement en privé.` },
		{ title: "Si vous avez peu de temps", text: `${h.name("tiburon-ballena")} dure 2 à 3 h (${h.range(shark().months)}) et ${h.name("scuba-discovery")} environ 4 h, toute l'année.` },
		{ title: "Si vous ne voulez pas entrer dans l'eau", text: `${h.name("tour-ballena-gris")} se fait entièrement depuis le bateau (${h.range(gray().months)}). Pendant ${h.name("safari-la-ventana")}, vous pouvez rester sur le bateau.` },
		{ title: "Si vous n'avez jamais plongé", text: `${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, 6 m max, sans certification). Il y a aussi un baptême à Espíritu Santo (${h.price("buceo-la-paz", "firstDive")}) et à Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). Pour vous certifier : ${h.name("certificacion-open-water")} (${h.price("certificacion-open-water")}).` },
		{ title: "La Paz ou La Ventana", text: `Espíritu Santo (snorkeling et plongée) et le requin-baleine partent de La Paz. ${h.name("safari-la-ventana")} part de La Ventana ; nous pouvons organiser le transport aller-retour depuis La Paz pour 1 000 MXN de plus (jusqu'à 4 personnes, selon disponibilité). Cabo Pulmo n'inclut pas de transport depuis La Paz.` },
	],
	faqTitle: "Questions fréquentes",
	faqs: (h) => [
		{ q: "Que faire à La Paz, Basse-Californie du Sud ?", a: `Le meilleur de La Paz est en mer et dépend du mois : nager avec le requin-baleine (${h.range(shark().months)}), la baleine grise à Puerto Chale (${h.range(gray().months)}), le Sardine Run à Bahía Magdalena (${h.range(bm().months)}) et, toute l'année, le snorkeling avec les otaries à l'île Espíritu Santo, la plongée et le safari de La Ventana.` },
		{ q: "Que faire à La Ventana ?", a: `${h.name("safari-la-ventana")} : 6 h en bateau dans le canal de Cerralvo à la recherche de mobules (plus de chances ${h.range(lvMob().peak!)}), dauphins, otaries et baleines (${h.range([11, 12, 1, 2, 3, 4])}). Mises à l'eau en snorkeling quand c'est sûr, mais vous pouvez rester sur le bateau. ${h.price("safari-la-ventana")} par personne ; 14 ans et plus en sortie partagée.` },
		{ q: "Quel est le meilleur mois pour aller à La Paz ?", a: `Cela dépend de ce que vous voulez voir. ${h.range(gray().months)} : baleine grise. ${h.range(shark().months)} : requin-baleine. ${h.range(lvMob().peak!)} : mobules à La Ventana. ${h.range(bm().months)} : Sardine Run. L'île Espíritu Santo et la plongée, toute l'année (de juin à août, les otaries s'observent depuis le bateau).` },
		{ q: "Quand est la saison du requin-baleine à La Paz ?", a: `De ${h.range(shark().months)}. Snorkeling de 2 à 3 h depuis le malecón, ${h.price("tiburon-ballena")} par personne, à partir de 12 ans.` },
		{ q: "Quand voir les baleines grises ?", a: `De ${h.range(gray().months)} à Puerto Chale. Tout depuis le bateau, environ 9 h avec le transfert depuis La Paz, dès ${h.price("tour-ballena-gris")} par personne. Idéal en famille.` },
		{ q: "Peut-on nager avec les otaries à l'île Espíritu Santo ?", a: "Oui, toute l'année sauf de juin à août : c'est leur saison de reproduction et on les observe alors depuis le bateau." },
		{ q: "Voit-on des orques à La Paz ou La Ventana ?", a: quizDicts.fr.notes.orca },
		{ q: "Quelle excursion si je ne sais pas nager ou ne veux pas entrer dans l'eau ?", a: `${h.name("tour-ballena-gris")} (${h.range(gray().months)}) se fait entièrement depuis le bateau. Pendant ${h.name("safari-la-ventana")}, vous pouvez rester sur le bateau. Prévenez-nous avant de réserver si quelqu'un ne sait pas nager.` },
		{ q: "Que faire à La Paz avec des enfants ?", a: `Moins de 12 ans : ${h.name("tour-espiritu-santo")} (gratuit de 0 à 3 ans) ou la baleine grise (${h.range(gray().months)}). Dès 12 ans : requin-baleine, baptême et plongée. La Ventana : 14 ans en sortie partagée ; plus jeunes, en privé.` },
		{ q: "Puis-je plonger sans certification ?", a: `Oui. ${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, 6 m max, instructeur avec vous), baptême à Espíritu Santo (${h.price("buceo-la-paz", "firstDive")}) ou à Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). À partir de 12 ans.` },
		{ q: "Que faire si je n'ai que quelques heures à La Paz ?", a: `${h.name("tiburon-ballena")} (2 à 3 h, ${h.range(shark().months)}) ou ${h.name("scuba-discovery")} (environ 4 h, toute l'année).` },
		{ q: "Combien coûtent les excursions à La Paz ?", a: TOURS.map((t) => `${h.name(t.id)} : ${t.modes.boat?.from ? "dès " : ""}${h.price(t.id)}`).join(" ; ") + ". Prix par personne." },
	],
	ctaTitle: "Encore un doute ? On vous aide à choisir",
	ctaText: "Écrivez-nous sur WhatsApp avec vos dates et qui vient, et nous vous dirons honnêtement ce qui vaut la peine.",
	ctaWa: "Écrire sur WhatsApp",
	waText: "Bonjour ! Je lis le guide « Que faire à La Paz » et j'aimerais de l'aide pour choisir une excursion.",
	view: "Voir l'expédition",
	updated: "Prix et saisons tirés de chaque expédition Keabelmet.",
}

const zh: GuideText = {
	metaTitle: "拉巴斯和拉文塔纳玩什么：按月份选择行程",
	metaDesc: "拉巴斯和拉文塔纳（南下加利福尼亚州）行程选择指南：每个月能看到哪些动物（鲸鲨、灰鲸、蝠鲼、海狮），船上观赏、浮潜还是潜水，价格、时长和最低年龄。",
	breadcrumb: "拉巴斯玩什么",
	kicker: "行程选择指南",
	h1: "拉巴斯和拉文塔纳玩什么：按你的月份选择行程",
	lead: "选对行程取决于三件事：你几月来、你想怎样体验大海（在船上、浮潜或潜水）、你最想看到哪种动物。这里按月份列出一切，价格真实，不做大海无法兑现的承诺。",
	quickTitle: "快速回答",
	quickWhale: (h) => `${h.range(gray().months)}：在查莱港观赏灰鲸母子，全程在船上（${h.name("tour-ballena-gris")}，${h.price("tour-ballena-gris")}起）。`,
	quickShark: (h) => `${h.range(shark().months)}：在拉巴斯浮潜与鲸鲨同游，2到3小时（${h.price("tiburon-ballena")}）。`,
	quickMobula: (h) => `${h.range(lvMob().peak!)}：拉文塔纳蝠鲼旺季（${h.name("safari-la-ventana")}，${h.price("safari-la-ventana")}）。`,
	quickSardine: (h) => `${h.range(bm().months)}：马格达莱纳湾沙丁鱼洄游，在开阔海域与马林鱼和沙丁鱼一起浮潜（${h.price("safari-bahia-magdalena")}）。`,
	quickAllYear: (_h, names) => `全年：${names}。`,
	quizTitle: "做个小测验（30秒）",
	quizSub: "用图片选择：你的月份、体验大海的方式、同行的人和想看的动物。我们只显示你的日期里真正能参加的行程。",
	monthTitle: "拉巴斯每月能看到什么",
	monthIntro: "只列出随季节变化的内容。全年都能参加的行程在最后一行。",
	colMonth: "月份",
	colHighlights: "能看到什么",
	colTours: "季节性行程",
	peak: "旺季",
	maybe: "偶尔出现",
	sealionNoSwim: "海狮只能在船上观赏（繁殖季）。",
	allYearRow: (n) => `全年：${n}。`,
	modeTitle: "按体验大海的方式",
	modeIntro: "在船上观赏、浮潜和潜水是不同的体验。每个行程都按它真正提供的方式分类。",
	colTour: "行程",
	colPrice: "每人价格",
	colDuration: "时长",
	colSeason: "季节",
	colAge: "年龄",
	ageFamily: "适合家庭",
	ageMin: (n) => `${n}岁以上`,
	agePrivate: "14岁以上（更小的孩子需包船）",
	animalTitle: "按你想看的动物",
	animalIntro: "在哪里、怎么看、什么时候。野生动物的出现永远无法保证。",
	animalWhere: (t, m, r) => `${t} · ${m} · ${r}`,
	animalPeak: (r) => `概率最高：${r}`,
	animalMaybe: "可能出现，但不是行程的主要目标",
	situationsTitle: "常见情况",
	situations: (h) => [
		{ title: "带孩子", text: `12岁以下：${h.name("tour-espiritu-santo")}（0至3岁免费）和${h.name("tour-ballena-gris")}（${h.range(gray().months)}）。12岁起：${h.name("tiburon-ballena")}、${h.name("scuba-discovery")}和潜水。${h.name("safari-la-ventana")}：拼团需满14岁；有14岁以下儿童时仅限包船。` },
		{ title: "时间不多", text: `${h.name("tiburon-ballena")}约2到3小时（${h.range(shark().months)}），${h.name("scuba-discovery")}约4小时，全年开放。` },
		{ title: "不想下水", text: `${h.name("tour-ballena-gris")}全程在船上（${h.range(gray().months)}）。参加${h.name("safari-la-ventana")}时也可以留在船上。` },
		{ title: "从没潜过水", text: `${h.name("scuba-discovery")}（${h.price("scuba-discovery")}，最深6米，无需证书）。圣灵岛（${h.price("buceo-la-paz", "firstDive")}）和卡波普尔莫（${h.price("buceo-cabo-pulmo", "firstDive")}）也有体验潜水。想考证：${h.name("certificacion-open-water")}（${h.price("certificacion-open-water")}）。` },
		{ title: "拉巴斯还是拉文塔纳", text: `圣灵岛（浮潜和潜水）和鲸鲨行程从拉巴斯出发。${h.name("safari-la-ventana")}从拉文塔纳出发；可安排拉巴斯往返交通，另加1,000墨西哥比索（最多4人，视情况而定）。卡波普尔莫不含从拉巴斯出发的交通。` },
	],
	faqTitle: "常见问题",
	faqs: (h) => [
		{ q: "在南下加利福尼亚州的拉巴斯可以做什么？", a: `拉巴斯最精彩的在海上，而且取决于月份：与鲸鲨同游（${h.range(shark().months)}）、在查莱港看灰鲸（${h.range(gray().months)}）、马格达莱纳湾沙丁鱼洄游（${h.range(bm().months)}），以及全年都可以在圣灵岛与海狮浮潜、潜水和拉文塔纳海洋探险。` },
		{ q: "在拉文塔纳可以做什么？", a: `${h.name("safari-la-ventana")}：乘船6小时穿越塞拉尔沃海峡，寻找蝠鲼（概率最高：${h.range(lvMob().peak!)}）、海豚、海狮和鲸鱼（${h.range([11, 12, 1, 2, 3, 4])}）。安全时会下水浮潜，但你也可以留在船上。每人${h.price("safari-la-ventana")}；拼团需满14岁。` },
		{ q: "去拉巴斯最好的月份是几月？", a: `取决于你想看什么。${h.range(gray().months)}：灰鲸。${h.range(shark().months)}：鲸鲨。${h.range(lvMob().peak!)}：拉文塔纳的蝠鲼。${h.range(bm().months)}：沙丁鱼洄游。圣灵岛和潜水全年都可以（6月至8月海狮只能在船上观赏）。` },
		{ q: "拉巴斯的鲸鲨季是什么时候？", a: `${h.range(shark().months)}。从海滨大道出发浮潜2到3小时，每人${h.price("tiburon-ballena")}，最低年龄12岁。` },
		{ q: "什么时候能看到灰鲸？", a: `${h.range(gray().months)}，在查莱港。全程在船上，含拉巴斯往返约9小时，每人${h.price("tour-ballena-gris")}起。适合家庭。` },
		{ q: "在圣灵岛可以和海狮一起游泳吗？", a: "可以，全年都行，6月至8月除外：那是它们的繁殖季，这几个月只能在船上观赏。" },
		{ q: "在拉巴斯或拉文塔纳能看到虎鲸吗？", a: quizDicts.zh.notes.orca },
		{ q: "不会游泳或不想下水，选哪个行程？", a: `${h.name("tour-ballena-gris")}（${h.range(gray().months)}）全程在船上。参加${h.name("safari-la-ventana")}也可以留在船上。如有人不会游泳，请在预订前告诉我们。` },
		{ q: "带孩子在拉巴斯玩什么？", a: `12岁以下：${h.name("tour-espiritu-santo")}（0至3岁免费）或灰鲸（${h.range(gray().months)}）。12岁起：鲸鲨、体验潜水和潜水。拉文塔纳：拼团需满14岁，更小的孩子需包船。` },
		{ q: "没有潜水证可以潜水吗？", a: `可以。${h.name("scuba-discovery")}（${h.price("scuba-discovery")}，最深6米，教练陪同），圣灵岛体验潜水（${h.price("buceo-la-paz", "firstDive")}）或卡波普尔莫体验潜水（${h.price("buceo-cabo-pulmo", "firstDive")}）。最低年龄12岁。` },
		{ q: "在拉巴斯只有几个小时，能做什么？", a: `${h.name("tiburon-ballena")}（2到3小时，${h.range(shark().months)}）或${h.name("scuba-discovery")}（约4小时，全年）。` },
		{ q: "拉巴斯的行程多少钱？", a: TOURS.map((t) => `${h.name(t.id)}：${h.price(t.id)}${t.modes.boat?.from ? "起" : ""}`).join("；") + "。均为每人价格。" },
	],
	ctaTitle: "还拿不定主意？我们帮你选",
	ctaText: "通过 WhatsApp 告诉我们你的日期和同行的人，我们会如实告诉你哪些值得。",
	ctaWa: "通过 WhatsApp 联系",
	waText: "你好！我在看拉巴斯玩什么的指南，想请你们帮我选行程。",
	view: "查看行程",
	updated: "价格和季节均来自 Keabelmet 各行程页面。",
}

const ca: GuideText = {
	metaTitle: "Què fer a La Paz i La Ventana: quin tour triar segons el mes",
	metaDesc: "Guia honesta per triar tour a La Paz i La Ventana, BCS: quins animals veus cada mes (tauró balena, balena grisa, mòbules, lleons marins), barca, snorkel o busseig, preus, durada i edat mínima.",
	breadcrumb: "Què fer a La Paz",
	kicker: "Guia per triar el teu tour",
	h1: "Què fer a La Paz i La Ventana: quin tour triar segons el teu mes",
	lead: "Triar bé depèn de tres coses: el mes que vens, com vols viure el mar (des de la barca, fent snorkel o bussejant) i quin animal t'agradaria veure. Aquí ho tens tot, mes a mes, amb preus reals i sense promeses que el mar no pot complir.",
	quickTitle: "Resposta ràpida",
	quickWhale: (h) => `${h.range(gray().months)}: mares i cries de balena grisa a Puerto Chale, tot des de la barca (${h.name("tour-ballena-gris")}, des de ${h.price("tour-ballena-gris")}).`,
	quickShark: (h) => `${h.range(shark().months)}: nedar amb el tauró balena a La Paz fent snorkel, 2 a 3 h (${h.price("tiburon-ballena")}).`,
	quickMobula: (h) => `${h.range(lvMob().peak!)}: temporada alta de mòbules a La Ventana (${h.name("safari-la-ventana")}, ${h.price("safari-la-ventana")}).`,
	quickSardine: (h) => `${h.range(bm().months)}: el Sardine Run a Bahía Magdalena, snorkel en mar obert amb marlins i sardines (${h.price("safari-bahia-magdalena")}).`,
	quickAllYear: (_h, names) => `Tot l'any: ${names}.`,
	quizTitle: "Fes el qüestionari (30 segons)",
	quizSub: "Amb fotos: el teu mes, com vols viure el mar, qui ve i quin animal t'agradaria veure. Només et mostrem el que de veritat pots fer a les teves dates.",
	monthTitle: "Què veure a La Paz mes a mes",
	monthIntro: "Només el que canvia amb la temporada. El que es pot fer tot l'any és a l'última fila.",
	colMonth: "Mes",
	colHighlights: "Què pots veure",
	colTours: "Tours de temporada",
	peak: "temporada alta",
	maybe: "ocasional",
	sealionNoSwim: "Lleons marins només des de la barca (temporada reproductiva).",
	allYearRow: (n) => `Tot l'any: ${n}.`,
	modeTitle: "Segons com vols viure el mar",
	modeIntro: "No és el mateix veure des de la barca que fer snorkel o bussejar. Cada tour és a la modalitat que realment ofereix.",
	colTour: "Tour",
	colPrice: "Preu per persona",
	colDuration: "Durada",
	colSeason: "Temporada",
	colAge: "Edat",
	ageFamily: "Apte per a famílies",
	ageMin: (n) => `${n} anys o més`,
	agePrivate: "14+ (menors, en privat)",
	animalTitle: "Segons l'animal que vols veure",
	animalIntro: "On, com i quan. Cap albirament de fauna salvatge no es pot garantir.",
	animalWhere: (t, m, r) => `${t} · ${m} · ${r}`,
	animalPeak: (r) => `més probabilitat: ${r}`,
	animalMaybe: "pot aparèixer, no és l'objectiu del tour",
	situationsTitle: "Casos habituals",
	situations: (h) => [
		{ title: "Amb nens", text: `Menors de 12: ${h.name("tour-espiritu-santo")} (de 0 a 3 anys gratis) i ${h.name("tour-ballena-gris")} (${h.range(gray().months)}). Des de 12 anys: ${h.name("tiburon-ballena")}, ${h.name("scuba-discovery")} i el busseig. ${h.name("safari-la-ventana")}: 14 anys en sortida compartida; amb menors de 14, només en privat.` },
		{ title: "Si tens poques hores", text: `${h.name("tiburon-ballena")} dura de 2 a 3 h (${h.range(shark().months)}) i ${h.name("scuba-discovery")} unes 4 h, tot l'any.` },
		{ title: "Si no vols entrar a l'aigua", text: `${h.name("tour-ballena-gris")} és tot des de la barca (${h.range(gray().months)}). A ${h.name("safari-la-ventana")} et pots quedar a la barca durant els encontres.` },
		{ title: "Si no has bussejat mai", text: `${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, màxim 6 m, sense certificació). També hi ha Discovery a Espíritu Santo (${h.price("buceo-la-paz", "firstDive")}) i a Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). Per certificar-te: ${h.name("certificacion-open-water")} (${h.price("certificacion-open-water")}).` },
		{ title: "La Paz o La Ventana", text: `Des de La Paz surten Espíritu Santo (snorkel i busseig) i el tauró balena. ${h.name("safari-la-ventana")} surt de La Ventana; podem organitzar transport d'anada i tornada des de La Paz per 1.000 MXN addicionals (fins a 4 persones, segons disponibilitat). Cabo Pulmo no inclou transport des de La Paz.` },
	],
	faqTitle: "Preguntes freqüents",
	faqs: (h) => [
		{ q: "Què fer a La Paz, Baixa Califòrnia Sud?", a: `El millor de La Paz és al mar i depèn del mes: nedar amb el tauró balena (${h.range(shark().months)}), la balena grisa a Puerto Chale (${h.range(gray().months)}), el Sardine Run a Bahía Magdalena (${h.range(bm().months)}) i, tot l'any, snorkel amb lleons marins a l'illa Espíritu Santo, busseig i el safari de La Ventana.` },
		{ q: "Què fer a La Ventana?", a: `${h.name("safari-la-ventana")}: 6 h en barca pel canal de Cerralvo buscant mòbules (més probabilitat ${h.range(lvMob().peak!)}), dofins, lleons marins i balenes (${h.range([11, 12, 1, 2, 3, 4])}). Hi ha entrades de snorkel quan és segur, però et pots quedar a la barca. ${h.price("safari-la-ventana")} per persona; 14 anys o més en compartit.` },
		{ q: "Quin és el millor mes per anar a La Paz?", a: `Depèn del que vulguis veure. ${h.range(gray().months)}: balena grisa. ${h.range(shark().months)}: tauró balena. ${h.range(lvMob().peak!)}: mòbules a La Ventana. ${h.range(bm().months)}: Sardine Run. L'illa Espíritu Santo i el busseig, tot l'any (de juny a agost els lleons marins s'observen des de la barca).` },
		{ q: "Quan és la temporada del tauró balena a La Paz?", a: `De ${h.range(shark().months)}. Snorkel de 2 a 3 h des del malecó, ${h.price("tiburon-ballena")} per persona i edat mínima de 12 anys.` },
		{ q: "Quan es veuen les balenes grises?", a: `De ${h.range(gray().months)} a Puerto Chale. Tot des de la barca, unes 9 h amb el trasllat des de La Paz, des de ${h.price("tour-ballena-gris")} per persona. Apte per a famílies.` },
		{ q: "Es pot nedar amb lleons marins a l'illa Espíritu Santo?", a: "Sí, tot l'any excepte de juny a agost: és la seva temporada reproductiva i aquests mesos s'observen des de la barca." },
		{ q: "Es veuen orques a La Paz o La Ventana?", a: quizDicts.ca.notes.orca },
		{ q: "Quin tour fer si no sé nedar o no vull entrar a l'aigua?", a: `${h.name("tour-ballena-gris")} (${h.range(gray().months)}) és tot des de la barca. A ${h.name("safari-la-ventana")} et pots quedar a la barca. Avisa'ns abans de reservar si algú no sap nedar.` },
		{ q: "Què fer a La Paz amb nens?", a: `Amb menors de 12: ${h.name("tour-espiritu-santo")} (de 0 a 3 anys gratis) o la balena grisa (${h.range(gray().months)}). Des de 12 anys: tauró balena, Scuba Discovery i busseig. La Ventana: 14 anys en compartit; menors, en privat.` },
		{ q: "Puc bussejar sense certificació?", a: `Sí. ${h.name("scuba-discovery")} (${h.price("scuba-discovery")}, màxim 6 m, amb instructor), Discovery a Espíritu Santo (${h.price("buceo-la-paz", "firstDive")}) o a Cabo Pulmo (${h.price("buceo-cabo-pulmo", "firstDive")}). Edat mínima 12 anys.` },
		{ q: "Què faig si només tinc unes hores a La Paz?", a: `${h.name("tiburon-ballena")} (2 a 3 h, ${h.range(shark().months)}) o ${h.name("scuba-discovery")} (unes 4 h, tot l'any).` },
		{ q: "Quant costen els tours a La Paz?", a: TOURS.map((t) => `${h.name(t.id)}: ${t.modes.boat?.from ? "des de " : ""}${h.price(t.id)}`).join("; ") + ". Preus per persona." },
	],
	ctaTitle: "Dubtes? T'ajudem a triar",
	ctaText: "Escriu-nos per WhatsApp amb les teves dates i qui ve, i et direm amb honestedat què val la pena.",
	ctaWa: "Escriure per WhatsApp",
	waText: "Hola! Estic mirant la guia de què fer a La Paz i vull ajuda per triar tour.",
	view: "Veure expedició",
	updated: "Preus i temporades presos de cada expedició de Keabelmet.",
}

export const guideTexts: Record<Locale, GuideText> = { es, en, fr, zh, ca }

/** Viñetas de "respuesta rápida". */
export function quickAnswers(locale: Locale): string[] {
	const g = guideTexts[locale] || guideTexts.es
	const h = helpers(locale)
	const allYear = allYearTours().map((id) => h.name(id)).join(", ")
	const cap = (x: string) => x.charAt(0).toUpperCase() + x.slice(1)
	return [g.quickShark(h), g.quickWhale(h), g.quickMobula(h), g.quickSardine(h), g.quickAllYear(h, allYear)].map(cap)
}

/** Versión en Markdown para llms.txt / llms-full.txt. */
export function guideMarkdown(locale: Locale, url: string): string {
	const g = guideTexts[locale] || guideTexts.es
	const h = helpers(locale)
	const out: string[] = []
	out.push(`## ${g.h1}`, "", `URL: ${url}`, "", g.lead, "", `### ${g.quickTitle}`, "")
	for (const b of quickAnswers(locale)) out.push(`- ${b}`)
	out.push("", `### ${g.monthTitle}`, "")
	for (const r of monthRows()) {
		const hl = r.highlights.map((x) => `${h.animal(x.id)}${x.peak ? ` (${g.peak})` : x.maybe ? ` (${g.maybe})` : ""}`).join(", ")
		const tours = r.seasonalTours.map((id) => h.name(id)).join(", ")
		out.push(`- ${h.q.monthsLong[r.month - 1].charAt(0).toUpperCase() + h.q.monthsLong[r.month - 1].slice(1)}: ${hl || "—"}${tours ? `. ${g.colTours}: ${tours}` : ""}${r.sealionNoSwim ? `. ${g.sealionNoSwim}` : ""}`)
	}
	out.push(`- ${g.allYearRow(allYearTours().map((id) => h.name(id)).join(", "))}`)
	out.push("", `### ${g.modeTitle}`, "")
	for (const m of MODES) {
		out.push(`- ${h.q.modes[m].title} (${h.q.modes[m].desc}):`)
		for (const t of toursForMode(m)) {
			const p = t.modes[m]!
			out.push(`  - ${h.name(t.id)}: ${p.from ? (locale === "zh" ? "" : `${h.q.from} `) : ""}${mxn(p.mxn)}, ${h.q.tours[t.id].duration}, ${h.range(t.months)}`)
		}
	}
	out.push("", `### ${g.situationsTitle}`, "")
	for (const s of g.situations(h)) out.push(`- ${s.title}: ${s.text}`)
	out.push("", `### ${g.faqTitle}`, "")
	for (const f of g.faqs(h)) out.push(`- ${f.q} ${f.a}`)
	out.push("")
	return out.join("\n")
}
