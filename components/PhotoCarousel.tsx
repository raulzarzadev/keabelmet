"use client"

import { useRef } from "react"

export interface CarouselPhoto {
	src: string
	alt: string
	caption?: string
}

/**
 * Galería deslizable de fotos a lo ancho, sin texto encima: se desliza con el
 * dedo (scroll-snap) y con flechas en escritorio. El texto va fuera de la foto.
 */
export default function PhotoCarousel({ items, prevLabel = "Foto anterior", nextLabel = "Foto siguiente" }: { items: CarouselPhoto[]; prevLabel?: string; nextLabel?: string }) {
	const track = useRef<HTMLDivElement>(null)
	const go = (dir: 1 | -1) => {
		const el = track.current
		if (!el) return
		el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
	}
	return (
		<div className="pc">
			<div className="pc-track" ref={track}>
				{items.map((p, i) => (
					<figure key={i} className="pc-slide">
						<img src={p.src} alt={p.alt} loading="lazy" decoding="async" />
						{p.caption && <figcaption>{p.caption}</figcaption>}
					</figure>
				))}
			</div>
			<button type="button" className="pc-btn pc-prev" onClick={() => go(-1)} aria-label={prevLabel}>‹</button>
			<button type="button" className="pc-btn pc-next" onClick={() => go(1)} aria-label={nextLabel}>›</button>
		</div>
	)
}
