import { experiences } from "@/constants/experiences"
import { getStoryPage } from "@/constants/story-pages"
import { getSeason, isDateInSeason, seasonLabel } from "@/lib/expedition-seasons"
import { computePackageDiscount, PACKAGES } from "@/lib/packages"
import { isValidPrice } from "@/lib/pricing-catalog"
import { signDeal, computeDealTotals, DEAL_DEPOSIT_RATE, type Deal, type DealLine } from "@/lib/deal"
import { SITE_URL } from "@/lib/seo"
import type { Locale } from "@/lib/i18n"

/**
 * Catálogo y cotizaciones del bot. Todo precio sale de las tarjetas de precio
 * de las páginas de expedición (la misma fuente que valida el cobro en el
 * servidor): el modelo solo elige actividad, modalidad, personas y fecha; nunca
 * escribe un monto.
 */

const PHOTO_BY_SLUG: Record<string, string> = {
	"tiburon-ballena": "tiburon",
	"safari-bahia-magdalena": "sardine",
	"safari-la-ventana": "orca",
	"tour-ballena-gris": "ballena-gris",
	"tour-espiritu-santo": "lobos",
	"buceo-la-paz": "buceo-espiritu",
	"certificacion-open-water": "open-water",
	"scuba-discovery": "buceo-playa",
	"buceo-cabo-pulmo": "cabo-pulmo",
}

export interface CatalogOption {
	/** Identificador estable "slug#índice" que usa el modelo. */
	id: string
	slug: string
	index: number
	activity: string
	name: string
	amountMxn?: number
	/** true si el precio es por embarcación (no se multiplica por personas). */
	perBoat: boolean
	unitNote?: string
	items: string[]
}

type PricingCard = { name: string; amountMxn?: number; amountText?: string; amountNote?: string; desc?: string; sub?: string; items?: string[] }

function pricingCards(slug: string, locale: Locale): PricingCard[] {
	const page = getStoryPage(slug, locale)
	const cards: PricingCard[] = []
	for (const b of page?.blocks ?? []) if (b.type === "pricing") cards.push(...b.cards)
	return cards
}

export function catalogOptions(locale: Locale = "es"): CatalogOption[] {
	const out: CatalogOption[] = []
	for (const exp of experiences) {
		const es = pricingCards(exp.slug, "es")
		const loc = pricingCards(exp.slug, locale)
		const title = ((exp.i18n as Record<string, { title: string }>)[locale] ?? exp.i18n.es).title
		es.forEach((card, index) => {
			const shown = loc[index] ?? card
			out.push({
				id: `${exp.slug}#${index}`,
				slug: exp.slug,
				index,
				activity: title,
				name: shown.name,
				amountMxn: card.amountMxn,
				perBoat: /embarcaci|lancha completa|boat/i.test(card.amountNote ?? ""),
				unitNote: shown.amountNote,
				items: shown.items ?? [],
			})
		})
	}
	return out
}

export function optionIds(): string[] {
	return catalogOptions("es").map((o) => o.id)
}

const mxn = (n: number) => `$${n.toLocaleString("es-MX")} MXN`

