import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo"
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd"
import BlogSearch from "@/components/blog/BlogSearch"
import { blogCopy } from "@/lib/blog/copy"
import {
	CATEGORY_META,
	categoryLabel,
	categoryPath,
	contentLocale,
	findCategoryBySlug,
	getAllPosts,
	localizeHref,
	postPath,
	readMinutes,
	searchIndex,
	type BlogLocale,
} from "@/lib/blog"

const tc: Record<BlogLocale, { kicker: string; back: string; others: string; placeholder: (t: string) => string; everywhere: string; meta: (t: string) => string }> = {
	es: {
		kicker: "Tema del blog",
		back: "← Todo el blog",
		others: "Otros temas",
		placeholder: (t) => `Busca dentro de ${t.toLowerCase()}…`,
		everywhere: "Buscar en todo el blog →",
		meta: (t) => `${t}: artículos del Mar de Cortés y La Paz | Blog Keabelmet`,
	},
	en: {
		kicker: "Blog topic",
		back: "← The whole blog",
		others: "Other topics",
		placeholder: (t) => `Search within ${t.toLowerCase()}…`,
		everywhere: "Search the whole blog →",
		meta: (t) => `${t}: Sea of Cortez & La Paz articles | Keabelmet Blog`,
	},
}

export async function generateStaticParams() {
	const params: { locale: string; tema: string }[] = []
	for (const m of CATEGORY_META) for (const locale of locales) params.push({ locale, tema: m.slug[contentLocale(locale)] })
	return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; tema: string }> }): Promise<Metadata> {
	const { locale: loc, tema } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const found = findCategoryBySlug(tema)
	if (!found) return {}
	const lang = contentLocale(locale)
	const { meta } = found
	const label = categoryLabel(meta.key, lang)
	const esUrl = `${SITE_URL}/blog/tema/${meta.slug.es}`
	const enUrl = `${SITE_URL}/en/blog/tema/${meta.slug.en}`
	const url = lang === "es" ? esUrl : enUrl
	return {
		title: tc[lang].meta(label),
		description: meta.desc[lang],
		alternates: { canonical: url, languages: { es: esUrl, en: enUrl, "x-default": esUrl } },
		openGraph: { title: tc[lang].meta(label), description: meta.desc[lang], url, siteName: "Keabelmet Expeditions", type: "website", images: [{ url: meta.image }] },
		robots: locale === "es" || locale === "en" ? undefined : { index: false, follow: true },
	}
}

export default async function BlogTopicPage({ params }: { params: Promise<{ locale: string; tema: string }> }) {
	const { locale: loc, tema } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const found = findCategoryBySlug(tema)
	if (!found) notFound()
	const lang = contentLocale(locale)
	const { meta } = found
	// Slug del otro idioma (p. ej. al cambiar de idioma): redirigimos al correcto.
	if (meta.slug[lang] !== tema) permanentRedirect(categoryPath(meta.key, locale))

	const c = blogCopy[lang]
	const t = tc[lang]
	const label = categoryLabel(meta.key, lang)
	const all = getAllPosts()
	const posts = all.filter((p) => p.category === meta.key)
	const blogHref = localizeHref("/blog", locale)
	const url = `${SITE_URL}${categoryPath(meta.key, locale)}`

	const jsonLd = [
		breadcrumbSchema([
			{ name: "Keabelmet", url: `${SITE_URL}${localizeHref("/", locale)}` },
			{ name: "Blog", url: `${SITE_URL}${blogHref}` },
			{ name: label, url },
		]),
		{
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			name: label,
			description: meta.desc[lang],
			url,
			inLanguage: lang === "es" ? "es-MX" : "en-US",
			mainEntity: {
				"@type": "ItemList",
				itemListElement: posts.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE_URL}${postPath(p, locale)}`, name: p[lang].title })),
			},
		},
	]

	return (
		<main>
			<JsonLd data={jsonLd} />
			<section className="blog-topic-hero">
				<Image src={meta.image} alt={label} fill priority sizes="100vw" style={{ objectFit: "cover" }} />
				<div className="blog-topic-hero-inner">
					<Link href={blogHref} className="blog-topic-back">{t.back}</Link>
					<span className="kicker">{t.kicker}</span>
					<h1>{label}</h1>
					<p>{meta.desc[lang]}</p>
					<em>{c.articles(posts.length)}</em>
				</div>
			</section>

			<div className="page-wrap blog-wrap">
				<BlogSearch
					items={searchIndex(locale, posts)}
					suggestions={topicSuggestions(meta.key, lang)}
					everywhereHref={blogHref}
					lang={lang}
					placeholder={t.placeholder(label)}
					everywhereLabel={t.everywhere}
				>
					{posts.length === 0 ? (
						<p className="blog-empty">{lang === "es" ? "Pronto publicaremos artículos en este tema." : "We'll publish articles on this topic soon."}</p>
					) : (
						<div className="blog-grid">
							{posts.map((p) => {
								const pc = p[lang]
								return (
									<Link key={p.id} href={postPath(p, locale)} className="blog-tile">
										<div className="blog-tile-img">
											<Image src={p.cover} alt={pc.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 360px" style={{ objectFit: "cover" }} />
										</div>
										<div className="blog-tile-body">
											<span className="blog-tile-cat">{label} · {readMinutes(pc)} {c.min}</span>
											<h2>{pc.title}</h2>
											<p>{pc.excerpt}</p>
										</div>
									</Link>
								)
							})}
						</div>
					)}
				</BlogSearch>

				<h2 className="blog-section-title">{t.others}</h2>
				<div className="blog-topics blog-topics-sm">
					{CATEGORY_META.filter((m) => m.key !== meta.key).map((m) => (
						<Link key={m.key} href={categoryPath(m.key, locale)} className="blog-topic">
							<Image src={m.image} alt={categoryLabel(m.key, lang)} fill sizes="(max-width: 640px) 50vw, 240px" style={{ objectFit: "cover" }} />
							<span className="blog-topic-body">
								<strong>{categoryLabel(m.key, lang)}</strong>
								<em>{c.articles(all.filter((p) => p.category === m.key).length)} →</em>
							</span>
						</Link>
					))}
				</div>
			</div>
		</main>
	)
}

/** Palabras sugeridas dentro de cada tema. */
function topicSuggestions(key: string, lang: BlogLocale): string[] {
	const s: Record<string, Record<BlogLocale, string[]>> = {
		fauna: { es: ["tiburón ballena", "lobos marinos", "móbulas", "orcas", "marlín"], en: ["whale shark", "sea lions", "mobula", "orcas", "marlin"] },
		temporadas: { es: ["noviembre", "invierno", "temperatura", "tiburón ballena", "ballena gris"], en: ["November", "winter", "temperature", "whale shark", "gray whale"] },
		destinos: { es: ["Espíritu Santo", "Balandra", "Cabo Pulmo", "Bahía Magdalena"], en: ["Espíritu Santo", "Balandra", "Cabo Pulmo", "Magdalena Bay"] },
		actividades: { es: ["snorkel", "buceo", "certificación", "safari"], en: ["snorkeling", "diving", "certification", "safari"] },
		planea: { es: ["días", "qué llevar", "lancha", "mareo"], en: ["days", "what to bring", "boat", "seasick"] },
		conservacion: { es: ["El Niño", "surgencias", "Cabo Pulmo", "sardina"], en: ["El Niño", "upwelling", "Cabo Pulmo", "sardine"] },
	}
	return s[key]?.[lang] ?? []
}
