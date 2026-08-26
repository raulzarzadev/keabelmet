/**
 * Temporadas y capacidad por expedición. Sirven para el selector de fecha
 * (bloquea meses fuera de temporada) y el máximo de personas por reserva.
 * months: array de meses permitidos (1=enero … 12=diciembre). null = todo el año.
 */
export interface SeasonInfo {
	months: number[] | null
	maxPeople: number
	/** Etiqueta legible por idioma para mostrar la temporada. */
	label: Record<string, string>
}

const ALL_YEAR: Record<string, string> = {
	es: "Todo el año",
	en: "All year",
	fr: "Toute l'année",
	zh: "全年",
}

export const SEASONS: Record<string, SeasonInfo> = {
	"safari-la-ventana": { months: null, maxPeople: 8, label: ALL_YEAR },
	"buceo-cabo-pulmo": { months: null, maxPeople: 8, label: ALL_YEAR },
	"buceo-la-paz": { months: null, maxPeople: 8, label: ALL_YEAR },
	"tour-espiritu-santo": { months: null, maxPeople: 10, label: ALL_YEAR },
	"scuba-discovery": { months: null, maxPeople: 6, label: ALL_YEAR },
	"tiburon-ballena": {
		months: [10, 11, 12, 1, 2, 3, 4],
		maxPeople: 8,
		label: { es: "Octubre – abril", en: "October – April", fr: "Octobre – avril", zh: "10月至4月" },
	},
	"tour-ballena-gris": {
		months: [1, 2, 3],
		maxPeople: 8,
		label: { es: "Enero – marzo", en: "January – March", fr: "Janvier – mars", zh: "1月至3月" },
	},
	"safari-bahia-magdalena": {
		months: [11, 12],
		maxPeople: 8,
		label: { es: "Noviembre – diciembre", en: "November – December", fr: "Novembre – décembre", zh: "11月至12月" },
	},
}

const FALLBACK: SeasonInfo = { months: null, maxPeople: 8, label: ALL_YEAR }

export function getSeason(slug: string): SeasonInfo {
	return SEASONS[slug] ?? FALLBACK
}

/** Valida que una fecha ISO (yyyy-mm-dd) caiga dentro de la temporada del tour. */
export function isDateInSeason(slug: string, dateISO: string): boolean {
	const season = getSeason(slug)
	if (!season.months) return true
	const month = Number(dateISO.slice(5, 7))
	return season.months.includes(month)
}

export function seasonLabel(slug: string, locale: string): string {
	const season = getSeason(slug)
	return season.label[locale] ?? season.label.es
}