/** Texto del catálogo para el prompt del sistema (estable: no depende de la fecha). */
export function catalogText(): string {
	const parts: string[] = []
	for (const exp of experiences) {
		const page = getStoryPage(exp.slug, "es")
		if (!page) continue
		const season = getSeason(exp.slug)
		const lines: string[] = [
			`## ${exp.i18n.es.title} (slug: ${exp.slug})`,
			`Página: ${SITE_URL}${exp.href}`,
			`Temporada: ${seasonLabel(exp.slug, "es")} · Máximo ${season.maxPeople} personas por reserva`,
			`Resumen: ${exp.i18n.es.description}`,
		]
		for (const b of page.blocks) {
			switch (b.type) {
				case "quickfacts":
					lines.push(`Datos: ${b.items.map((i) => `${i.label}: ${i.value}`).join(" · ")}`)
					break
				case "pricing":
					lines.push("Opciones y precios:")
					b.cards.forEach((c, i) => {
						const price = typeof c.amountMxn === "number" ? `${mxn(c.amountMxn)} ${c.amountNote ?? ""}`.trim() : `${c.amountText ?? "A cotizar"} ${c.amountNote ?? ""}`.trim()
						lines.push(`- [${exp.slug}#${i}] ${c.name}: ${price}${c.sub ? ` (${c.sub})` : ""}${c.desc ? `. ${c.desc}` : ""}`)
						if (c.items?.length) lines.push(`  Incluye: ${c.items.join("; ")}`)
					})
					if (b.note) lines.push(`Nota de precios: ${b.note}`)
					break
				case "details":
				case "policies":
					for (const it of b.items) {
						const text = "text" in it ? it.text : it.paragraphs.join(" ")
						lines.push(`${it.title}: ${text}`)
					}
					break
				case "info":
					lines.push(b.items.map((i) => `${i.label}: ${i.value}`).join(" · "))
					break
				case "groups":
					for (const g of b.groups) lines.push(`${g.name}: ${g.items.join("; ")}`)
					break
				case "timeline":
					lines.push(`Itinerario: ${b.items.map((i) => `${i.time ? `${i.time} ` : ""}${i.title}`).join(" → ")}`)
					break
				case "faq":
					for (const it of b.items) lines.push(`P: ${it.q} R: ${it.a.join(" ")}`)
					break
			}
		}
		parts.push(lines.join("\n"))
	}
	const combos = PACKAGES.map(
		(p) => `- ${p.name.es}: ${Math.round(p.off * 100)}% de descuento por persona que haga todas estas actividades: ${p.slugs.join(", ")}`,
	)
	return `${parts.join("\n\n")}\n\n## Paquetes con descuento (se aplican solos al cotizar)\n${combos.join("\n")}`
}

// ── Cotización ─────────────────────────────────────────────────────────────

export interface QuoteItemInput {
	opcion: string
	personas: number
	fecha?: string | null
}

export interface QuoteLine {
	optionId: string
	slug: string
	label: string
	people: number
	dateISO?: string
	unitMxn: number
	perBoat: boolean
	grossMxn: number
	discountMxn: number
	discountLabel?: string
	netMxn: number
}

export interface Quote {
	ok: true
	lines: QuoteLine[]
	totalMxn: number
	discountMxn: number
	depositMxn: number
	remainingMxn: number
	warnings: string[]
}

export type QuoteResult = Quote | { ok: false; error: string }

function todayISO(): string {
	// La Paz (BCS) usa la hora del Pacífico mexicano.
	return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mazatlan" }).format(new Date())
}

export function buildQuote(items: QuoteItemInput[], locale: Locale = "es"): QuoteResult {
	if (!items.length) return { ok: false, error: "No hay actividades para cotizar." }
	const options = new Map(catalogOptions(locale).map((o) => [o.id, o]))
	const warnings: string[] = []
	const lines: QuoteLine[] = []

	for (const it of items) {
		const opt = options.get(it.opcion)
		if (!opt) return { ok: false, error: `Opción desconocida: ${it.opcion}` }
		if (typeof opt.amountMxn !== "number" || !isValidPrice(opt.slug, opt.amountMxn))
			return { ok: false, error: `"${opt.activity} · ${opt.name}" no tiene precio fijo (es "a cotizar"): pásalo al equipo con pasar_a_humano.` }
		const people = Math.floor(it.personas)
		if (!Number.isFinite(people) || people < 1) return { ok: false, error: "El número de personas debe ser 1 o más." }
		const max = getSeason(opt.slug).maxPeople
		if (people > max)
			return { ok: false, error: `${opt.activity} admite máximo ${max} personas por reserva; para ${people} el equipo arma la logística (pasar_a_humano).` }
		let dateISO: string | undefined
		if (it.fecha) {
			if (!/^\d{4}-\d{2}-\d{2}$/.test(it.fecha) || Number.isNaN(Date.parse(it.fecha)))
				return { ok: false, error: `Fecha inválida: ${it.fecha} (usa AAAA-MM-DD).` }
			if (it.fecha < todayISO()) return { ok: false, error: `La fecha ${it.fecha} ya pasó.` }
			if (!isDateInSeason(opt.slug, it.fecha))
				return { ok: false, error: `${it.fecha} está fuera de temporada de ${opt.activity} (${seasonLabel(opt.slug, "es")}).` }
			dateISO = it.fecha
		}
		const gross = opt.perBoat ? opt.amountMxn : opt.amountMxn * people
		lines.push({
			optionId: opt.id,
			slug: opt.slug,
			label: `${opt.activity} · ${opt.name}`,
			people,
			dateISO,
			unitMxn: opt.amountMxn,
			perBoat: opt.perBoat,
			grossMxn: gross,
			discountMxn: 0,
			netMxn: gross,
		})
	}

	// Descuentos de paquete (solo precios por persona). Se reparten por actividad
	// para que cada renglón del link de pago muestre su monto neto.
	const perPerson = lines.filter((l) => !l.perBoat)
	const { applied } = computePackageDiscount(
		perPerson.map((l) => ({ slug: l.slug, unitAmountMxn: l.unitMxn, people: l.people })),
		locale,
	)
	for (const pkg of applied) {
		const def = PACKAGES.find((p) => p.id === pkg.id)
		if (!def) continue
		for (const slug of def.slugs) {
			const line = perPerson.find((l) => l.slug === slug && l.netMxn > 0)
			if (!line) continue
			const d = Math.round(pkg.off * line.unitMxn * pkg.units)
			line.discountMxn += d
			line.netMxn -= d
			const tag = `${pkg.name} -${Math.round(pkg.off * 100)}%`
			line.discountLabel = line.discountLabel ? `${line.discountLabel} + ${tag}` : tag
		}
	}

	const totalMxn = lines.reduce((s, l) => s + l.netMxn, 0)
	const discountMxn = lines.reduce((s, l) => s + l.discountMxn, 0)
	const depositMxn = Math.round(totalMxn * DEAL_DEPOSIT_RATE)
	if (lines.some((l) => !l.dateISO)) warnings.push("Falta la fecha de alguna actividad: pídela antes de generar el link de anticipo.")
	return { ok: true, lines, totalMxn, discountMxn, depositMxn, remainingMxn: totalMxn - depositMxn, warnings }
}

