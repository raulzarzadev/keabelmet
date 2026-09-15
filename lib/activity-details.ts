import type { Locale } from "@/lib/i18n"
import { getStoryPage } from "@/constants/story-pages"
import type { StoryPageData } from "@/components/StoryPage"

/**
 * Detalles ricos de una actividad para mostrar en el voucher: qué incluye,
 * qué llevar y la información práctica. Se extraen del contenido real de cada
 * página de expedición (bloques pricing/details/groups/info), por lo que se
 * mantienen solos al editar las páginas y respetan el idioma.
 */
export interface ActivityDetails {
	includes: string[]
	detailed: { title: string; text: string }[]
	bring: { name: string; items: string[] }[]
	info: { label: string; value: string }[]
}

export function getActivityDetails(slug: string, locale: Locale, cardName?: string): ActivityDetails {
	const result: ActivityDetails = { includes: [], detailed: [], bring: [], info: [] }
	const page = getStoryPage(slug, locale)
	if (!page) return result

	result.includes = getIncludes(page, cardName)
	for (const b of page.blocks) {
		if (b.type === "details" && !result.detailed.length) result.detailed = b.items
		if (b.type === "groups" && !result.bring.length) result.bring = b.groups
		if (b.type === "info" && !result.info.length) result.info = b.items
	}
	return result
}

/** Prefiere los bullets de la modalidad reservada; si no, el primer bloque con lista. */
function getIncludes(page: StoryPageData, cardName?: string): string[] {
	for (const b of page.blocks) {
		if (b.type !== "pricing") continue
		const byName = cardName ? b.cards.find((c) => c.name === cardName) : undefined
		const chosen = byName ?? b.cards.find((c) => c.items?.length)
		if (chosen?.items?.length) return chosen.items
	}
	return []
}
