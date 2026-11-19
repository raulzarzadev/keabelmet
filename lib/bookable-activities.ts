import { getStoryPage } from "@/constants/story-pages"
import { experiences } from "@/constants/experiences"
import { seasonLabel } from "@/lib/expedition-seasons"
import type { Locale } from "@/lib/i18n"

export interface BookableOption {
	name: string
	amountMxn: number
}

export interface BookableActivity {
	slug: string
	title: string
	/** Opción que se agrega por defecto al carrito. */
	cardName: string
	unitAmountMxn: number
	/** Precio más bajo de la actividad (para mostrar "desde"). */
	fromAmountMxn: number
	/** Todas las opciones con precio por persona, en el orden de la página. */
	options: BookableOption[]
	image: string
	season: string
	href: string
}

/** Tarjetas con precio por persona ("/ persona", "/ person"…). Las de lancha privada o por grupo no entran al carrito. */
const PER_PERSON_NOTE = /^\/\s*(persona|person|personne|人|每人)$/i

/** Opciones con precio por persona de una expedición, en el orden de su página. */
export function perPersonOptions(slug: string, locale: Locale): BookableOption[] {
	const story = getStoryPage(slug, locale)
	if (!story) return []
	const out: BookableOption[] = []
	for (const b of story.blocks) {
		if (b.type !== "pricing") continue
		for (const c of b.cards) {
			if (typeof c.amountMxn !== "number") continue
			if (!PER_PERSON_NOTE.test((c.amountNote ?? "").trim())) continue
			out.push({ name: c.name, amountMxn: c.amountMxn })
		}
	}
	return out
}

/**
 * Nombre de la opción elegida (p. ej. "Snorkel" o "Buceo certificado") cuando
 * la expedición tiene varias opciones por persona; vacío si solo tiene una.
 */
export function optionLabel(slug: string, amountMxn: number, locale: string): string {
	const opts = perPersonOptions(slug, locale as Locale)
	if (opts.length < 2) return ""
	return opts.find((o) => o.amountMxn === amountMxn)?.name ?? ""
}

/**
 * Actividades que se pueden apartar con anticipo: toda expedición con al
 * menos una tarjeta de precio por persona. Cada una trae todas sus opciones
 * (snorkel, buceo certificado, discovery…) para que el cliente elija la que
 * va a hacer; por defecto se agrega la opción principal de la expedición (la
 * de su precio "desde" en el catálogo), nunca una más barata de otra
 * modalidad. El servidor valida el monto contra el catálogo antes de cobrar.
 */
export function getBookableActivities(locale: Locale): BookableActivity[] {
	const out: BookableActivity[] = []
	for (const exp of experiences) {
		const story = getStoryPage(exp.slug, locale)
		if (!story) continue
		const options = perPersonOptions(exp.slug, locale)
		if (!options.length) continue
		const main = options.find((o) => o.amountMxn === exp.fromMxn) ?? options.reduce((a, b) => (b.amountMxn < a.amountMxn ? b : a))
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
			cardName: main.name,
			unitAmountMxn: main.amountMxn,
			fromAmountMxn: Math.min(...options.map((o) => o.amountMxn)),
			options,
			image: heroImage,
			season: seasonLabel(exp.slug, locale),
			href: exp.href,
		})
	}
	return out
}
