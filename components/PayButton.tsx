"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { createPortal } from "react-dom"
import {
	Elements,
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js"
import type { StripeElementLocale, StripeElementsOptions } from "@stripe/stripe-js"
import { getStripeClient } from "@/lib/stripe-client"
import { getSeason, seasonLabel, isDateInSeason } from "@/lib/expedition-seasons"
import { formatMxn } from "@/lib/reservation"
import Voucher from "@/components/Voucher"

function stripeLocale(locale: string): StripeElementLocale {
	if (locale === "es" || locale === "en" || locale === "fr" || locale === "zh") return locale
	return "auto"
}

function tomorrowISO(): string {
	const d = new Date()
	d.setDate(d.getDate() + 1)
	return d.toISOString().slice(0, 10)
}

const PERSON_WORDS = ["persona", "person", "personne", "人"]
function isPerPerson(note?: string): boolean {
	if (!note) return false
	const n = note.toLowerCase()
	return PERSON_WORDS.some((w) => n.includes(w))
}

interface UI {
	detailsTitle: string; date: string; people: string; name: string; email: string; phone: string
	season: string; continue: string; perPerson: string; perBoat: string; total: string
	cancelNote: string; back: string; editDetails: string; secure: string; pay: string; processing: string
	preparing: string; close: string; viewVoucher: string
	errDate: string; errPast: string; errSeason: string; errName: string; errEmail: string; errPhone: string; errGeneric: string
	namePh: string; phonePh: string
}

const copy: Record<string, UI> = {
	es: {
		detailsTitle: "Detalles de tu reserva", date: "Fecha deseada", people: "Personas", name: "Nombre completo", email: "Correo electrónico", phone: "Teléfono / WhatsApp",
		season: "Temporada", continue: "Continuar al pago", perPerson: "por persona", perBoat: "por embarcación", total: "Total",
		cancelNote: "Cancelación con reembolso hasta 24 h antes de la salida.", back: "Editar datos", editDetails: "← Editar datos", secure: "Pago seguro procesado por Stripe", pay: "Pagar", processing: "Procesando…",
		preparing: "Preparando tu pago…", close: "Cerrar", viewVoucher: "Ver mi voucher",
		errDate: "Elige una fecha.", errPast: "Elige una fecha futura.", errSeason: "Esa fecha está fuera de temporada.", errName: "Escribe tu nombre.", errEmail: "Correo inválido.", errPhone: "Teléfono inválido.", errGeneric: "No pudimos iniciar el pago. Intenta de nuevo o escríbenos por WhatsApp.",
		namePh: "Tu nombre", phonePh: "+52 …",
	},
	en: {
		detailsTitle: "Your reservation details", date: "Preferred date", people: "People", name: "Full name", email: "Email", phone: "Phone / WhatsApp",
		season: "Season", continue: "Continue to payment", perPerson: "per person", perBoat: "per boat", total: "Total",
		cancelNote: "Refundable cancellation up to 24 h before departure.", back: "Edit details", editDetails: "← Edit details", secure: "Secure payment processed by Stripe", pay: "Pay", processing: "Processing…",
		preparing: "Preparing your payment…", close: "Close", viewVoucher: "View my voucher",
		errDate: "Choose a date.", errPast: "Choose a future date.", errSeason: "That date is out of season.", errName: "Enter your name.", errEmail: "Invalid email.", errPhone: "Invalid phone.", errGeneric: "We couldn't start the payment. Try again or message us on WhatsApp.",
		namePh: "Your name", phonePh: "+1 …",
	},
	fr: {
		detailsTitle: "Détails de votre réservation", date: "Date souhaitée", people: "Personnes", name: "Nom complet", email: "E-mail", phone: "Téléphone / WhatsApp",
		season: "Saison", continue: "Continuer vers le paiement", perPerson: "par personne", perBoat: "par bateau", total: "Total",
		cancelNote: "Annulation remboursable jusqu'à 24 h avant le départ.", back: "Modifier", editDetails: "← Modifier", secure: "Paiement sécurisé traité par Stripe", pay: "Payer", processing: "Traitement…",
		preparing: "Préparation de votre paiement…", close: "Fermer", viewVoucher: "Voir mon voucher",
		errDate: "Choisissez une date.", errPast: "Choisissez une date future.", errSeason: "Cette date est hors saison.", errName: "Indiquez votre nom.", errEmail: "E-mail invalide.", errPhone: "Téléphone invalide.", errGeneric: "Nous n'avons pas pu démarrer le paiement. Réessayez ou écrivez-nous sur WhatsApp.",
		namePh: "Votre nom", phonePh: "+33 …",
	},
	zh: {
		detailsTitle: "您的预订详情", date: "希望的日期", people: "人数", name: "全名", email: "电子邮箱", phone: "电话 / WhatsApp",
		season: "季节", continue: "继续付款", perPerson: "每人", perBoat: "每船", total: "总计",
		cancelNote: "出发前 24 小时内可取消并退款。", back: "编辑信息", editDetails: "← 编辑信息", secure: "由 Stripe 处理的安全支付", pay: "支付", processing: "处理中…",
		preparing: "正在准备付款…", close: "关闭", viewVoucher: "查看我的凭证",
		errDate: "请选择日期。", errPast: "请选择未来的日期。", errSeason: "该日期不在季节内。", errName: "请输入您的姓名。", errEmail: "邮箱无效。", errPhone: "电话无效。", errGeneric: "无法开始付款。请重试或通过 WhatsApp 联系我们。",
		namePh: "您的姓名", phonePh: "+86 …",
	},
}

interface PayButtonProps {
	slug: string
	expeditionName: string
	cardName: string
	amountMxn: number
	amountNote?: string
	label: string
	locale?: string
	featured?: boolean
}

export default function PayButton({ slug, expeditionName, cardName, amountMxn, amountNote, label, locale = "es", featured }: PayButtonProps) {
	const [open, setOpen] = useState(false)
	return (
		<>
			<button type="button" className={`btn ${featured ? "btn-teal" : "btn-solid"} pay-btn`} onClick={() => setOpen(true)}>
				{label}
			</button>
			{open && (
				<CheckoutModal
					slug={slug}
					expeditionName={expeditionName}
					cardName={cardName}
					unitAmountMxn={amountMxn}
					perPerson={isPerPerson(amountNote)}
					locale={locale}
					onClose={() => setOpen(false)}
				/>
			)}
		</>
	)
}

interface Reservation {
	dateISO: string; people: number; quantity: number; totalMxn: number
	name: string; email: string; phone: string
	folio: string; paymentIntentId: string
}

function CheckoutModal({ slug, expeditionName, cardName, unitAmountMxn, perPerson, locale, onClose }: {
	slug: string; expeditionName: string; cardName: string; unitAmountMxn: number; perPerson: boolean; locale: string; onClose: () => void
}) {
	const t = copy[locale] ?? copy.es
	const season = getSeason(slug)
	const [step, setStep] = useState<"details" | "pay" | "result">("details")

	const [dateISO, setDateISO] = useState("")
	const [people, setPeople] = useState(perPerson ? 1 : 2)
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [err, setErr] = useState<string | null>(null)
	const [busy, setBusy] = useState(false)

	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [reservation, setReservation] = useState<Reservation | null>(null)
	const [resultStatus, setResultStatus] = useState<"succeeded" | "processing">("succeeded")

	const quantity = perPerson ? people : 1
	const totalMxn = unitAmountMxn * quantity

	useEffect(() => {
		function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose() }
		document.addEventListener("keydown", onKey)
		const prev = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev }
	}, [onClose])

	async function submitDetails(e: FormEvent) {
		e.preventDefault()
		if (!dateISO) return setErr(t.errDate)
		if (dateISO <= new Date().toISOString().slice(0, 10)) return setErr(t.errPast)
		if (!isDateInSeason(slug, dateISO)) return setErr(t.errSeason)
		if (name.trim().length < 2) return setErr(t.errName)
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr(t.errEmail)
		if (phone.trim().length < 7) return setErr(t.errPhone)
		setErr(null)
		setBusy(true)
		try {
			const res = await fetch("/api/create-payment-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					slug, unitAmountMxn, quantity, people, dateISO,
					customerName: name.trim(), customerEmail: email.trim(), customerPhone: phone.trim(),
					cardName, expeditionName, locale,
				}),
			})
			const data = await res.json()
			if (!res.ok) throw new Error(data.error || "init")
			setClientSecret(data.clientSecret)
			setReservation({ dateISO, people, quantity, totalMxn: data.totalMxn ?? totalMxn, name: name.trim(), email: email.trim(), phone: phone.trim(), folio: data.folio, paymentIntentId: data.paymentIntentId })
			setStep("pay")
		} catch {
			setErr(t.errGeneric)
		} finally {
			setBusy(false)
		}
	}

	const options: StripeElementsOptions | undefined = clientSecret
		? {
				clientSecret,
				locale: stripeLocale(locale),
				fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" }],
				appearance: {
					theme: "night",
					variables: { colorPrimary: "#28c2a0", colorBackground: "#0d222f", colorText: "#f4efe4", colorTextSecondary: "#cdc6b4", colorDanger: "#ff8a80", fontFamily: "Poppins, sans-serif", borderRadius: "12px", spacingUnit: "4px" },
					rules: {
						".Input": { border: "1.5px solid rgba(244,239,228,0.16)", backgroundColor: "rgba(244,239,228,0.04)" },
						".Input:focus": { border: "1.5px solid #28c2a0", boxShadow: "0 0 0 1px #28c2a0" },
						".Label": { color: "#cdc6b4", fontSize: "13px" },
						".Tab": { border: "1.5px solid rgba(244,239,228,0.16)", backgroundColor: "rgba(244,239,228,0.04)" },
						".Tab--selected": { border: "1.5px solid #28c2a0", backgroundColor: "rgba(40,194,160,0.12)" },
						".Tab--selected .TabIcon, .Tab--selected .TabLabel": { color: "#f4efe4" },
					},
				},
			}
		: undefined

	const clamp = (n: number) => Math.max(1, Math.min(season.maxPeople, n))

	const modal = (
		<div className="checkout-overlay" onMouseDown={onClose}>
			<div className="checkout-modal" onMouseDown={(e) => e.stopPropagation()}>
				<button type="button" className="checkout-close" onClick={onClose} aria-label={t.close}>×</button>

				<div className="checkout-summary">
					<span className="kicker">{expeditionName}</span>
					<h3>{cardName}</h3>
					<div className="checkout-amount">{formatMxn(totalMxn)} <span>MXN</span></div>
					{perPerson && people > 1 && (
						<div className="checkout-breakdown">{people} × {formatMxn(unitAmountMxn)} {t.perPerson}</div>
					)}
					{!perPerson && <div className="checkout-breakdown">{t.perBoat}</div>}
				</div>

				{step === "details" && (
					<form onSubmit={submitDetails} className="checkout-form res-form">
						<label className="res-field">
							<span>{t.date}</span>
							<input type="date" required value={dateISO} min={tomorrowISO()} onChange={(e) => setDateISO(e.target.value)} />
							<em className="res-hint">{t.season}: {seasonLabel(slug, locale)}</em>
						</label>

						<div className="res-field">
							<span>{t.people}</span>
							<div className="res-stepper">
								<button type="button" onClick={() => setPeople((p) => clamp(p - 1))} aria-label="-">−</button>
								<input type="number" min={1} max={season.maxPeople} value={people} onChange={(e) => setPeople(clamp(Number(e.target.value) || 1))} />
								<button type="button" onClick={() => setPeople((p) => clamp(p + 1))} aria-label="+">+</button>
							</div>
						</div>

						<label className="res-field">
							<span>{t.name}</span>
							<input type="text" required value={name} placeholder={t.namePh} onChange={(e) => setName(e.target.value)} />
						</label>
						<label className="res-field">
							<span>{t.email}</span>
							<input type="email" required value={email} placeholder="tu@correo.com" onChange={(e) => setEmail(e.target.value)} />
						</label>
						<label className="res-field">
							<span>{t.phone}</span>
							<input type="tel" required value={phone} placeholder={t.phonePh} onChange={(e) => setPhone(e.target.value)} />
						</label>

						<div className="res-total">
							<span>{t.total}</span>
							<strong>{formatMxn(totalMxn)} MXN</strong>
						</div>
						<p className="res-cancel">↺ {t.cancelNote}</p>

						{err && <p className="checkout-error">⚠️ {err}</p>}
						<button type="submit" className="btn btn-teal checkout-submit" disabled={busy}>
							{busy ? t.processing : t.continue}
						</button>
					</form>
				)}

				{step === "pay" && clientSecret && options && reservation && (
					<Elements stripe={getStripeClient()} options={options}>
						<PaymentForm
							locale={locale}
							emailDefault={reservation.email}
							returnUrl={`${window.location.origin}/${locale}/reserva/${reservation.paymentIntentId}`}
							onBack={() => setStep("details")}
							onDone={(status) => { setResultStatus(status); setStep("result") }}
						/>
					</Elements>
				)}

				{step === "result" && reservation && (
					<>
						<Voucher data={{ folio: reservation.folio, expeditionName, cardName, dateISO: reservation.dateISO, people: reservation.people, totalMxn: reservation.totalMxn, locale, status: resultStatus }} />
						<div className="voucher-actions">
							<a className="btn btn-solid" href={`/${locale}/reserva/${reservation.paymentIntentId}`}>{t.viewVoucher}</a>
							<button type="button" className="btn btn-ghost" onClick={onClose}>{t.close}</button>
						</div>
					</>
				)}
			</div>
		</div>
	)

	return createPortal(modal, document.body)
}

