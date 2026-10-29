/**
 * Modelo del blog. Cada artículo existe en español e inglés (el resto de los
 * idiomas del sitio muestran la versión en inglés con canonical a ella).
 *
 * Texto "inline" (párrafos, listas, respuestas): admite
 *   **negritas**, [enlaces](/ruta-o-url) y citas científicas [^n],
 * donde n es el id de una entrada de `sources`.
 * Los enlaces internos se escriben sin prefijo de idioma (p. ej.
 * /experiencias/tiburon-ballena); el renderer agrega /en cuando corresponde.
 */
export type BlogLocale = "es" | "en"

export type BlogCategory = "fauna" | "temporadas" | "destinos" | "actividades" | "planea" | "conservacion"

export type BlogBlock =
	| { type: "h2"; text: string }
	| { type: "h3"; text: string }
	| { type: "p"; text: string }
	| { type: "ul"; items: string[] }
	| { type: "ol"; items: string[] }
	| { type: "img"; src: string; alt: string; caption?: string }
	/** Consejo práctico de guía. */
	| { type: "tip"; text: string }
	/** Dato científico destacado (normalmente con cita). */
	| { type: "fact"; text: string }
	| { type: "table"; head: string[]; rows: string[][] }

export interface BlogFaq {
	q: string
	a: string
}

export interface BlogSource {
	id: number
	authors: string
	year: string
	title: string
	/** Revista, institución, editorial o tipo de documento (tesis, informe…). */
	publication: string
	url: string
	kind: "paper" | "thesis" | "report" | "official" | "book"
}

export interface BlogPostContent {
	slug: string
	title: string
	/** Título SEO (<title>); si falta, se usa `title`. */
	metaTitle?: string
	description: string
	excerpt: string
	coverAlt: string
	/** Respuesta corta y directa (la que citan buscadores e IAs). */
	answer: string
	blocks: BlogBlock[]
	faq: BlogFaq[]
}

export interface BlogPost {
	id: string
	category: BlogCategory
	/** yyyy-mm-dd */
	date: string
	updated?: string
	cover: string
	/** Slugs de expediciones relacionadas (tarjetas de reserva). */
	experiences: string[]
	/** Ids de artículos relacionados. */
	related?: string[]
	sources: BlogSource[]
	es: BlogPostContent
	en: BlogPostContent
}
