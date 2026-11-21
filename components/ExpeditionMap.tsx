"use client"

import { useEffect, useRef, useState } from "react"
import type { Map as MLMap, Marker as MLMarker } from "maplibre-gl"

/**
 * Mapa base de Keabelmet (MapLibre + mapas de OpenStreetMap vía OpenFreeMap,
 * sin clave). Se descarga solo cuando el mapa entra en pantalla, así no hace
 * más lenta la página. Colores de la marca: tierra tinta, mar azul profundo.
 */

export interface MapPin {
	id: string
	lng: number
	lat: number
	/** Texto corto dentro del pin (número o letra). */
	badge?: string
	/** Nombre que aparece junto al pin. */
	label: string
}

export interface MapArea {
	id: string
	lng: number
	lat: number
	radiusKm: number
	label: string
}

const STYLE = "https://tiles.openfreemap.org/styles/dark"
const WORKER_URL = "/vendor/maplibre-6.16.0/maplibre-gl-worker.mjs"

/** Círculo como polígono (para dibujar la zona aproximada). */
function circle(lng: number, lat: number, km: number, steps = 64): [number, number][] {
	const out: [number, number][] = []
	const dLat = km / 110.574
	const dLng = km / (111.32 * Math.cos((lat * Math.PI) / 180))
	for (let i = 0; i <= steps; i++) {
		const a = (i / steps) * Math.PI * 2
		out.push([lng + dLng * Math.cos(a), lat + dLat * Math.sin(a)])
	}
	return out
}

function bounds(pts: [number, number][]): [[number, number], [number, number]] {
	const xs = pts.map((p) => p[0])
	const ys = pts.map((p) => p[1])
	return [
		[Math.min(...xs), Math.min(...ys)],
		[Math.max(...xs), Math.max(...ys)],
	]
}