export function quoteSummary(q: Quote): string {
	const rows = q.lines.map((l) => {
		const qty = l.perBoat ? "embarcación completa" : `${l.people} × ${mxn(l.unitMxn)}`
		const disc = l.discountMxn ? ` (−${mxn(l.discountMxn)} ${l.discountLabel})` : ""
		return `• ${l.label}${l.dateISO ? ` · ${l.dateISO}` : ""}: ${qty} = ${mxn(l.netMxn)}${disc}`
	})
	return [
		...rows,
		`Total: ${mxn(q.totalMxn)}${q.discountMxn ? ` (ahorro ${mxn(q.discountMxn)})` : ""}`,
		`Anticipo para apartar (${Math.round(DEAL_DEPOSIT_RATE * 100)}%): ${mxn(q.depositMxn)} · Resto el día de la actividad: ${mxn(q.remainingMxn)}`,
		...q.warnings.map((w) => `Aviso: ${w}`),
	].join("\n")
}

/**
 * Deal firmado de anticipo (página /deal) con los montos del catálogo. Vence en
 * 7 días. Devuelve la ruta completa; el bot la guarda tras un link corto.
 */
export function createDepositDeal(q: Quote, customerName: string, locale: Locale = "es"): { path: string; totals: ReturnType<typeof computeDealTotals> } {
	const lines: DealLine[] = q.lines.map((l) => ({
		label: [
			l.label,
			l.perBoat ? "embarcación" : `${l.people} ${l.people === 1 ? "persona" : "personas"}`,
			l.dateISO,
			l.discountLabel,
		]
			.filter(Boolean)
			.join(" · "),
		amountMxn: l.netMxn,
	}))
	const dates = q.lines.map((l) => l.dateISO).filter((d): d is string => !!d).sort()
	const photos = [...new Set(q.lines.map((l) => PHOTO_BY_SLUG[l.slug]).filter(Boolean))]
	const includes = [...new Set(q.lines.flatMap((l) => catalogOptions(locale).find((o) => o.id === l.optionId)?.items ?? []))]
	const name = customerName.trim().slice(0, 60)
	const deal: Deal = {
		v: 1,
		title: name ? `Reserva de ${name}` : "Tu reserva Keabelmet",
		subtitle: "Cotización por WhatsApp",
		lines,
		depositRate: DEAL_DEPOSIT_RATE,
		startISO: dates[0],
		endISO: dates.length > 1 ? dates[dates.length - 1] : undefined,
		includes: includes.join("\n").slice(0, 1200) || undefined,
		note: "El equipo de Keabelmet confirma contigo punto de encuentro y logística después de tu anticipo.",
		photos,
		exp: Date.now() + 7 * 24 * 3600 * 1000,
	}
	const token = signDeal(deal)
	const prefix = locale === "es" ? "" : `/${locale}`
	return { path: `${prefix}/deal?d=${token}`, totals: computeDealTotals(deal) }
}
