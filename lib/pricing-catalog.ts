import type { StoryPageData } from "@/components/StoryPage"
import type { ExpeditionPageData } from "@/components/ExpeditionDetail"
import { storyPages } from "@/constants/story-pages"
import { storyPagesEn } from "@/constants/story-pages.en"
import { storyPagesFr } from "@/constants/story-pages.fr"
import { storyPagesZh } from "@/constants/story-pages.zh"
import { expeditionPages } from "@/constants/expedition-pages"
import { expeditionPagesEn } from "@/constants/expedition-pages.en"
import { expeditionPagesFr } from "@/constants/expedition-pages.fr"
import { expeditionPagesZh } from "@/constants/expedition-pages.zh"

/**
 * Catálogo de precios válidos por expedición, construido en el servidor a
 * partir del contenido real de las páginas. Nunca confiamos en el monto que
 * mande el cliente: lo validamos contra este catálogo antes de cobrar.
 */
const validAmountsBySlug = new Map<string, Set<number>>()
/** Montos que son por persona ("/ persona", "/ person"…); el resto (por embarcación) se cobra una sola vez. */
const perPersonAmountsBySlug = new Map<string, Set<number>>()
const PER_PERSON_NOTE = /^\/\s*(persona|person|personne|人|每人)$/i

function addPerPerson(slug: string, amountMxn: number | undefined, note: string | undefined) {
	if (typeof amountMxn !== "number" || !PER_PERSON_NOTE.test((note ?? "").trim())) return
	if (!perPersonAmountsBySlug.has(slug)) perPersonAmountsBySlug.set(slug, new Set())
	perPersonAmountsBySlug.get(slug)!.add(amountMxn)
}

function addAmount(slug: string, amountMxn: number | undefined) {
	if (typeof amountMxn !== "number" || !Number.isFinite(amountMxn) || amountMxn <= 0) return
	if (!validAmountsBySlug.has(slug)) validAmountsBySlug.set(slug, new Set())
	validAmountsBySlug.get(slug)!.add(amountMxn)
}

function indexStoryPages(pages: Record<string, StoryPageData>) {
	for (const [slug, data] of Object.entries(pages)) {
		for (const block of data.blocks) {
			if (block.type === "pricing") {
				for (const card of block.cards) {
					addAmount(slug, card.amountMxn)
					addPerPerson(slug, card.amountMxn, card.amountNote)
				}
			}
		}
	}
}

function indexExpeditionPages(pages: Record<string, ExpeditionPageData>) {
	for (const [slug, data] of Object.entries(pages)) {
		for (const card of data.pricing.cards) addAmount(slug, card.amountMxn)
	}
}

indexStoryPages(storyPages)
indexStoryPages(storyPagesEn)
indexStoryPages(storyPagesFr)
indexStoryPages(storyPagesZh)
indexExpeditionPages(expeditionPages)
indexExpeditionPages(expeditionPagesEn)
indexExpeditionPages(expeditionPagesFr)
indexExpeditionPages(expeditionPagesZh)

/** true si ese precio de la expedición se cobra por persona (y no por embarcación). */
export function isPerPersonPrice(slug: string, amountMxn: number): boolean {
	return perPersonAmountsBySlug.get(slug)?.has(amountMxn) ?? false
}

export function isValidPrice(slug: string, amountMxn: number): boolean {
	return validAmountsBySlug.get(slug)?.has(amountMxn) ?? false
}
