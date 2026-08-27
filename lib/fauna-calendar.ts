/**
 * Calendario de fauna por expedición: en qué meses aparece cada especie y
 * cuándo es temporada alta. Los datos (meses) se definen una sola vez; los
 * nombres se localizan por idioma. Basado en la estacionalidad real del Mar
 * de Cortés / La Ventana (móbulas primavera-verano, ballenas invierno, etc.).
 */
const ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export type FaunaIcon = "manta" | "whale" | "fin" | "shark" | "seal"

export interface FaunaSpecies {
	id: string
	icon: FaunaIcon
	months: number[]
	peak: number[]
}

export const faunaSeasons: Record<string, FaunaSpecies[]> = {
	"safari-la-ventana": [
		{ id: "mobula", icon: "manta", months: [3, 4, 5, 6, 7, 8], peak: [4, 5, 6] },
		{ id: "orca", icon: "fin", months: ALL, peak: [3, 4, 5, 6] },
		{ id: "blueWhale", icon: "whale", months: [11, 12, 1, 2, 3, 4, 5, 6], peak: [2, 3, 4] },
		{ id: "humpback", icon: "whale", months: [12, 1, 2, 3], peak: [1, 2] },
		{ id: "whaleShark", icon: "shark", months: [10, 11, 12, 1, 2, 3, 4], peak: [11, 12, 1, 2, 3] },
		{ id: "dolphin", icon: "fin", months: ALL, peak: [] },
		{ id: "sealion", icon: "seal", months: ALL, peak: [] },
		{ id: "spermWhale", icon: "whale", months: [12, 1, 2, 3, 4, 5, 6], peak: [] },
		{ id: "giantManta", icon: "manta", months: [9, 10, 11], peak: [] },
		{ id: "brydeWhale", icon: "whale", months: [6, 7, 8, 9], peak: [] },
	],
}

export const faunaNames: Record<string, Record<string, string>> = {
	es: { mobula: "Móbulas", orca: "Orcas", blueWhale: "Ballena azul", humpback: "Ballena jorobada", whaleShark: "Tiburón ballena", dolphin: "Delfines", sealion: "Lobos marinos", spermWhale: "Cachalotes", giantManta: "Mantas gigantes", brydeWhale: "Ballena de Bryde" },
	en: { mobula: "Mobula rays", orca: "Orcas", blueWhale: "Blue whale", humpback: "Humpback whale", whaleShark: "Whale shark", dolphin: "Dolphins", sealion: "Sea lions", spermWhale: "Sperm whales", giantManta: "Giant mantas", brydeWhale: "Bryde's whale" },
	fr: { mobula: "Raies mobula", orca: "Orques", blueWhale: "Baleine bleue", humpback: "Baleine à bosse", whaleShark: "Requin-baleine", dolphin: "Dauphins", sealion: "Otaries", spermWhale: "Cachalots", giantManta: "Mantas géantes", brydeWhale: "Rorqual de Bryde" },
	zh: { mobula: "蝠鲼", orca: "虎鲸", blueWhale: "蓝鲸", humpback: "座头鲸", whaleShark: "鲸鲨", dolphin: "海豚", sealion: "海狮", spermWhale: "抹香鲸", giantManta: "巨型蝠鲼", brydeWhale: "布氏鲸" },
}

export const monthsShort: Record<string, string[]> = {
	es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
	en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	fr: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
	zh: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
}

export const faunaLegend: Record<string, { season: string; peak: string; off: string; hint: string; peakSuffix: string; seasonSuffix: string }> = {
	es: { season: "Puede aparecer", peak: "Mayor probabilidad", off: "Poco probable", hint: "Desliza para ver los meses →", peakSuffix: " (mayor probabilidad)", seasonSuffix: " (puede aparecer)" },
	en: { season: "May appear", peak: "Higher chance", off: "Unlikely", hint: "Swipe to see the months →", peakSuffix: " (higher chance)", seasonSuffix: " (may appear)" },
	fr: { season: "Peut apparaître", peak: "Plus de chances", off: "Peu probable", hint: "Faites défiler pour voir les mois →", peakSuffix: " (plus de chances)", seasonSuffix: " (peut apparaître)" },
	zh: { season: "可能出现", peak: "概率更高", off: "不太可能", hint: "滑动查看各月份 →", peakSuffix: "（概率更高）", seasonSuffix: "（可能出现）" },
}
