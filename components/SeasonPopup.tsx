"use client"

import { useCallback, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { buildWhatsAppLink } from "@/config/whatsapp"
import { seasonLabel } from "@/lib/expedition-seasons"
import { formatMxn } from "@/lib/reservation"
import { defaultLocale, type Locale } from "@/lib/i18n"
import { PACKAGES } from "@/lib/packages"
import { rideAddonAvailable } from "@/lib/ride-addon"

/**
 * Aviso de temporada compartido: Sardine Run (noviembre–diciembre) y nado con
 * tiburón ballena (temporada en La Paz). Se abre cuando la persona ya bajó por
 * la portada (no al entrar, para no ser un intersticial intrusivo en móvil) y
 * una sola vez por sesión. "Reservar los dos" abre Arma tu reserva con ambas
 * actividades ya en el carrito.
 */

export interface SeasonPopupItem {
	slug: string
	fromMxn: number
}

type Copy = {
	badge: string
	title: string
	text: string
	both: string
	wa: string
	waMsg: string
	see: string
	from: string
	per: string
	close: string
	names: Record<string, string>
	hooks: Record<string, string>
	/** Línea del combo; {off} = descuento por persona en el tiburón ballena. */
	combo: string
	withCombo: string
}

const copy: Record<Locale, Copy> = {
	es: {
		badge: "Temporada abierta",
		title: "Sardine Run + Tiburón ballena",
		text: "Ya abrió la temporada de tiburón ballena en La Paz y el Sardine Run está en su mejor momento. Por unas semanas puedes vivir las dos cosas en el mismo viaje.",
		both: "Reservar los dos",
		wa: "Preguntar por WhatsApp",
		waMsg: "Hola! Vi en su web el Sardine Run y el tiburón ballena. Quiero reservar los dos, ¿qué fechas tienen disponibles?",
		see: "Ver",
		from: "desde",
		per: "persona",
		close: "Cerrar",
		names: { "safari-bahia-magdalena": "Sardine Run", "tiburon-ballena": "Tiburón ballena" },
		hooks: { "safari-bahia-magdalena": "Marlines cazando sardinas en Bahía Magdalena", "tiburon-ballena": "Nado con el pez más grande del mundo" },
		combo: "🎁 Paquete Temporada: si reservas los dos, el tiburón ballena te sale {off} más barato por persona.",
		withCombo: "con el paquete",
	},
	en: {
		badge: "Season is open",
		title: "Sardine Run + Whale sharks",
		text: "Whale shark season has just opened in La Paz and the Sardine Run is at its best. For a few weeks you can do both on the same trip.",
		both: "Book both",
		wa: "Ask on WhatsApp",
		waMsg: "Hi! I saw the Sardine Run and the whale sharks on your website. I'd like to book both. What dates do you have available?",
		see: "See",
		from: "from",
		per: "person",
		close: "Close",
		names: { "safari-bahia-magdalena": "Sardine Run", "tiburon-ballena": "Whale sharks" },
		hooks: { "safari-bahia-magdalena": "Marlin hunting sardines in Magdalena Bay", "tiburon-ballena": "Swim with the biggest fish in the world" },
		combo: "🎁 Season Combo: book both and the whale sharks are {off} cheaper per person.",
		withCombo: "with the combo",
	},
	fr: {
		badge: "La saison est ouverte",
		title: "Sardine Run + Requin-baleine",
		text: "La saison du requin-baleine vient d'ouvrir à La Paz et le Sardine Run bat son plein. Pendant quelques semaines, tu peux vivre les deux pendant le même voyage.",
		both: "Réserver les deux",
		wa: "Demander sur WhatsApp",
		waMsg: "Bonjour ! J'ai vu le Sardine Run et le requin-baleine sur votre site. Je voudrais réserver les deux. Quelles dates avez-vous ?",
		see: "Voir",
		from: "dès",
		per: "personne",
		close: "Fermer",
		names: { "safari-bahia-magdalena": "Sardine Run", "tiburon-ballena": "Requin-baleine" },
		hooks: { "safari-bahia-magdalena": "Des marlins chassent les sardines à Bahía Magdalena", "tiburon-ballena": "Nage avec le plus grand poisson du monde" },
		combo: "🎁 Combo Saison : réserve les deux et le requin-baleine te coûte {off} de moins par personne.",
		withCombo: "avec le combo",
	},
	zh: {
		badge: "旺季已开放",
		title: "沙丁鱼奔流 + 鲸鲨",
		text: "拉巴斯的鲸鲨季刚刚开放，沙丁鱼奔流也正值最佳时期。在接下来的几周里，你可以在同一次旅行中体验这两项活动。",
		both: "两项一起预订",
		wa: "通过 WhatsApp 咨询",
		waMsg: "你好！我在你们网站上看到了沙丁鱼奔流和鲸鲨，想两项都预订。请问有哪些可用日期？",
		see: "查看",
		from: "起",
		per: "人",
		close: "关闭",
		names: { "safari-bahia-magdalena": "沙丁鱼奔流", "tiburon-ballena": "鲸鲨" },
		hooks: { "safari-bahia-magdalena": "马林鱼在马格达莱纳湾追捕沙丁鱼", "tiburon-ballena": "与世界上最大的鱼一起游泳" },
		combo: "🎁 季节套餐：两项一起预订，鲸鲨每人便宜 {off}。",
		withCombo: "套餐价",
	},
	ca: {
		badge: "Temporada oberta",
		title: "Sardine Run + Tauró balena",
		text: "Ja ha obert la temporada de tauró balena a La Paz i el Sardine Run està en el seu millor moment. Durant unes setmanes pots viure les dues coses en el mateix viatge.",
		both: "Reserva les dues",
		wa: "Pregunta per WhatsApp",
		waMsg: "Hola! He vist el Sardine Run i el tauró balena al vostre web. Vull reservar les dues activitats, quines dates teniu disponibles?",
		see: "Veure",
		from: "des de",
		per: "persona",
		close: "Tancar",
		names: { "safari-bahia-magdalena": "Sardine Run", "tiburon-ballena": "Tauró balena" },
		hooks: { "safari-bahia-magdalena": "Marlins caçant sardines a Badia Magdalena", "tiburon-ballena": "Neda amb el peix més gran del món" },
		combo: "🎁 Paquet Temporada: si reserves les dues, el tauró balena et surt {off} més barat per persona.",
		withCombo: "amb el paquet",
	},
}

/** Encuadre de cada foto en la tarjeta (que se vea el marlín y no solo las sardinas). */
/** El Sardine Run no incluye transporte: que quede claro desde el aviso. */
const NO_RIDE: Record<string, string> = {
	es: "Transporte no incluido (opcional +$500)",
	en: "Transport not included (optional +$500)",
	fr: "Transport non inclus (option +500 MXN)",
	zh: "不含交通(可选 +500)",
	ca: "Transport no inclòs (opcional +500)",
}

const IMAGE_POS: Record<string, string> ={ "safari-bahia-magdalena": "30% 65%", "tiburon-ballena": "center" }

const IMAGES: Record<string, string> = {
	"safari-bahia-magdalena": "/images/gallery/marlin-cazando.jpeg",
	"tiburon-ballena": "/tiburon-ballena-snorkel-h.jpg",
}

const STORAGE_KEY = "seasonPopupSeen-2026-11"

const localize = (path: string, locale: Locale) => (locale === defaultLocale ? path : `/${locale}${path}`)

export default function SeasonPopup({ locale = "es", items }: { locale?: Locale; items: SeasonPopupItem[] }) {
	const [open, setOpen] = useState(false)
	const [mounted, setMounted] = useState(false)

	const close = useCallback(() => {
		setOpen(false)
		try { sessionStorage.setItem(STORAGE_KEY, "1") } catch { /* storage bloqueado */ }
	}, [])

	useEffect(() => {
		setMounted(true)
		let seen = false
		try { seen = sessionStorage.getItem(STORAGE_KEY) === "1" } catch { /* storage bloqueado */ }
		if (seen) return
		// Se abre cuando la persona ya bajó por la página, no con un temporizador:
		// un modal a pantalla completa al entrar es un "intersticial intrusivo"
		// para Google en móvil y además se volvía el LCP de la portada.
		const onScroll = () => {
			if (window.scrollY < window.innerHeight * 0.6) return
			window.removeEventListener("scroll", onScroll)
			setOpen(true)
		}
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	useEffect(() => {
		if (!open) return
		const prev = document.body.style.overflow
		document.body.style.overflow = "hidden"
		const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close() }
		document.addEventListener("keydown", onKey)
		return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey) }
	}, [open, close])

	if (!mounted || !open || !items.length) return null
	const c = copy[locale] ?? copy.es
	const seasonPkg = PACKAGES.find((p) => p.id === "temporada")
	const comboOff = seasonPkg?.perPersonOffMxn ?? {}
	const offAny = Object.values(comboOff)[0]
	const addHref = localize(`/arma-tu-reserva?add=${items.map((i) => i.slug).join(",")}`, locale)

	const modal = (
		<div className="sr-pop-overlay" onClick={close} role="dialog" aria-modal="true" aria-label={c.title}>
			<div className="sr-pop season-pop" onClick={(e) => e.stopPropagation()}>
				<button className="sr-pop-close" onClick={close} aria-label={c.close}>&times;</button>
				<div className="season-pop-head">
					<span className="sr-pop-badge"><span className="sr-dot" />{c.badge}</span>
					<h3>{c.title}</h3>
					<p>{c.text}</p>
					{offAny ? <p className="season-pop-combo">{c.combo.replace("{off}", `${formatMxn(offAny)} MXN`)}</p> : null}
				</div>
				<div className="season-pop-cards">
					{items.map((it) => (
						<a key={it.slug} className="season-pop-card" href={localize(`/experiencias/${it.slug}`, locale)} onClick={close}>
							<span className="season-pop-img" style={{ backgroundImage: `linear-gradient(rgba(5,15,22,0.05), rgba(5,15,22,0.55)), url("${IMAGES[it.slug] ?? ""}")`, backgroundPosition: IMAGE_POS[it.slug] ?? "center" }} />
							<span className="season-pop-info">
								<strong>{c.names[it.slug] ?? it.slug}</strong>
								<small className="season-pop-hook">{c.hooks[it.slug]}</small>
								<small className="season-pop-season">{seasonLabel(it.slug, locale)}</small>
								{rideAddonAvailable(it.slug) && <small className="season-pop-warn">🚐 {NO_RIDE[locale] ?? NO_RIDE.es}</small>}
								{comboOff[it.slug] ? (
									<span className="season-pop-price">
										<s>{formatMxn(it.fromMxn)}</s> {formatMxn(it.fromMxn - comboOff[it.slug])} MXN / {c.per}
										<em>{c.withCombo}</em>
									</span>
								) : (
									<span className="season-pop-price">{c.from} {formatMxn(it.fromMxn)} MXN / {c.per}</span>
								)}
							</span>
						</a>
					))}
				</div>
				<div className="sr-pop-btns season-pop-btns">
					<a className="btn btn-teal" href={addHref} onClick={close}>{c.both}</a>
					<a className="btn btn-ghost" href={buildWhatsAppLink(c.waMsg)} target="_blank" rel="noopener noreferrer" onClick={close}>{c.wa}</a>
				</div>
			</div>
		</div>
	)

	return createPortal(modal, document.body)
}