export default function ExpeditionMap({
	pins,
	areas = [],
	route,
	routeLabel,
	activeId,
	onSelect,
	label,
	loadingText,
	className = "",
	focus,
	uiText,
}: {
	pins: MapPin[]
	areas?: MapArea[]
	route?: [number, number][] | null
	routeLabel?: string
	activeId?: string | null
	onSelect?: (id: string) => void
	label: string
	loadingText: string
	className?: string
	/** Ids de pines/zonas a encuadrar; si no se pasa, encuadra todo. */
	focus?: { pins?: string[]; areas?: string[]; route?: boolean }
	/** Textos de MapLibre traducidos (gestos y zoom). */
	uiText?: { gestureMobile: string; gestureWin: string; gestureMac: string; zoomIn: string; zoomOut: string }
}) {
	const box = useRef<HTMLDivElement>(null)
	const mapRef = useRef<MLMap | null>(null)
	const markers = useRef<Record<string, { m: MLMarker; el: HTMLElement }>>({})
	const [visible, setVisible] = useState(false)
	const [ready, setReady] = useState(false)
	const onSelectRef = useRef(onSelect)
	onSelectRef.current = onSelect

	// 1) Espera a que el mapa entre en pantalla
	useEffect(() => {
		const el = box.current
		if (!el) return
		if (!("IntersectionObserver" in window)) {
			setVisible(true)
			return
		}
		const io = new IntersectionObserver((e) => {
			if (e.some((x) => x.isIntersecting)) {
				setVisible(true)
				io.disconnect()
			}
		}, { rootMargin: "300px" })
		io.observe(el)
		return () => io.disconnect()
	}, [])

	// 2) Crea el mapa
	useEffect(() => {
		if (!visible || !box.current || mapRef.current) return
		let cancelled = false
		;(async () => {
			const ml = await import("maplibre-gl")
			await import("maplibre-gl/dist/maplibre-gl.css")
			// El "worker" de MapLibre se sirve desde /public (el empaquetador no lo resuelve solo).
			// Si se actualiza maplibre-gl, copia de nuevo dist/maplibre-gl-worker.mjs a esa carpeta.
			ml.setWorkerUrl(WORKER_URL)
			if (cancelled || !box.current) return
			const all: [number, number][] = [...pins.map((p) => [p.lng, p.lat] as [number, number]), ...areas.flatMap((a) => circle(a.lng, a.lat, a.radiusKm, 8)), ...(route ?? [])]
			const map = new ml.Map({
				container: box.current,
				style: STYLE,
				bounds: bounds(all.length ? all : [[-111.8, 23.3], [-109.3, 24.7]]),
				fitBoundsOptions: { padding: 48 },
				attributionControl: { compact: true },
				cooperativeGestures: true,
				dragRotate: false,
				pitchWithRotate: false,
				locale: uiText
					? {
						"CooperativeGesturesHandler.MobileHelpText": uiText.gestureMobile,
						"CooperativeGesturesHandler.WindowsHelpText": uiText.gestureWin,
						"CooperativeGesturesHandler.MacHelpText": uiText.gestureMac,
						"NavigationControl.ZoomIn": uiText.zoomIn,
						"NavigationControl.ZoomOut": uiText.zoomOut,
					}
					: undefined,
			})
			map.touchZoomRotate.disableRotation()
			map.addControl(new ml.NavigationControl({ showCompass: false }), "top-right")
			mapRef.current = map
			map.on("load", () => {
				// Colores de la marca sobre el estilo oscuro
				for (const layer of map.getStyle().layers ?? []) {
					try {
						if (layer.type === "background") map.setPaintProperty(layer.id, "background-color", "#2a2d29")
						else if (layer.type === "fill" && /water|ocean/.test(layer.id)) map.setPaintProperty(layer.id, "fill-color", "#0b3448")
						else if (layer.type === "symbol" && /water|ocean|sea|bay|marine/.test(layer.id)) map.setPaintProperty(layer.id, "text-color", "#5fb6c4")
					} catch {
						/* capa sin esa propiedad */
					}
				}
				map.addSource("kb-areas", {
					type: "geojson",
					data: { type: "FeatureCollection", features: areas.map((a) => ({ type: "Feature", properties: { id: a.id }, geometry: { type: "Polygon", coordinates: [circle(a.lng, a.lat, a.radiusKm)] } })) },
				})
				map.addLayer({ id: "kb-areas-fill", type: "fill", source: "kb-areas", paint: { "fill-color": "#28c2a0", "fill-opacity": 0.14 } })
				map.addLayer({ id: "kb-areas-line", type: "line", source: "kb-areas", paint: { "line-color": "#28c2a0", "line-width": 1.5, "line-dasharray": [2, 2], "line-opacity": 0.8 } })
				map.addSource("kb-route", { type: "geojson", data: { type: "FeatureCollection", features: route ? [{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: route } }] : [] } })
				map.addLayer({ id: "kb-route", type: "line", source: "kb-route", layout: { "line-cap": "round", "line-join": "round" }, paint: { "line-color": "#f4efe4", "line-width": 2.5, "line-dasharray": [1.5, 1.5], "line-opacity": 0.85 } })
				setReady(true)
			})
		})()
		return () => {
			cancelled = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible])

	// 3) Pines, zonas y ruta (se actualizan cuando cambian los datos)
	useEffect(() => {
		const map = mapRef.current
		if (!ready || !map) return
		;(async () => {
			const ml = await import("maplibre-gl")
			for (const k of Object.keys(markers.current)) {
				markers.current[k].m.remove()
				delete markers.current[k]
			}
			for (const p of pins) {
				const el = document.createElement("button")
				el.type = "button"
				el.className = "xmap-pin"
				el.setAttribute("aria-label", p.label)
				el.innerHTML = `<span class="xmap-dot">${p.badge ?? ""}</span><span class="xmap-label"></span>`
				;(el.querySelector(".xmap-label") as HTMLElement).textContent = p.label
				el.addEventListener("click", (e) => {
					e.stopPropagation()
					onSelectRef.current?.(p.id)
				})
				const m = new ml.Marker({ element: el, anchor: "left", offset: [-14, 0] }).setLngLat([p.lng, p.lat]).addTo(map)
				markers.current[p.id] = { m, el }
			}
			for (const a of areas) {
				const el = document.createElement("div")
				el.className = "xmap-area"
				el.textContent = a.label
				// Etiqueta arriba del círculo para que no choque con el pin
				const m = new ml.Marker({ element: el, anchor: "bottom", offset: [0, -4] }).setLngLat([a.lng, a.lat + a.radiusKm / 110.574]).addTo(map)
				markers.current["area:" + a.id] = { m, el }
			}
			if (route?.length && routeLabel) {
				const mid = route[Math.floor(route.length * 0.55)]
				const el = document.createElement("div")
				el.className = "xmap-route-label"
				el.textContent = routeLabel
				const m = new ml.Marker({ element: el, anchor: "bottom", offset: [0, -6] }).setLngLat(mid).addTo(map)
				markers.current["route"] = { m, el }
			}
			const src = map.getSource("kb-areas") as unknown as { setData: (d: unknown) => void } | undefined
			src?.setData({ type: "FeatureCollection", features: areas.map((a) => ({ type: "Feature", properties: { id: a.id }, geometry: { type: "Polygon", coordinates: [circle(a.lng, a.lat, a.radiusKm)] } })) })
			const rs = map.getSource("kb-route") as unknown as { setData: (d: unknown) => void } | undefined
			rs?.setData({ type: "FeatureCollection", features: route ? [{ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: route } }] : [] })
			highlight()
			frame()
		})()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ready, pins, areas, route, routeLabel])

	// 4) Pin activo y encuadre
	function highlight() {
		for (const [k, v] of Object.entries(markers.current)) {
			if (k.startsWith("area:") || k === "route") continue
			v.el.classList.toggle("on", k === activeId)
		}
	}
	function frame() {
		const map = mapRef.current
		if (!map) return
		const ps = focus?.pins ? pins.filter((p) => focus.pins!.includes(p.id)) : pins
		const as = focus?.areas ? areas.filter((a) => focus.areas!.includes(a.id)) : areas
		const pts: [number, number][] = [...ps.map((p) => [p.lng, p.lat] as [number, number]), ...as.flatMap((a) => circle(a.lng, a.lat, a.radiusKm, 8)), ...(focus?.route === false ? [] : route ?? [])]
		if (!pts.length) return
		const narrow = (box.current?.clientWidth ?? 800) < 560
		map.fitBounds(bounds(pts), { padding: narrow ? { top: 50, bottom: 70, left: 30, right: 110 } : { top: 60, bottom: 70, left: 60, right: 170 }, maxZoom: 11.5, duration: 900 })
	}
	useEffect(() => {
		if (!ready) return
		highlight()
		frame()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeId, focus?.pins?.join(","), focus?.areas?.join(","), focus?.route])

	useEffect(() => () => {
		mapRef.current?.remove()
		mapRef.current = null
	}, [])

	return (
		<div className={`xmap ${className}`.trim()} role="region" aria-label={label}>
			<div ref={box} className="xmap-canvas" />
			{!ready && <div className="xmap-loading">{loadingText}</div>}
		</div>
	)
}
