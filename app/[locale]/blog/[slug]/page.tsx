import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound, permanentRedirect } from "next/navigation"
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo"
import {
	getAllPosts,
	findPostBySlug,
	contentLocale,
	categoryLabel,
	postPath,
	readMinutes,
	plainText,
	relatedPosts,
	localizeHref,
	type BlogBlock,
	type BlogLocale,
} from "@/lib/blog"
import { experiences } from "@/constants/experiences"
import InlineText from "@/components/blog/InlineText"
import { Price } from "@/contexts/CurrencyContext"

const ui: Record<BlogLocale, Record<string, string>> = {
	es: {
		home: "Inicio", blog: "Blog", answer: "Respuesta rápida", tip: "Tip de guía", fact: "Dato científico",
		by: "Por el equipo de Keabelmet · guías biólogos marinos en La Paz", min: "min de lectura", updated: "Actualizado",
		live: "Vívelo con Keabelmet", from: "desde", see: "Ver expedición", faq: "Preguntas frecuentes",
		sources: "Fuentes científicas", sourcesNote: "Los datos sobre fauna, temporadas y geografía de este artículo provienen de estas publicaciones. Las citas [n] del texto enlazan aquí.",
		related: "Sigue leyendo", back: "Volver al blog",
	},
	en: {
		home: "Home", blog: "Blog", answer: "Quick answer", tip: "Guide tip", fact: "Science fact",
		by: "By the Keabelmet team · marine biologist guides in La Paz", min: "min read", updated: "Updated",
		live: "Experience it with Keabelmet", from: "from", see: "See expedition", faq: "Frequently asked questions",
		sources: "Scientific sources", sourcesNote: "The wildlife, season and geography facts in this article come from these publications. The [n] citations in the text link here.",
		related: "Keep reading", back: "Back to the blog",
	},
}

const inLanguage: Record<BlogLocale, string> = { es: "es-MX", en: "en-US" }

