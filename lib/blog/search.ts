/**
 * Buscador del blog: tipos y normalización sin dependencias, para que el
 * componente del navegador no arrastre todos los artículos.
 */
import type { BlogCategory } from "./types"

/** Artículo resumido para el buscador del blog (se manda al navegador). */
export interface SearchItem {
	id: string
	href: string
	title: string
	excerpt: string
	cover: string
	coverAlt: string
	category: BlogCategory
	categoryLabel: string
	minutes: number
	/** Texto normalizado donde se busca (título, resumen, respuesta, subtítulos y FAQ). */
	text: string
	/** Título normalizado (pesa más en el orden). */
	titleN: string
}

export function normalizeSearch(s: string): string {
	return s
		.toLowerCase()
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.replace(/[^a-z0-9ñ\s]/g, " ")
		.replace(/\s+/g, " ")
		.trim()
}


/** Busca con todas las palabras (sin acentos; tolera plurales simples). Devuelve ordenado por relevancia. */
export function searchItems(items: SearchItem[], query: string): SearchItem[] {
	const terms = normalizeSearch(query)
		.split(" ")
		.filter((t) => t.length >= 2)
	if (!terms.length) return []
	const variants = (t: string) => {
		const v = [t]
		if (t.length > 4 && t.endsWith("es")) v.push(t.slice(0, -2))
		if (t.length > 3 && t.endsWith("s")) v.push(t.slice(0, -1))
		return v
	}
	const scored: { it: SearchItem; score: number }[] = []
	for (const it of items) {
		let score = 0
		let all = true
		for (const t of terms) {
			const vs = variants(t)
			const inTitle = vs.some((v) => it.titleN.includes(v))
			const inText = inTitle || vs.some((v) => it.text.includes(v))
			if (!inText) {
				all = false
				break
			}
			score += inTitle ? 5 : 1
			if (vs.some((v) => it.text.split(v).length > 3)) score += 1
		}
		if (all) scored.push({ it, score })
	}
	return scored.sort((a, b) => b.score - a.score).map((x) => x.it)
}
