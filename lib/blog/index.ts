import { blogPosts } from "@/constants/blog"
import { defaultLocale, type Locale } from "@/lib/i18n"
import type { BlogCategory, BlogLocale, BlogPost, BlogPostContent } from "./types"

export * from "./types"

export const BLOG_CATEGORIES: { key: BlogCategory; es: string; en: string }[] = [
	{ key: "fauna", es: "Fauna marina", en: "Marine wildlife" },
	{ key: "temporadas", es: "Cuándo ir", en: "When to go" },
	{ key: "destinos", es: "Lugares", en: "Places" },
	{ key: "actividades", es: "Buceo y tours", en: "Diving & tours" },
	{ key: "planea", es: "Planea tu viaje", en: "Plan your trip" },
	{ key: "conservacion", es: "Ciencia y conservación", en: "Science & conservation" },
]

/** Idioma del contenido: el blog existe en es y en; el resto usa en. */
export function contentLocale(locale: Locale): BlogLocale {
	return locale === "es" ? "es" : "en"
}

export function categoryLabel(key: BlogCategory, lang: BlogLocale): string {
	return BLOG_CATEGORIES.find((c) => c.key === key)?.[lang] ?? key
}

/** Prefijo de idioma para rutas del sitio ("" para español). */
export function localePrefix(locale: Locale): string {
	return locale === defaultLocale ? "" : `/${locale}`
}

/** Agrega el prefijo de idioma a enlaces internos; deja intactos los externos y anclas. */
export function localizeHref(href: string, locale: Locale): string {
	if (!href.startsWith("/") || href.startsWith("//")) return href
	return `${localePrefix(locale)}${href}`
}

export function getAllPosts(): BlogPost[] {
	return [...blogPosts].sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date))
}

export function getPostById(id: string): BlogPost | undefined {
	return blogPosts.find((p) => p.id === id)
}

/** Busca un artículo por slug en cualquier idioma. */
export function findPostBySlug(slug: string): { post: BlogPost; lang: BlogLocale } | undefined {
	for (const post of blogPosts) {
		if (post.es.slug === slug) return { post, lang: "es" }
		if (post.en.slug === slug) return { post, lang: "en" }
	}
	return undefined
}

/** Ruta del artículo para un idioma del sitio (sin dominio). */
export function postPath(post: BlogPost, locale: Locale): string {
	return `${localePrefix(locale)}/blog/${post[contentLocale(locale)].slug}`
}

export function readMinutes(c: BlogPostContent): number {
	const parts: string[] = [c.answer]
	for (const b of c.blocks) {
		if ("text" in b) parts.push(b.text)
		if ("items" in b) parts.push(...b.items)
		if (b.type === "table") parts.push(...b.rows.flat())
	}
	for (const f of c.faq) parts.push(f.q, f.a)
	const words = parts.join(" ").split(/\s+/).filter(Boolean).length
	return Math.max(2, Math.round(words / 200))
}

/** Quita la sintaxis inline (negritas, enlaces, citas) para texto plano (JSON-LD, llms.txt). */
export function plainText(s: string): string {
	return s
		.replace(/\s*\[\^\d+\]/g, "")
		.replace(/\*\*(.+?)\*\*/g, "$1")
		.replace(/\*([^*\s][^*]*?)\*/g, "$1")
		.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
		.replace(/\s{2,}/g, " ")
		.trim()
}

export function relatedPosts(post: BlogPost, max = 3): BlogPost[] {
	const explicit = (post.related ?? []).map(getPostById).filter((p): p is BlogPost => !!p)
	const sameCat = getAllPosts().filter((p) => p.id !== post.id && p.category === post.category && !explicit.includes(p))
	const others = getAllPosts().filter((p) => p.id !== post.id && !explicit.includes(p) && !sameCat.includes(p))
	return [...explicit, ...sameCat, ...others].slice(0, max)
}
