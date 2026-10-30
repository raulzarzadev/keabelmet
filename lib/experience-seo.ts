import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"
import { buildPageMeta, buildUrl, getPageSeo, SITE_URL, type PageSeoKey } from "@/lib/seo"
import { breadcrumbSchema, touristTripSchema } from "@/lib/jsonLd"
import { getStoryPage } from "@/constants/story-pages"
import { getExperience } from "@/constants/experiences"

/**
 * SEO de las páginas de experiencias, en un solo lugar: metadatos con la foto
 * de portada de cada tour (para Google y redes) y datos estructurados
 * construidos con los MISMOS datos que muestra la página (precio más bajo
 * de sus tarjetas, foto hero y preguntas frecuentes), para que nunca se
 * contradigan.
 */
const EXPERIENCES: Record<string, { key: PageSeoKey; touristType: string[] }> = {
	"tiburon-ballena": { key: "tiburonBallena", touristType: ["Snorkeling", "Wildlife watching", "Family"] },
	"tour-espiritu-santo": { key: "tourEspirituSanto", touristType: ["Snorkeling", "Wildlife watching", "Beach", "Family"] },
	"tour-ballena-gris": { key: "tourBallenaGris", touristType: ["Whale watching", "Wildlife watching", "Family"] },
	"safari-bahia-magdalena": { key: "safariBahiaMagdalena", touristType: ["Snorkeling", "Wildlife watching", "Adventure"] },
	"safari-la-ventana": { key: "safariLaVentana", touristType: ["Snorkeling", "Wildlife watching", "Adventure"] },
	"buceo-cabo-pulmo": { key: "buceoCaboPulmo", touristType: ["Scuba diving", "Snorkeling", "Wildlife watching"] },
	"buceo-la-paz": { key: "buceoLaPaz", touristType: ["Scuba diving", "Wildlife watching"] },
	"scuba-discovery": { key: "scubaDiscovery", touristType: ["Scuba diving", "Beginners"] },
	"certificacion-open-water": { key: "openWater", touristType: ["Scuba diving", "Diving course"] },
}

const homeLabel: Record<Locale, string> = { es: "Inicio", en: "Home", fr: "Accueil", zh: "首页", ca: "Inici" }

const abs = (src: string) => (src.startsWith("http") ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`)

function storyFacts(slug: string, locale: Locale) {
	const story = getStoryPage(slug, locale)
	const exp = getExperience(slug)
	const prices: number[] = []
	const faq: { q: string; a: string }[] = []
	for (const b of story?.blocks ?? []) {
		if (b.type === "pricing") for (const c of b.cards) if (typeof c.amountMxn === "number" && c.amountMxn > 0) prices.push(c.amountMxn)
		if (b.type === "faq") for (const it of b.items) faq.push({ q: it.q, a: it.a.join(" ") })
	}
	const image = story?.hero.image || exp?.image
	const fromMxn = prices.length ? Math.min(...prices) : exp?.fromMxn ?? undefined
	const toMxn = prices.length ? Math.max(...prices) : fromMxn
	return { image, fromMxn, toMxn, offerCount: prices.length, faq }
}

export function experienceMeta(slug: string, locale: Locale): Metadata {
	const cfg = EXPERIENCES[slug]
	const { image } = storyFacts(slug, locale)
	return buildPageMeta(cfg.key, `/experiencias/${slug}`, locale, image)
}

export function experienceSchemas(slug: string, locale: Locale): object[] {
	const cfg = EXPERIENCES[slug]
	const seo = getPageSeo(cfg.key, locale)
	const url = buildUrl(`/experiencias/${slug}`, locale)
	const { image, fromMxn, toMxn, offerCount, faq } = storyFacts(slug, locale)
	const trip = touristTripSchema(
		{
			name: seo.title,
			description: seo.description,
			image: image ? abs(image) : undefined,
			url,
			priceMxn: fromMxn ?? undefined,
			touristType: cfg.touristType,
		},
		locale,
	)
	// Varias opciones con precios distintos (p. ej. snorkel vs. buceo): rango completo.
	if (offerCount > 1 && fromMxn !== undefined && toMxn !== undefined && toMxn > fromMxn) {
		;(trip as Record<string, unknown>).offers = {
			"@type": "AggregateOffer",
			lowPrice: fromMxn,
			highPrice: toMxn,
			offerCount,
			priceCurrency: "MXN",
			availability: "https://schema.org/InStock",
			url,
		}
	}
	const schemas: object[] = [
		breadcrumbSchema([
			{ name: homeLabel[locale], url: buildUrl("/", locale) },
			{ name: getPageSeo("experiences", locale).title, url: buildUrl("/experiencias", locale) },
			{ name: seo.title, url },
		]),
		trip,
	]
	if (faq.length) {
		schemas.push({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
		})
	}
	return schemas
}
