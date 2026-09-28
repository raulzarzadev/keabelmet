"use client"

import { useEffect, useState } from "react"
import { Price } from "@/contexts/CurrencyContext"

const L: Record<string, { from: string; cta: string }> = {
	es: { from: "Desde", cta: "Reservar ahora" },
	en: { from: "From", cta: "Book now" },
	fr: { from: "À partir de", cta: "Réserver" },
	zh: { from: "起价", cta: "立即预订" },
	ca: { from: "Des de", cta: "Reservar ara" },
}

/**
 * Barra fija de reserva para las páginas de tour/safari. Aparece al bajar
 * (pasado el hero) y se oculta cuando la sección de precios está a la vista,
 * para no competir con los botones de pago.
 */
export default function StickyBookBar({ fromMxn, locale = "es" }: { fromMxn: number; locale?: string }) {
	const t = L[locale] ?? L.es
	const [show, setShow] = useState(false)

	useEffect(() => {
		const precios = document.getElementById("precios")
		const state = { scrolled: false, preciosVisible: false }
		const update = () => setShow(state.scrolled && !state.preciosVisible)
		const onScroll = () => { state.scrolled = window.scrollY > 520; update() }
		let io: IntersectionObserver | null = null
		if (precios) {
			io = new IntersectionObserver((entries) => { state.preciosVisible = entries.some((e) => e.isIntersecting); update() }, { rootMargin: "0px 0px -15% 0px" })
			io.observe(precios)
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		onScroll()
		return () => { window.removeEventListener("scroll", onScroll); io?.disconnect() }
	}, [])

	useEffect(() => {
		document.body.classList.toggle("has-book-bar", show)
		return () => document.body.classList.remove("has-book-bar")
	}, [show])

	return (
		<div className={`sticky-book${show ? " is-visible" : ""}`} aria-hidden={!show}>
			<div className="sticky-book-inner">
				<div className="sticky-book-price"><span>{t.from}</span><b><Price amount={fromMxn} /></b></div>
				<a href="#precios" className="btn btn-teal sticky-book-btn" tabIndex={show ? 0 : -1}>{t.cta}</a>
			</div>
		</div>
	)
}
