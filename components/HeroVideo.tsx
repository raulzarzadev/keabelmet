"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Video de portada que elige su versión según la pantalla: el celular no
 * descarga la de escritorio. Mientras carga (y si el visitante prefiere menos
 * movimiento) se ve la imagen fija (poster), que es lo que pinta primero.
 */
export default function HeroVideo({ src, srcMobile, poster, posterMobile, label }: { src: string; srcMobile?: string; poster: string; posterMobile?: string; label: string }) {
	const ref = useRef<HTMLVideoElement>(null)
	const [chosen, setChosen] = useState<{ src: string; poster: string } | null>(null)

	useEffect(() => {
		const mobile = window.matchMedia("(max-width: 767px)").matches
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
		const p = mobile && posterMobile ? posterMobile : poster
		setChosen({ src: reduce ? "" : mobile && srcMobile ? srcMobile : src, poster: p })
	}, [src, srcMobile, poster, posterMobile])

	useEffect(() => {
		const v = ref.current
		if (v && chosen?.src) v.play().catch(() => { /* sin autoplay: queda el poster */ })
	}, [chosen])

	return (
		<>
			{/* Imagen fija: lo primero que se pinta (LCP) y respaldo si no hay video */}
			<picture className="hv-poster">
				{posterMobile && <source media="(max-width: 767px)" srcSet={posterMobile} />}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img src={poster} alt={label} fetchPriority="high" />
			</picture>
			{chosen?.src && <video ref={ref} className="hv-video" src={chosen.src} poster={chosen.poster} autoPlay muted loop playsInline preload="auto" aria-hidden="true" />}
		</>
	)
}
