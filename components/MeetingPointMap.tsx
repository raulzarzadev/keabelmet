"use client"

import { useEffect, useMemo, useState } from "react"
import ExpeditionMap, { type MapArea, type MapPin } from "@/components/ExpeditionMap"
import { Price } from "@/contexts/CurrencyContext"
import type { Locale } from "@/lib/i18n"
import type { TourId } from "@/lib/tour-finder"
import { EXPEDITION_MAP, FAR_MINUTES, MAP_TEXT, POINTS, ROUTE_LA_PAZ_CHALE, STAYS, ZONES, directionsUrl, formatMinutes, type StayId } from "@/lib/expedition-map"

const STAY_KEY = "kb-stay"
const WA = "https://wa.me/526122347897"

/** Lee y guarda la zona de hospedaje (comodidad: se recuerda entre páginas). */
function readStay(): StayId | "" {
	try {
		const v = localStorage.getItem(STAY_KEY)
		return STAYS.some((s) => s.id === v) ? (v as StayId) : ""
	} catch {
		return ""
	}
}
function saveStay(v: StayId | "") {
	try {
		if (v) localStorage.setItem(STAY_KEY, v)
		else localStorage.removeItem(STAY_KEY)
	} catch {
		/* sin almacenamiento */
	}
}

/**
 * "Dónde empieza tu aventura": punto de encuentro, zona de la actividad,
 * transporte y tiempo de camino desde donde te hospedas. Va en cada landing,
 * antes de la información importante (antes de reservar).
 */
export default function MeetingPointMap({ slug, locale, tourTitle }: { slug: string; locale: Locale; tourTitle: string }) {
	const info = EXPEDITION_MAP[slug as TourId]
	const t = MAP_TEXT[locale] ?? MAP_TEXT.es
	const [stay, setStay] = useState<StayId | "">("")
	useEffect(() => setStay(readStay()), [])

	const pins = useMemo<MapPin[]>(() => {
		if (!info) return []
		const p = POINTS[info.point]
		const out: MapPin[] = [{ id: info.point, lng: p.lng, lat: p.lat, label: p.name[locale], badge: "★" }]
		if (info.route) out.push({ id: "la-paz", lng: ROUTE_LA_PAZ_CHALE[0][0], lat: ROUTE_LA_PAZ_CHALE[0][1], label: "La Paz", badge: "" })
		return out
	}, [info, locale])
	const areas = useMemo<MapArea[]>(() => {
		if (!info) return []
		const z = ZONES[info.zone]
		return [{ id: info.zone, lng: z.lng, lat: z.lat, radiusKm: z.radiusKm, label: z.name[locale] }]
	}, [info, locale])

	if (!info) return null
	const point = POINTS[info.point]
	const zone = ZONES[info.zone]
	const tr = info.transport
	const included = tr.kind === "included"

	let stayLine: string | null = null
	let far = false
	const s = STAYS.find((x) => x.id === stay)
	if (s) {
		if (included) {
			if (s.id === "la-paz") stayLine = t.stayLaPaz
			else {
				const min = s.minutes["muelle-fiscal"]
				far = min > FAR_MINUTES
				stayLine = `${formatMinutes(min, locale)} ${t.stayToLaPaz}`
			}
		} else {
			const key = info.point as "muelle-fiscal" | "la-ventana" | "cabo-pulmo"
			const min = s.minutes[key]
			far = min > FAR_MINUTES
			stayLine = `${formatMinutes(min, locale)} ${t.stayTo}`
		}
	}
	const waText = s ? t.stayWa.replace("{stay}", s.name[locale]).replace("{tour}", tourTitle) : ""

	return (
		<section className="sp-section xmap-section" id="como-llegar">
			<div className="sp-head">
				<span className="kicker">{t.kicker}</span>
				<h2>{t.title}</h2>
			</div>
			<div className="xmap-grid">
				<ExpeditionMap
					pins={pins}
					areas={areas}
					route={info.route ? ROUTE_LA_PAZ_CHALE : null}
					routeLabel={info.route ? `${t.routeLabel} · ${formatMinutes(150, locale)}` : undefined}
					activeId={info.point}
					label={`${t.mapLabel}: ${point.name[locale]}`}
					loadingText={t.loading}
					uiText={t}
				/>
				<aside className="xmap-card">
					<div className="xmap-block">
						<span className="xmap-tag">{t.meeting}</span>
						<strong className="xmap-name">{point.name[locale]}</strong>
						<span className="xmap-place">{point.place[locale]}</span>
						{!point.exact && <span className="xmap-note">{t.approx}</span>}
						<div className="xmap-actions">
							<a className="btn btn-teal xmap-btn" href={directionsUrl(point)} target="_blank" rel="noopener noreferrer">{t.directions}</a>
							<a className="xmap-link" href={point.mapsUrl} target="_blank" rel="noopener noreferrer">{t.openMaps} ↗</a>
						</div>
					</div>
					<div className="xmap-block">
						<p className={`xmap-transport${included ? " yes" : ""}`}>
							{tr.kind === "none" && t.transportNone}
							{tr.kind === "optional" && <>{t.transportOptional} · <Price amount={tr.mxn} /></>}
							{tr.kind === "included" && (tr.pickup === "hotel" ? t.transportIncludedHotel : t.transportIncludedPoint)}
						</p>
					</div>
					<div className="xmap-block">
						<span className="xmap-tag">{t.zone}</span>
						<strong className="xmap-zone">{zone.name[locale]}</strong>
						<span className="xmap-note">{t.zoneNote}</span>
					</div>
					<div className="xmap-block xmap-stay">
						<label className="xmap-tag" htmlFor={`xmap-stay-${slug}`}>{t.stayQ}</label>
						<select
							id={`xmap-stay-${slug}`}
							value={stay}
							onChange={(e) => {
								const v = e.target.value as StayId | ""
								setStay(v)
								saveStay(v)
							}}
						>
							<option value="">{t.stayPick}</option>
							{STAYS.map((x) => (
								<option key={x.id} value={x.id}>{x.name[locale]}</option>
							))}
						</select>
						{stayLine && <p className={`xmap-stay-res${far ? " far" : ""}`}>{stayLine}</p>}
						{far && (
							<>
								<p className="xmap-note">{t.stayFar}</p>
								<a className="xmap-link" href={`${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer">{t.stayHelp} ↗</a>
							</>
						)}
						{stayLine && !far && <span className="xmap-note">{t.timesNote}</span>}
					</div>
				</aside>
			</div>
		</section>
	)
}
