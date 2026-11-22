"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import ExpeditionMap, { type MapArea, type MapPin } from "@/components/ExpeditionMap"
import { Price } from "@/contexts/CurrencyContext"
import { defaultLocale, type Locale } from "@/lib/i18n"
import type { TourId } from "@/lib/tour-finder"
import type { HomeMapRow as Row } from "@/lib/home-map-rows"
import { EXPEDITION_MAP, MAP_TEXT, POINTS, ROUTE_LA_PAZ_CHALE, ZONES, formatMinutes, type PointId } from "@/lib/expedition-map"

/**
 * Mapa de la portada: lista de expediciones conectada a los pines del mapa,
 * con filtro por mes. Tocar una expedición la ubica en el mapa con su zona
 * (y el traslado a Puerto Chale cuando aplica).
 */
export default function HomeExpeditionMap({ locale, rows }: { locale: Locale; rows: Row[] }) {
	const t = MAP_TEXT[locale] ?? MAP_TEXT.es
	const lh = (path: string) => (locale === defaultLocale ? path : `/${locale}${path}`)
	const [month, setMonth] = useState<number | null>(null)
	const [active, setActive] = useState<TourId | null>(null)
	const listRef = useRef<HTMLUListElement>(null)

	// En celular el mapa queda fijo arriba: al elegir, la expedición se acomoda justo debajo de él
	useEffect(() => {
		if (!active || !listRef.current) return
		if (!window.matchMedia("(max-width: 900px)").matches) return
		const li = listRef.current.querySelector<HTMLElement>(`[data-id="${active}"]`)
		li?.scrollIntoView({ behavior: "smooth", block: "nearest" })
	}, [active])

	const inMonth = (r: Row) => !month || r.months.includes(month)
	const visible = rows.filter(inMonth)
	// Con un mes elegido, las que no salen no desaparecen: bajan al final, atenuadas
	const listed = month ? [...visible, ...rows.filter((r) => !inMonth(r))] : rows
	const sel = rows.find((r) => r.id === active) ?? null
	const selInfo = sel ? EXPEDITION_MAP[sel.id]! : null

	const pins = useMemo<MapPin[]>(() => {
		const byPoint = new Map<PointId, number>()
		for (const r of visible) byPoint.set(r.point, (byPoint.get(r.point) ?? 0) + 1)
		// La elegida siempre tiene su punto, aunque esté fuera de temporada
		if (sel && !byPoint.has(sel.point)) byPoint.set(sel.point, 0)
		return [...byPoint.entries()].map(([pid, n]) => ({ id: pid, lng: POINTS[pid].lng, lat: POINTS[pid].lat, label: POINTS[pid].place[locale], badge: n ? String(n) : "·" }))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible.map((r) => r.id).join(","), sel?.point, locale])

	const areas = useMemo<MapArea[]>(() => {
		if (!selInfo?.zone) return []
		const z = ZONES[selInfo.zone]
		return [{ id: selInfo.zone, lng: z.lng, lat: z.lat, radiusKm: z.radiusKm, polygon: z.polygon, label: z.name[locale] }]
	}, [selInfo, locale])

	const monthName = (m: number) => {
		try {
			return new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale, { month: "long" }).format(new Date(2026, m - 1, 1))
		} catch {
			return t.months[m - 1]
		}
	}
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
			{month && (
				<p className="xmap-month-result" aria-live="polite">
					{t.monthResult.replace("{m}", monthName(month)).replace("{n}", String(visible.length)).replace("{total}", String(rows.length))}
				</p>
			)}
			<div className="xmap-home-grid">
				<ul className="xmap-list" ref={listRef}>
					{visible.length === 0 && <li className="xmap-empty">{t.noneInMonth}</li>}
					{listed.map((r) => (
						<li key={r.id} data-id={r.id}>
							<button type="button" className={`xmap-item${active === r.id ? " on" : ""}${inMonth(r) ? "" : " out"}`} onClick={() => setActive(active === r.id ? null : r.id)} aria-pressed={active === r.id}>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={r.image} alt={r.title} loading="lazy" decoding="async" />
								<span className="xmap-item-body">
									<strong>{r.title}</strong>
									<span className="xmap-item-meta">{POINTS[r.point].place[locale]} · {season(r.months)}</span>
									{inMonth(r) ? (
										r.fromMxn != null && <span className="xmap-item-price">{t.from} <Price amount={r.fromMxn} /></span>
									) : (
										<span className="xmap-item-out">{t.outOfSeason}</span>
									)}
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
				{/* En celular esta franja queda fija arriba con fondo sólido: la lista pasa por debajo sin asomarse */}
				<div className="xmap-home-mapwrap">
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
			</div>
		</section>
	)
}