function formatDate(iso: string, lang: BlogLocale): string {
	const [y, m, d] = iso.split("-").map(Number)
	return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(lang === "es" ? "es-MX" : "en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
}

export async function generateStaticParams() {
	const params: { locale: string; slug: string }[] = []
	for (const post of getAllPosts()) {
		for (const locale of locales) params.push({ locale, slug: post[contentLocale(locale)].slug })
	}
	return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
	const { locale: loc, slug } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const found = findPostBySlug(slug)
	if (!found) return {}
	const { post } = found
	const lang = contentLocale(locale)
	const c = post[lang]
	const esUrl = `${SITE_URL}/blog/${post.es.slug}`
	const enUrl = `${SITE_URL}/en/blog/${post.en.slug}`
	const canonical = lang === "es" ? esUrl : enUrl
	const title = c.metaTitle ?? c.title
	return {
		title,
		description: c.description,
		alternates: { canonical, languages: { es: esUrl, en: enUrl, "x-default": esUrl } },
		openGraph: {
			type: "article",
			title,
			description: c.description,
			url: canonical,
			siteName: "Keabelmet Expeditions",
			locale: lang === "es" ? "es_MX" : "en_US",
			publishedTime: post.date,
			modifiedTime: post.updated ?? post.date,
			images: [{ url: post.cover, alt: c.coverAlt }],
		},
		twitter: { card: "summary_large_image", title, description: c.description, images: [post.cover] },
		// fr/zh/ca muestran la versión en inglés: que Google indexe solo es/en.
		robots: locale === "es" || locale === "en" ? undefined : { index: false, follow: true },
	}
}

function Block({ b, locale, lang }: { b: BlogBlock; locale: Locale; lang: BlogLocale }) {
	const t = ui[lang]
	switch (b.type) {
		case "h2":
			return <h2>{b.text}</h2>
		case "h3":
			return <h3>{b.text}</h3>
		case "p":
			return <p><InlineText text={b.text} locale={locale} /></p>
		case "ul":
			return <ul>{b.items.map((x, i) => <li key={i}><InlineText text={x} locale={locale} /></li>)}</ul>
		case "ol":
			return <ol>{b.items.map((x, i) => <li key={i}><InlineText text={x} locale={locale} /></li>)}</ol>
		case "img":
			return (
				<figure className="ba-figure">
					<div className="ba-figure-media"><Image src={b.src} alt={b.alt} fill sizes="(max-width: 820px) 100vw, 760px" style={{ objectFit: "cover" }} /></div>
					{b.caption && <figcaption>{b.caption}</figcaption>}
				</figure>
			)
		case "tip":
			return <aside className="ba-callout ba-tip"><span className="ba-callout-label">🧭 {t.tip}</span><p><InlineText text={b.text} locale={locale} /></p></aside>
		case "fact":
			return <aside className="ba-callout ba-fact"><span className="ba-callout-label">🔬 {t.fact}</span><p><InlineText text={b.text} locale={locale} /></p></aside>
		case "table":
			return (
				<div className="ba-table-wrap">
					<table className="ba-table">
						<thead><tr>{b.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
						<tbody>{b.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j}><InlineText text={cell} locale={locale} /></td>)}</tr>)}</tbody>
					</table>
				</div>
			)
	}
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
	const { locale: loc, slug } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const found = findPostBySlug(slug)
	if (!found) notFound()
	const { post } = found
	const lang = contentLocale(locale)
	// Si llegan con el slug del otro idioma (p. ej. al cambiar de idioma), redirigimos.
	if (post[lang].slug !== slug) permanentRedirect(postPath(post, locale))

	const c = post[lang]
	const t = ui[lang]
	const url = lang === "es" ? `${SITE_URL}/blog/${post.es.slug}` : `${SITE_URL}/en/blog/${post.en.slug}`
	const exps = post.experiences.map((s) => experiences.find((e) => e.slug === s)).filter((e): e is NonNullable<typeof e> => !!e)
	const related = relatedPosts(post, 3)
	const minutes = readMinutes(c)

	const jsonLd = [
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: c.title,
			description: c.description,
			image: [`${SITE_URL}${post.cover}`],
			datePublished: post.date,
			dateModified: post.updated ?? post.date,
			inLanguage: inLanguage[lang],
			mainEntityOfPage: url,
			articleSection: categoryLabel(post.category, lang),
			author: { "@type": "Organization", name: "Keabelmet Expeditions", url: SITE_URL },
			publisher: { "@id": `${SITE_URL}/#organization` },
			abstract: plainText(c.answer),
			citation: post.sources.map((s) => ({
				"@type": s.kind === "thesis" ? "Thesis" : s.kind === "paper" ? "ScholarlyArticle" : "CreativeWork",
				name: s.title,
				author: s.authors,
				datePublished: s.year,
				publisher: s.publication,
				url: s.url,
			})),
		},
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: c.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plainText(f.a) } })),
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{ "@type": "ListItem", position: 1, name: t.home, item: lang === "es" ? `${SITE_URL}/` : `${SITE_URL}/en` },
				{ "@type": "ListItem", position: 2, name: t.blog, item: lang === "es" ? `${SITE_URL}/blog` : `${SITE_URL}/en/blog` },
				{ "@type": "ListItem", position: 3, name: c.title, item: url },
			],
		},
	]

	return (
		<main className="blog-article">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<article>
				<header className="ba-header">
					<nav className="ba-crumbs" aria-label="breadcrumb">
						<Link href={localizeHref("/", locale)}>{t.home}</Link> <span>›</span>{" "}
						<Link href={localizeHref("/blog", locale)}>{t.blog}</Link> <span>›</span>{" "}
						<Link href={`${localizeHref("/blog", locale)}?cat=${post.category}`}>{categoryLabel(post.category, lang)}</Link>
					</nav>
					<h1>{c.title}</h1>
					<p className="ba-meta">
						{t.by} · {formatDate(post.updated ?? post.date, lang)} · {minutes} {t.min}
					</p>
				</header>
				<div className="ba-cover">
					<Image src={post.cover} alt={c.coverAlt} fill priority sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectFit: "cover" }} />
				</div>

				<div className="ba-body">
					<section className="ba-answer">
						<span>⚡ {t.answer}</span>
						<p><InlineText text={c.answer} locale={locale} /></p>
					</section>

					{c.blocks.map((b, i) => <Block key={i} b={b} locale={locale} lang={lang} />)}

					{exps.length > 0 && (
						<section className="ba-exps">
							<h2>{t.live}</h2>
							<div className="ba-exps-grid">
								{exps.map((e) => {
									const ei = e.i18n[lang] ?? e.i18n.es
									return (
										<Link key={e.slug} href={localizeHref(e.href, locale)} className="ba-exp">
											<div className="ba-exp-img"><Image src={e.image} alt={ei.title} fill sizes="(max-width: 640px) 100vw, 360px" style={{ objectFit: "cover" }} /></div>
											<div className="ba-exp-body">
												<strong>{ei.title}</strong>
												{e.fromMxn != null && <span className="ba-exp-price">{t.from} <Price amount={e.fromMxn} /></span>}
												<span className="ba-exp-cta">{t.see} →</span>
											</div>
										</Link>
									)
								})}
							</div>
						</section>
					)}

					{c.faq.length > 0 && (
						<section className="ba-faq">
							<h2>{t.faq}</h2>
							{c.faq.map((f, i) => (
								<details key={i}>
									<summary>{f.q}</summary>
									<p><InlineText text={f.a} locale={locale} /></p>
								</details>
							))}
						</section>
					)}

					{post.sources.length > 0 && (
						<section className="ba-sources" id="fuentes">
							<h2>{t.sources}</h2>
							<p className="ba-sources-note">{t.sourcesNote}</p>
							<ol>
								{post.sources.map((s) => (
									<li key={s.id} id={`fuente-${s.id}`}>
										{s.authors} ({s.year}). <em>{s.title}</em>. {s.publication}.{" "}
										<a href={s.url} target="_blank" rel="noopener noreferrer">{s.url.replace(/^https?:\/\//, "").slice(0, 60)}{s.url.replace(/^https?:\/\//, "").length > 60 ? "…" : ""}</a>
									</li>
								))}
							</ol>
						</section>
					)}

					{related.length > 0 && (
						<section className="ba-related">
							<h2>{t.related}</h2>
							<div className="ba-related-grid">
								{related.map((p) => (
									<Link key={p.id} href={postPath(p, locale)} className="ba-related-card">
										<div className="ba-related-img"><Image src={p.cover} alt={p[lang].coverAlt} fill sizes="(max-width: 640px) 100vw, 260px" style={{ objectFit: "cover" }} /></div>
										<span className="ba-related-cat">{categoryLabel(p.category, lang)}</span>
										<strong>{p[lang].title}</strong>
									</Link>
								))}
							</div>
						</section>
					)}

					<p className="ba-back"><Link href={localizeHref("/blog", locale)}>← {t.back}</Link></p>
				</div>
			</article>
		</main>
	)
}