function PaymentForm({ locale, emailDefault, returnUrl, onBack, onDone }: { locale: string; emailDefault: string; returnUrl: string; onBack: () => void; onDone: (status: "succeeded" | "processing") => void }) {
	const t = copy[locale] ?? copy.es
	const stripe = useStripe()
	const elements = useElements()
	const [email, setEmail] = useState(emailDefault)
	const [submitting, setSubmitting] = useState(false)
	const [message, setMessage] = useState<string | null>(null)

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		if (!stripe || !elements) return
		setSubmitting(true)
		setMessage(null)
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: "if_required",
			confirmParams: { return_url: returnUrl, receipt_email: email || undefined },
		})
		setSubmitting(false)
		if (error) { setMessage(error.message ?? "error"); return }
		if (paymentIntent?.status === "succeeded") onDone("succeeded")
		else if (paymentIntent) onDone("processing")
	}

	return (
		<form onSubmit={handleSubmit} className="checkout-form">
			<button type="button" className="checkout-back" onClick={onBack}>{t.editDetails}</button>
			<LinkAuthenticationElement options={{ defaultValues: { email: emailDefault } }} onChange={(e) => setEmail(e.value.email)} />
			<PaymentElement options={{ layout: "tabs" }} />
			{message && <p className="checkout-error">⚠️ {message}</p>}
			<button type="submit" className="btn btn-teal checkout-submit" disabled={!stripe || submitting}>
				{submitting ? t.processing : t.pay}
			</button>
			<p className="checkout-secure">🔒 {t.secure}</p>
		</form>
	)
}
