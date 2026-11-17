import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { permanentRedirect } from "next/navigation"
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo"
import BlogSearch from "@/components/blog/BlogSearch"
import { blogCopy } from "@/lib/blog/copy"
import {
	getAllPosts,
	contentLocale,
	categoryLabel,
	categoryPath,
	postPath,
	readMinutes,
	searchIndex,
	BLOG_CATEGORIES,
	CATEGORY_META,
	type BlogCategory,
	type BlogLocale,
} from "@/lib/blog"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale: loc } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const lang = contentLocale(locale)
	const c = blogCopy[lang]
	const esUrl = `${SITE_URL}/blog`
	const enUrl = `${SITE_URL}/en/blog`
	return {
		title: c.metaTitle,
		description: c.metaDesc,
		alternates: { canonical: lang === "es" ? esUrl : enUrl, languages: { es: esUrl, en: enUrl, "x-default": esUrl } },
		openGraph: { title: c.metaTitle, description: c.metaDesc, url: lang === "es" ? esUrl : enUrl, siteName: "Keabelmet Expeditions", type: "website", images: [{ url: "/images/especies/delfinsaltando.jpeg" }] },
		robots: locale === "es" || locale === "en" ? undefined : { index: false, follow: true },
	}
}

export default async function BlogIndex({
	params,
	searchParams,
}: {
	params: Promise<{ locale: string }>
	searchParams: Promise<{ cat?: string }>
}) {
	const { locale: loc } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const lang = contentLocale(locale)
	const c = blogCopy[lang]
	const { cat } = await searchParams
	// Los enlaces viejos ?cat=… ahora tienen su propia página de tema.
	if (cat && BLOG_CATEGORIES.some((x) => x.key === cat)) permanentRedirect(categoryPath(cat as BlogCategory, locale))

	const posts = getAllPosts()
	const count = (k: BlogCategory) => posts.filter((p) => p.category === k).length

	return (
		<main>
			<section className="pagehero blog-hero">
				<span className="kicker">{c.kicker}</span>
				<h1>{c.title}</h1>
				<p>{c.sub}</p>
			</section>

			<div className="page-wrap blog-wrap">
				<BlogSearch
					items={searchIndex(locale, posts)}
					suggestions={c.suggestions}
					lang={lang}
					placeholder={c.placeholder}
				>
					<h2 className="blog-section-title">{c.topics}</h2>
					<div className="blog-topics">
						{CATEGORY_META.map((m) => (
							<Link key={m.key} href={categoryPath(m.key, locale)} className="blog-topic">
								<Image src={m.image} alt={categoryLabel(m.key, lang)} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 380px" style={{ objectFit: "cover" }} />
								<span className="blog-topic-body">
									<strong>{categoryLabel(m.key, lang)}</strong>
									<span>{m.desc[lang]}</span>
									<em>{c.articles(count(m.key))} →</em>
								</span>
							</Link>
						))}
					</div>

					<h2 className="blog-section-title">{c.latest}</h2>
					<div className="blog-grid">
						{posts.map((p) => {
							const pc = p[lang]
							return (
								<Link key={p.id} href={postPath(p, locale)} className="blog-tile">
									<div className="blog-tile-img">
										<Image src={p.cover} alt={pc.coverAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 360px" style={{ objectFit: "cover" }} />
									</div>
									<div className="blog-tile-body">
										<span className="blog-tile-cat">{categoryLabel(p.category, lang)} · {readMinutes(pc)} {c.min}</span>
										<h2>{pc.title}</h2>
										<p>{pc.excerpt}</p>
									</div>
								</Link>
							)
						})}
					</div>
				</BlogSearch>
			</div>
		</main>
	)
}
