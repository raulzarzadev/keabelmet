"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import ExpeditionMap, { type MapArea, type MapPin } from "@/components/ExpeditionMap"
import { Price } from "@/contexts/CurrencyContext"
import { getExperience } from "@/constants/experiences"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { TOURS, type TourId } from "@/lib/tour-finder"
import { EXPEDITION_MAP, MAP_TEXT, POINTS, ROUTE_LA_PAZ_CHALE, ZONES, formatMinutes, type PointId } from "@/lib/expedition-map"

interface Row {
	id: TourId
	title: string
	image: string
	href: string
	point: PointId
	months: number[]
	fromMxn: number | null
}

/**
 * Mapa de la portada: lista de expediciones conectada a los pines del mapa,
 * con filtro por mes. Tocar una expedición la ubica en el mapa con su zona
 * (y el traslado a Puerto Chale cuando aplica).
 */
export default function HomeExpeditionMap({ locale }: { locale: Locale }) {
	const t = MAP_TEXT[locale] ?? MAP_TEXT.es
	const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)
	const [month, setMonth] = useState<number | null>(null)
	const [active, setActive] = useState<TourId | null>(null)

	const rows = useMemo<Row[]>(() => {
		const out: Row[] = []
		for (const [id, info] of Object.entries(EXPEDITION_MAP) as [TourId, NonNullable<(typeof EXPEDITION_MAP)[TourId]>][]) {
			const exp = getExperience(id)
			const tour = TOURS.find((x) => x.id === id)
			if (!exp || !tour) continue
			const prices = Object.values(tour.modes).map((m) => m!.mxn)
			out.push({
				id,
				title: (exp.i18n[locale] ?? exp.i18n.es).title,
				image: exp.image,
				href: exp.href,
				point: info.point,
				months: tour.months,
				fromMxn: prices.length ? Math.min(...prices) : exp.fromMxn,
			})
		}
		return out
	}, [locale])

	const visible = month ? rows.filter((r) => r.months.includes(month)) : rows
	const sel = visible.find((r) => r.id === active) ?? null
	const selInfo = sel ? EXPEDITION_MAP[sel.id]! : null

	const pins = useMemo<MapPin[]>(() => {
		const byPoint = new Map<PointId, number>()
		for (const r of visible) byPoint.set(r.point, (byPoint.get(r.point) ?? 0) + 1)
		return [...byPoint.entries()].map(([pid, n]) => ({ id: pid, lng: POINTS[pid].lng, lat: POINTS[pid].lat, label: POINTS[pid].place[locale], badge: String(n) }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible.map((r) => r.id).join(","), locale])

	const areas = useMemo<MapArea[]>(() => {
		if (!selInfo?.zone) return []
		const z = ZONES[selInfo.zone]
		return [{ id: selInfo.zone, lng: z.lng, lat: z.lat, radiusKm: z.radiusKm, polygon: z.polygon, label: z.name[locale] }]
	}, [selInfo, locale])

	const season = (m: number[]) => (m.length >= 12 ? t.allMonths : `${t.months[m[0] - 1]}–${t.months[m[m.length - 1] - 1]}`)

	return (
		<section className="xmap-home" id="mapa">
			<div className="section-head xmap-home-head">
				<span className="kicker">{t.homeKicker}</span>
				<h2>{t.homeTitle}</h2>
				<p>{t.homeText}</p>
			</div>
			<div className="xmap-months" role="group" aria-label={t.monthQ}>
				<span className="xmap-months-q">{t.monthQ}</span>
				<button type="button" className={month === null ? "on" : ""} onClick={() => setMonth(null)}>{t.allMonths}</button>
				{t.months.map((m, i) => (
					<button key={m} type="button" className={month === i + 1 ? "on" : ""} onClick={() => setMonth(i + 1)}>{m}</button>
				))}
			</div>
			<div className="xmap-home-grid">
				<ul className="xmap-list">
					{visible.length === 0 && <li className="xmap-empty">{t.noneInMonth}</li>}
					{visible.map((r) => (
						<li key={r.id}>
							<button type="button" className={`xmap-item${active === r.id ? " on" : ""}`} onClick={() => setActive(active === r.id ? null : r.id)} aria-pressed={active === r.id}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={r.image} alt="" loading="lazy" decoding="async" />
								<span className="xmap-item-body">
									<strong>{r.title}</strong>
									<span className="xmap-item-meta">{POINTS[r.point].place[locale]} · {season(r.months)}</span>
									{r.fromMxn != null && <span className="xmap-item-price">{t.from} <Price amount={r.fromMxn} /></span>}
								</span>
							</button>
							{active === r.id && (
								<div className="xmap-item-more">
									<span>{POINTS[r.point].name[locale]}</span>
									{EXPEDITION_MAP[r.id]?.route && <span>{t.routeLabel} · {formatMinutes(150, locale)}</span>}
									<Link className="xmap-link" href={lh(r.href) + "#como-llegar"}>{t.view} →</Link>
								</div>
							)}
						</li>
					))}
				</ul>
				<ExpeditionMap
					className="xmap-home-map"
					pins={pins}
					areas={areas}
					route={selInfo?.route ? ROUTE_LA_PAZ_CHALE : null}
					routeLabel={selInfo?.route ? t.routeLabel : undefined}
					activeId={sel?.point ?? null}
					onSelect={(pid) => {
						const first = visible.find((r) => r.point === pid)
						if (first) setActive(first.id)
					}}
					focus={sel ? { pins: [sel.point], areas: selInfo?.zone ? [selInfo.zone] : [], route: !!selInfo?.route } : undefined}
					label={t.mapLabel}
					loadingText={t.loading}
					uiText={t}
				/>
			</div>
		</section>
	)
}
