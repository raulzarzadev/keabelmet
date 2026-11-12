import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { isValidLocale, defaultLocale, type Locale } from "@/lib/i18n"
import { pageMeta, buildUrl, SITE_URL } from "@/lib/seo"
import Breadcrumbs from "@/components/Breadcrumbs"
import HomeQuiz from "@/components/HomeQuiz"
import { JsonLd, breadcrumbSchema } from "@/lib/jsonLd"
import { WHATSAPP_NUMBER } from "@/config/whatsapp"
import { TOURS, type Mode } from "@/lib/tour-finder"
import {
	GUIDE_PATH,
	allYearTours,
	animalGuides,
	guideTexts,
	helpers,
	minPrice,
	monthRows,
	mxn,
	quickAnswers,
	toursForMode,
} from "@/lib/tour-guide"

const MODES: Mode[] = ["boat", "snorkel", "firstDive", "certified"]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
	const { locale } = await params
	if (!isValidLocale(locale)) return {}
	const g = guideTexts[locale]
	return pageMeta({ path: GUIDE_PATH, locale, title: g.metaTitle, description: g.metaDesc, image: "/tiburon-ballena-drone.jpg" })
}

export default async function QueHacerEnLaPaz({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: loc } = await params
	const locale: Locale = isValidLocale(loc) ? loc : defaultLocale
	const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)
	const g = guideTexts[locale]
	const h = helpers(locale)
	const q = h.q
	const url = buildUrl(GUIDE_PATH, locale)
	const faqs = g.faqs(h)
	const rows = monthRows()
	const allYear = allYearTours()

	const jsonLd = [
		breadcrumbSchema([
			{ name: "Keabelmet", url: buildUrl("/", locale) },
			{ name: g.breadcrumb, url },
		]),
		{
			"@context": "https://schema.org",
			"@type": "FAQPage",
			url,
			mainEntity: faqs.map((f) => ({
				"@type": "Question",
				name: f.q,
				acceptedAnswer: { "@type": "Answer", text: f.a },
			})),
		},
		{
			"@context": "https://schema.org",
			"@type": "ItemList",
			name: g.h1,
			itemListElement: TOURS.map((t, i) => ({
				"@type": "ListItem",
				position: i + 1,
				item: {
					"@type": "TouristTrip",
					name: q.tours[t.id].name,
					description: q.tours[t.id].blurb,
					url: buildUrl(t.href, locale),
					image: `${SITE_URL}${t.image}`,
					provider: { "@id": `${SITE_URL}/#organization` },
					offers: {
						"@type": "Offer",
						price: minPrice(t),
						priceCurrency: "MXN",
						availability: "https://schema.org/InStock",
						url: buildUrl(t.href, locale),
					},
				},
			})),
		},
	]

	const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(g.waText)}`

	return (
		<main className="gd">
			<JsonLd data={jsonLd} />
			<Breadcrumbs locale={locale} items={[{ label: g.breadcrumb }]} />

			<header className="section-head gd-head">
				<span className="kicker">{g.kicker}</span>
				<h1 className="section-head-title">{g.h1}</h1>
				<p className="gd-lead">{g.lead}</p>
			</header>

			<section className="wrap gd-section" aria-labelledby="gd-quick">
				<div className="gd-quick">
					<h2 id="gd-quick">{g.quickTitle}</h2>
					<ul>
						{quickAnswers(locale).map((b) => (
							<li key={b}>{b}</li>
						))}
					</ul>
				</div>
			</section>

			<div className="gd-quiz-head wrap">
				<h2>{g.quizTitle}</h2>
				<p>{g.quizSub}</p>
			</div>
			<HomeQuiz locale={locale} showGuideLink={false} />

			<section className="wrap gd-section" aria-labelledby="gd-months">
				<h2 id="gd-months">{g.monthTitle}</h2>
				<p className="gd-intro">{g.monthIntro}</p>
				<div className="gd-table-wrap">
					<table className="gd-table">
						<thead>
							<tr>
								<th scope="col">{g.colMonth}</th>
								<th scope="col">{g.colHighlights}</th>
								<th scope="col">{g.colTours}</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((r) => (
								<tr key={r.month}>
									<th scope="row">{q.monthsLong[r.month - 1]}</th>
									<td data-label={g.colHighlights}>
										{r.highlights.map((x, i) => (
											<span key={x.id}>
												{i > 0 && ", "}
												{x.peak ? <strong>{q.animals[x.id]}</strong> : q.animals[x.id]}
												{x.peak ? ` (${g.peak})` : x.maybe ? ` (${g.maybe})` : ""}
											</span>
										))}
										{r.sealionNoSwim && <span className="gd-small"> {g.sealionNoSwim}</span>}
									</td>
									<td data-label={g.colTours}>
										{r.seasonalTours.map((id, i) => (
											<span key={id}>
												{i > 0 && ", "}
												<Link href={lh(TOURS.find((t) => t.id === id)!.href)}>{q.tours[id].name}</Link>
											</span>
										))}
									</td>
								</tr>
							))}
							<tr className="gd-allyear">
								<td colSpan={3}>
									<strong>{q.allYear.charAt(0).toUpperCase() + q.allYear.slice(1)}:</strong>{" "}
									{allYear.map((id, i) => (
										<span key={id}>
											{i > 0 && ", "}
											<Link href={lh(TOURS.find((t) => t.id === id)!.href)}>{q.tours[id].name}</Link>
										</span>
									))}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			<section className="wrap gd-section" aria-labelledby="gd-modes">
				<h2 id="gd-modes">{g.modeTitle}</h2>
				<p className="gd-intro">{g.modeIntro}</p>
				{MODES.map((m) => (
					<div key={m} className="gd-mode">
						<h3>
							{q.modes[m].title} <span className="gd-small">· {q.modes[m].desc}</span>
						</h3>
						<div className="gd-table-wrap">
							<table className="gd-table">
								<thead>
									<tr>
										<th scope="col">{g.colTour}</th>
										<th scope="col">{g.colPrice}</th>
										<th scope="col">{g.colDuration}</th>
										<th scope="col">{g.colSeason}</th>
										<th scope="col">{g.colAge}</th>
									</tr>
								</thead>
								<tbody>
									{toursForMode(m).map((t) => {
										const p = t.modes[m]!
										return (
											<tr key={t.id}>
												<th scope="row">
													<Link href={lh(t.href)}>{q.tours[t.id].name}</Link>
												</th>
												<td data-label={g.colPrice}>
													{p.from && locale !== "zh" ? `${q.from} ` : ""}
													{mxn(p.mxn)}
													{p.from && locale === "zh" ? " 起" : ""}
												</td>
												<td data-label={g.colDuration}>{q.tours[t.id].duration}</td>
												<td data-label={g.colSeason}>{h.range(t.months)}</td>
												<td data-label={g.colAge}>{t.privateUnder14 ? g.agePrivate : t.minAge === 0 ? g.ageFamily : g.ageMin(t.minAge)}</td>
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
				))}
			</section>

			<section className="wrap gd-section" aria-labelledby="gd-animals">
				<h2 id="gd-animals">{g.animalTitle}</h2>
				<p className="gd-intro">{g.animalIntro}</p>
				<div className="gd-animals">
					{animalGuides().map((a) => (
						<article key={a.id} className="gd-animal">
							<div className="gd-animal-photo">
								<Image src={a.image} alt={q.animals[a.id]} fill sizes="(max-width: 700px) 100vw, 360px" className="tf-img" />
							</div>
							<div className="gd-animal-body">
								<h3>{q.animals[a.id]}</h3>
								<ul>
									{a.spots.map((s) => (
										<li key={s.tour}>
											<Link href={lh(TOURS.find((t) => t.id === s.tour)!.href)}>{q.tours[s.tour].name}</Link>
											{" · "}
											{s.modes.map((m) => q.modes[m].badge).join(" / ")}
											{" · "}
											{h.range(s.months)}
											{!s.maybe && s.peak && s.peak.length < 12 ? ` (${g.animalPeak(h.range(s.peak))})` : ""}
											{s.maybe ? ` — ${g.animalMaybe}` : ""}
										</li>
									))}
								</ul>
								{a.id === "orca" && <p className="tf-note">{q.notes.orca}</p>}
								{a.id === "sealion" && <p className="tf-note">{q.notes.sealionSummer}</p>}
							</div>
						</article>
					))}
				</div>
			</section>

			<section className="wrap gd-section" aria-labelledby="gd-cases">
				<h2 id="gd-cases">{g.situationsTitle}</h2>
				<div className="gd-cases">
					{g.situations(h).map((s) => (
						<div key={s.title} className="gd-case">
							<h3>{s.title}</h3>
							<p>{s.text}</p>
						</div>
					))}
				</div>
			</section>

			<section className="wrap gd-section" aria-labelledby="gd-faq">
				<h2 id="gd-faq">{g.faqTitle}</h2>
				<div className="sp-faq gd-faq">
					{faqs.map((f, i) => (
						<details key={f.q} open={i < 3}>
							<summary>{f.q}</summary>
							<div className="sp-faq-a">
								<p>{f.a}</p>
							</div>
						</details>
					))}
				</div>
			</section>

			<section className="wrap gd-section gd-cta">
				<h2>{g.ctaTitle}</h2>
				<p>{g.ctaText}</p>
				<a href={wa} className="btn btn-solid" target="_blank" rel="noopener noreferrer">
					{g.ctaWa}
				</a>
				<p className="gd-small">{g.updated}</p>
			</section>
		</main>
	)
}
