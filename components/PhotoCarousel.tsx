"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface CarouselPhoto {
	src: string
	alt: string
	caption?: string
}

/**
 * Galería deslizable de fotos a lo ancho, sin texto encima. Con el dedo se
 * desliza foto por foto (scroll-snap); las flechas y los puntos van directo a
 * la posición exacta de cada foto, en un solo movimiento (sin rebote).
 */
export default function PhotoCarousel({ items, prevLabel = "Foto anterior", nextLabel = "Foto siguiente" }: { items: CarouselPhoto[]; prevLabel?: string; nextLabel?: string }) {
	const track = useRef<HTMLDivElement>(null)
	const [active, setActive] = useState(0)

	// Posición de scroll que deja la foto n centrada en la pista.
	const targetFor = (el: HTMLDivElement, n: number) => {
		const slide = el.children[n] as HTMLElement | undefined
		if (!slide) return 0
		// offsetLeft se mide desde .pc (que tiene padding); se resta el inicio de la pista.
		return slide.offsetLeft - el.offsetLeft - (el.clientWidth - slide.clientWidth) / 2
	}

	const goTo = useCallback((n: number) => {
		const el = track.current
		if (!el) return
		const i = Math.max(0, Math.min(items.length - 1, n))
		el.scrollTo({ left: targetFor(el, i), behavior: "smooth" })
		setActive(i)
	}, [items.length])

	// Al deslizar con el dedo, marca la foto más cercana al centro.
	useEffect(() => {
		const el = track.current
		if (!el) return
		let raf = 0
		const onScroll = () => {
			cancelAnimationFrame(raf)
			raf = requestAnimationFrame(() => {
				let best = 0
				let bestDist = Infinity
				for (let n = 0; n < el.children.length; n++) {
					const d = Math.abs(targetFor(el, n) - el.scrollLeft)
					if (d < bestDist) { bestDist = d; best = n }
				}
				setActive(best)
			})
		}
		el.addEventListener("scroll", onScroll, { passive: true })
		return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf) }
	}, [])

	return (
		<div className={`pc${items.length === 3 ? " pc-mosaic" : ""}`}>
			<div className="pc-track" ref={track}>
				{items.map((p, i) => (
					<figure key={i} className="pc-slide">
						<img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
						{p.caption && <figcaption>{p.caption}</figcaption>}
					</figure>
				))}
			</div>
			<button type="button" className="pc-btn pc-prev" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={prevLabel}>‹</button>
			<button type="button" className="pc-btn pc-next" onClick={() => goTo(active + 1)} disabled={active === items.length - 1} aria-label={nextLabel}>›</button>
			<div className="pc-dots">
				{items.map((_, i) => (
					<button key={i} type="button" className={`pc-dot${i === active ? " on" : ""}`} onClick={() => goTo(i)} aria-label={`${i + 1} / ${items.length}`} />
				))}
			</div>
		</div>
	)
}
