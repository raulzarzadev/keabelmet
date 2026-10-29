import { getStoryPage } from "@/constants/story-pages"
import { experiences } from "@/constants/experiences"
import { seasonLabel } from "@/lib/expedition-seasons"
import type { Locale } from "@/lib/i18n"

export interface BookableActivity {
	slug: string
	title: string
	cardName: string
	unitAmountMxn: number
	image: string
	season: string
	href: string
}

/**
 * Actividades que se pueden apartar con anticipo: toda expedición con una
 * tarjeta de precio numérica. El precio unitario es el de la tarjeta MÁS
 * barata de esa actividad (el "desde" real, y el mismo monto que valida el
 * catálogo en el servidor), así el carrito nunca manda un monto que el
 * servidor vaya a rechazar y la barrera de entrada del anticipo es baja.
 */
export function getBookableActivities(locale: Locale): BookableActivity[] {
	const out: BookableActivity[] = []
	for (const exp of experiences) {
		const story = getStoryPage(exp.slug, locale)
		if (!story) continue
		let card: { name: string; amountMxn?: number } | undefined
		for (const b of story.blocks) {
			if (b.type !== "pricing") continue
			for (const c of b.cards) {
				if (typeof c.amountMxn !== "number") continue
				if (!card || typeof card.amountMxn !== "number" || c.amountMxn < card.amountMxn) card = c
			}
		}
		if (!card || typeof card.amountMxn !== "number") continue
		const i = (exp.i18n as Record<string, { title: string }>)[locale]
		// Portada de cada expedición (misma foto hero de su landing); si por algo
		// faltara, caemos a la miniatura del catálogo de experiencias.
		// Excepciones: slugs que por ahora conservan su miniatura del catálogo
		// (p. ej. open water, hasta tener una buena foto de portada).
		const KEEP_CATALOG_IMAGE = new Set(["certificacion-open-water"])
		const heroImage = KEEP_CATALOG_IMAGE.has(exp.slug)
			? exp.image
			: (story.hero as { image?: string } | undefined)?.image || exp.image
		out.push({
			slug: exp.slug,
			title: (i ?? exp.i18n.es).title,
			cardName: card.name,
			unitAmountMxn: card.amountMxn,
			image: heroImage,
			season: seasonLabel(exp.slug, locale),
			href: exp.href,
		})
	}
	return out
}
