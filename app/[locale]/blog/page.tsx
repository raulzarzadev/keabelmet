import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n"
import { SITE_URL } from "@/lib/seo"
import {
	getAllPosts,
	contentLocale,
	categoryLabel,
	postPath,
	readMinutes,
	localizeHref,
	BLOG_CATEGORIES,
	type BlogCategory,
	type BlogLocale,
} from "@/lib/blog"

const copy: Record<BlogLocale, { kicker: string; title: string; sub: string; all: string; min: string; empty: string; metaTitle: string; metaDesc: string }> = {
	es: {
		kicker: "Blog Keabelmet",
		title: "Todo lo que quieres saber antes de lanzarte al Mar de Cortés",
		sub: "Respuestas claras, con fotos reales y respaldadas por ciencia, a las preguntas que todo viajero se hace sobre La Paz y Baja California Sur: fauna, temporadas, lugares, buceo y cómo planear tu viaje.",
		all: "Todo",
		min: "min",
		empty: "Pronto publicaremos artículos en esta categoría.",
		metaTitle: "Blog de fauna marina de La Paz y la Baja",
		metaDesc: "Guías con base científica sobre el Mar de Cortés: cuándo ver tiburón ballena, ballena gris y lobos marinos, el Sardine Run, buceo y cómo planear tu viaje.",
	},
	en: {
		kicker: "Keabelmet Blog",
		title: "Everything you want to know before diving into the Sea of Cortez",
		sub: "Clear, science-backed answers with real photos to the questions every traveler asks about La Paz and Baja California Sur: wildlife, seasons, places, diving and how to plan your trip.",
		all: "All",
		min: "min",
		empty: "We'll publish articles in this category soon.",
		metaTitle: "La Paz & Baja Marine Wildlife Blog",
		metaDesc: "Science-backed guides to the Sea of Cortez: when to see whale sharks, gray whales and sea lions, the Sardine Run, diving and how to plan your trip.",
	},
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale: loc } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const lang = contentLocale(locale)
	const c = copy[lang]
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
	const c = copy[lang]
	const { cat } = await searchParams
	const active = BLOG_CATEGORIES.some((x) => x.key === cat) ? (cat as BlogCategory) : null
	const all = getAllPosts()
	const posts = active ? all.filter((p) => p.category === active) : all
	const base = localizeHref("/blog", locale)

	return (
		<main>
			<section className="pagehero blog-hero">
				<span className="kicker">{c.kicker}</span>
				<h1>{c.title}</h1>
				<p>{c.sub}</p>
			</section>

			<div className="page-wrap blog-wrap">
				<nav className="blog-cats" aria-label={lang === "es" ? "Categorías" : "Categories"}>
					<Link href={base} className={!active ? "on" : undefined}>{c.all}</Link>
					{BLOG_CATEGORIES.map((x) => (
						<Link key={x.key} href={`${base}?cat=${x.key}`} className={active === x.key ? "on" : undefined}>
							{x[lang]}
						</Link>
					))}
				</nav>

				{posts.length === 0 ? (
					<p className="blog-empty">{c.empty}</p>
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
										<span className="blog-tile-cat">{categoryLabel(p.category, lang)} · {readMinutes(pc)} {c.min}</span>
										<h2>{pc.title}</h2>
										<p>{pc.excerpt}</p>
									</div>
								</Link>
							)
						})}
					</div>
				)}
			</div>
		</main>
	)
}
