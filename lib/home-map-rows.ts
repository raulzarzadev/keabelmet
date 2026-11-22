import { getExperience } from "@/constants/experiences"
import type { Locale } from "@/lib/i18n"
import { TOURS, type TourId } from "@/lib/tour-finder"
import { EXPEDITION_MAP, type PointId } from "@/lib/expedition-map"

export interface HomeMapRow {
	id: TourId
	title: string
	image: string
	href: string
	point: PointId
	months: number[]
	fromMxn: number | null
}

/**
 * Filas del mapa de la portada. Se arman en el servidor para que el celular no
 * descargue los textos de todas las experiencias en todos los idiomas.
 */
export function homeMapRows(locale: Locale): HomeMapRow[] {
	const out: HomeMapRow[] = []
	for (const [id, info] of Object.entries(EXPEDITION_MAP) as [TourId, NonNullable<(typeof EXPEDITION_MAP)[TourId]>][]) {
		const exp = getExperience(id)
		const tour = TOURS.find((x) => x.id === id)
		if (!exp || !tour) continue
		const prices = Object.values(tour.modes).map((m) => m!.mxn)
		out.push({
			id,
			title: (exp.i18n[locale] ?? exp.i18n.es).title,
			image: exp.image,
			href: exp.href,
			point: info.point,
			months: tour.months,
			fromMxn: prices.length ? Math.min(...prices) : exp.fromMxn,
		})
	}
	return out
}
