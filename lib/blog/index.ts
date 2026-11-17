import { blogPosts } from "@/constants/blog"
import { defaultLocale, type Locale } from "@/lib/i18n"
import type { BlogCategory, BlogLocale, BlogPost, BlogPostContent } from "./types"

export * from "./types"
export * from "./search"
import { normalizeSearch, type SearchItem } from "./search"

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

// ── Temas (subpáginas /blog/tema/<slug>) ────────────────────────────────────

export interface CategoryMeta {
	key: BlogCategory
	slug: Record<BlogLocale, string>
	image: string
	desc: Record<BlogLocale, string>
}

export const CATEGORY_META: CategoryMeta[] = [
	{
		key: "fauna",
		slug: { es: "fauna-marina", en: "marine-wildlife" },
		image: "/images/especies/lobomarinonadando.jpeg",
		desc: {
			es: "Tiburón ballena, ballenas, lobos marinos, móbulas, marlines y más: cómo viven, qué comen y cómo verlos con respeto.",
			en: "Whale sharks, whales, sea lions, mobula rays, marlin and more: how they live, what they eat and how to see them respectfully.",
		},
	},
	{
		key: "temporadas",
		slug: { es: "cuando-ir", en: "when-to-go" },
		image: "/images/especies/ballena-jorobada-saltando.jpeg",
		desc: {
			es: "Mes por mes: cuándo llega cada animal, la temperatura del agua y la mejor época para tu viaje.",
			en: "Month by month: when each animal arrives, water temperature and the best time for your trip.",
		},
	},
	{
		key: "destinos",
		slug: { es: "lugares", en: "places" },
		image: "/espiritu-santo-aerea.jpg",
		desc: {
			es: "Isla Espíritu Santo, Balandra, Bahía Magdalena, Cabo Pulmo y los rincones del Mar de Cortés.",
			en: "Espíritu Santo Island, Balandra, Magdalena Bay, Cabo Pulmo and the corners of the Sea of Cortez.",
		},
	},
	{
		key: "actividades",
		slug: { es: "buceo-y-tours", en: "diving-and-tours" },
		image: "/images/buceo/espiritu-buzo-cardumen.jpg",
		desc: {
			es: "Snorkel, buceo, certificación y safaris: qué esperar, qué nivel necesitas y cómo elegir.",
			en: "Snorkeling, diving, certification and safaris: what to expect, the level you need and how to choose.",
		},
	},
	{
		key: "planea",
		slug: { es: "planea-tu-viaje", en: "plan-your-trip" },
		image: "/images/safari/lancha-avistando-ballena.jpg",
		desc: {
			es: "Cuántos días quedarte, qué llevar a la lancha y cómo armar tu viaje a La Paz.",
			en: "How many days to stay, what to bring on the boat and how to put together your trip to La Paz.",
		},
	},
	{
		key: "conservacion",
		slug: { es: "ciencia-y-conservacion", en: "science-and-conservation" },
		image: "/buceo-cabo-pulmo-cardumen.jpg",
		desc: {
			es: "Surgencias, El Niño, la recuperación de Cabo Pulmo y la ciencia que explica el Mar de Cortés.",
			en: "Upwellings, El Niño, Cabo Pulmo's recovery and the science behind the Sea of Cortez.",
		},
	},
]

export function categoryMeta(key: BlogCategory): CategoryMeta {
	return CATEGORY_META.find((c) => c.key === key)!
}

/** Ruta de la subpágina de un tema para un idioma del sitio. */
export function categoryPath(key: BlogCategory, locale: Locale): string {
	return `${localePrefix(locale)}/blog/tema/${categoryMeta(key).slug[contentLocale(locale)]}`
}

/** Busca un tema por su slug en cualquier idioma. */
export function findCategoryBySlug(slug: string): { meta: CategoryMeta; lang: BlogLocale } | undefined {
	for (const meta of CATEGORY_META) {
		if (meta.slug.es === slug) return { meta, lang: "es" }
		if (meta.slug.en === slug) return { meta, lang: "en" }
	}
	return undefined
}

export function searchIndex(locale: Locale, posts: BlogPost[] = getAllPosts()): SearchItem[] {
	const lang = contentLocale(locale)
	return posts.map((p) => {
		const c = p[lang]
		const heads = c.blocks.filter((b) => b.type === "h2" || b.type === "h3").map((b) => ("text" in b ? b.text : ""))
		const text = normalizeSearch(
			plainText([c.title, c.excerpt, c.description, c.answer, ...heads, ...c.faq.map((f) => f.q), categoryLabel(p.category, lang)].join(" ")),
		)
		return {
			id: p.id,
			href: postPath(p, locale),
			title: c.title,
			excerpt: c.excerpt,
			cover: p.cover,
			coverAlt: c.coverAlt,
			category: p.category,
			categoryLabel: categoryLabel(p.category, lang),
			minutes: readMinutes(c),
			text,
			titleN: normalizeSearch(c.title),
		}
	})
}
