"use client"

import { useState, type FormEvent } from "react"
import { Elements, PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js"
import type { StripeElementLocale, StripeElementsOptions } from "@stripe/stripe-js"
import { getStripeClient } from "@/lib/stripe-client"
import { formatMxn } from "@/lib/reservation"

export interface DealView {
	title: string
	subtitle?: string
	lines: { label: string; amountMxn: number }[]
	totalMxn: number
	depositMxn: number
	remainingMxn: number
	rate: number
	includes?: string
	excludes?: string
	note?: string
	photos?: { src: string; label: string }[]
}

interface UI {
	heading: string
	breakdown: string
	total: string
	deposit: string
	remaining: string
	payNote: string
	includes: string
	excludes: string
	name: string
	email: string
	phone: string
	namePh: string
	phonePh: string
	payBtn: string
	processing: string
	secure: string
	back: string
	pay: string
	okTitle: string
	okText: string
	emailSent: string
	errName: string
	errEmail: string
	errPhone: string
	errGeneric: string
	dueToday: string
	payBtnFull: string
	payFull: string
	okTitleFull: string
	okTextFull: string
	paidFull: string
}

const copy: Record<string, UI> = {
	es: {
		heading: "Tu reserva", breakdown: "Desglose", total: "Total del grupo", deposit: "Anticipo a pagar hoy", remaining: "Restante (el día de tus tours)",
		payNote: "El restante lo pagas en efectivo, transferencia o tarjeta el día de tus tours.",
		includes: "Incluye", excludes: "No incluye",
		name: "Nombre completo", email: "Correo electrónico", phone: "Teléfono / WhatsApp", namePh: "Tu nombre", phonePh: "+52 …",
		payBtn: "Apartar ahora", processing: "Procesando…", secure: "Pago seguro procesado por Stripe", back: "← Volver", pay: "Pagar anticipo",
		okTitle: "¡Tu reserva está apartada!", okText: "Te enviamos un correo de bienvenida con el resumen, el calendario y el restante por liquidar.",
		emailSent: "Revisa tu correo (y spam).",
		errName: "Escribe tu nombre.", errEmail: "Correo inválido.", errPhone: "Teléfono inválido.", errGeneric: "No pudimos iniciar el pago. Intenta de nuevo o escríbenos por WhatsApp.",
		dueToday: "Total a pagar hoy", payBtnFull: "Pagar ahora", payFull: "Pagar", okTitleFull: "¡Tu reserva está confirmada!", okTextFull: "Te enviamos un correo de bienvenida con el resumen y el calendario de tu reserva.", paidFull: "Pagado",
	},
	en: {
		heading: "Your reservation", breakdown: "Breakdown", total: "Group total", deposit: "Deposit due today", remaining: "Balance (day of your tours)",
		payNote: "You pay the balance in cash, bank transfer or card on the day of your tours.",
		includes: "Included", excludes: "Not included",
		name: "Full name", email: "Email", phone: "Phone / WhatsApp", namePh: "Your name", phonePh: "+1 …",
		payBtn: "Reserve now", processing: "Processing…", secure: "Secure payment processed by Stripe", back: "← Back", pay: "Pay deposit",
		okTitle: "Your reservation is held!", okText: "We've sent you a welcome email with the summary, the calendar and the balance due.",
		emailSent: "Check your email (and spam).",
		errName: "Enter your name.", errEmail: "Invalid email.", errPhone: "Invalid phone.", errGeneric: "We couldn't start the payment. Try again or message us on WhatsApp.",
		dueToday: "Total due today", payBtnFull: "Pay now", payFull: "Pay", okTitleFull: "Your reservation is confirmed!", okTextFull: "We've sent you a welcome email with the summary and the calendar of your reservation.", paidFull: "Paid",
	},
	fr: {
		heading: "Votre réservation", breakdown: "Détail", total: "Total du groupe", deposit: "Acompte à payer aujourd'hui", remaining: "Solde (le jour de vos tours)",
		payNote: "Vous réglez le solde en espèces, virement ou carte le jour de vos tours.",
		includes: "Inclus", excludes: "Non inclus",
		name: "Nom complet", email: "E-mail", phone: "Téléphone / WhatsApp", namePh: "Votre nom", phonePh: "+33 …",
		payBtn: "Réserver", processing: "Traitement…", secure: "Paiement sécurisé traité par Stripe", back: "← Retour", pay: "Payer l'acompte",
		okTitle: "Votre réservation est enregistrée !", okText: "Nous vous avons envoyé un e-mail de bienvenue avec le résumé, l'agenda et le solde à régler.",
		emailSent: "Vérifiez votre e-mail (et les spams).",
		errName: "Indiquez votre nom.", errEmail: "E-mail invalide.", errPhone: "Téléphone invalide.", errGeneric: "Nous n'avons pas pu démarrer le paiement. Réessayez ou écrivez-nous sur WhatsApp.",
		dueToday: "Total à payer aujourd'hui", payBtnFull: "Payer maintenant", payFull: "Payer", okTitleFull: "Votre réservation est confirmée !", okTextFull: "Nous vous avons envoyé un e-mail de bienvenue avec le résumé et l'agenda de votre réservation.", paidFull: "Payé",
	},
	zh: {
		heading: "你的预订", breakdown: "明细", total: "团队总计", deposit: "今天支付的定金", remaining: "余额（行程当天）",
		payNote: "余额在行程当天以现金、转账或刷卡支付。",
		includes: "包含", excludes: "不包含",
		name: "全名", email: "电子邮箱", phone: "电话 / WhatsApp", namePh: "你的姓名", phonePh: "+86 …",
		payBtn: "立即预订", processing: "处理中…", secure: "由 Stripe 处理的安全支付", back: "← 返回", pay: "支付定金",
		okTitle: "你的预订已保留！", okText: "我们已向你发送欢迎邮件，内含摘要、日历以及待付余额。",
		emailSent: "请查看你的邮箱（及垃圾邮件）。",
		errName: "请输入你的姓名。", errEmail: "邮箱无效。", errPhone: "电话无效。", errGeneric: "无法开始付款。请重试或通过 WhatsApp 联系我们。",
		dueToday: "今天支付总额", payBtnFull: "立即支付", payFull: "支付", okTitleFull: "你的预订已确认！", okTextFull: "我们已向你发送欢迎邮件，内含预订摘要和日历。", paidFull: "已付",
	},
	ca: {
		heading: "La teva reserva", breakdown: "Desglossament", total: "Total del grup", deposit: "Bestreta a pagar avui", remaining: "Pendent (el dia dels teus tours)",
		payNote: "El pendent el pagues en efectiu, transferència o targeta el dia dels teus tours.",
		includes: "Inclou", excludes: "No inclou",
		name: "Nom complet", email: "Correu electrònic", phone: "Telèfon / WhatsApp", namePh: "El teu nom", phonePh: "+34 …",
		payBtn: "Apartar ara", processing: "Processant…", secure: "Pagament segur processat per Stripe", back: "← Tornar", pay: "Pagar bestreta",
		okTitle: "La teva reserva està apartada!", okText: "T'hem enviat un correu de benvinguda amb el resum, el calendari i el pendent de liquidar.",
		emailSent: "Revisa el teu correu (i el correu brossa).",
		errName: "Escriu el teu nom.", errEmail: "Correu no vàlid.", errPhone: "Telèfon no vàlid.", errGeneric: "No hem pogut iniciar el pagament. Torna-ho a provar o escriu-nos per WhatsApp.",
		dueToday: "Total a pagar avui", payBtnFull: "Pagar ara", payFull: "Pagar", okTitleFull: "La teva reserva està confirmada!", okTextFull: "T'hem enviat un correu de benvinguda amb el resum i el calendari de la teva reserva.", paidFull: "Pagat",
	},
}

function stripeLocale(locale: string): StripeElementLocale {
	if (locale === "es" || locale === "en" || locale === "fr" || locale === "zh") return locale
	return "auto"
}

function lines2(text: string) {
	return text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
}

export default function DealCheckout({ deal, token, locale = "es" }: { deal: DealView; token: string; locale?: string }) {
	const t = copy[locale] ?? copy.es
	// Sin restante: es un pago completo (p. ej. link del bot con 1 o 2 actividades).
	const full = deal.remainingMxn <= 0
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [step, setStep] = useState<"view" | "pay" | "result">("view")
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [folio, setFolio] = useState("")
	const [err, setErr] = useState<string | null>(null)
	const [busy, setBusy] = useState(false)

	async function startPayment(e: FormEvent) {
		e.preventDefault()
		if (name.trim().length < 2) return setErr(t.errName)
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr(t.errEmail)
		if (phone.trim().length < 7) return setErr(t.errPhone)
		setErr(null)
		setBusy(true)
		try {
			const res = await fetch("/api/create-deal-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ token, customerName: name.trim(), customerEmail: email.trim(), customerPhone: phone.trim(), locale }),
			})
			const data = await res.json()
			if (!res.ok) throw new Error(data.error || "init")
			setClientSecret(data.clientSecret)
			setFolio(data.folio)
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
				},
			}
		: undefined

	const photos = deal.photos ?? []
	const cover = photos[0]
	const gallery = photos.slice(1)

	if (step === "result") {
		return (
			<div className="deal-wrap">
				<div className="dep-result">
					{cover && <div className="deal-result-cover" role="img" aria-label={cover.label} style={{ backgroundImage: `url("${cover.src}")` }} />}
					<div className="dep-result-badge">✓</div>
					<h2>{full ? t.okTitleFull : t.okTitle}</h2>
					<p className="dep-result-text">{full ? t.okTextFull : t.okText}</p>
					<div className="dep-result-folio">{folio}</div>
					<div className="dep-sum">
						<div className="dep-sum-row"><span>{t.total}</span><strong>{formatMxn(deal.totalMxn)} MXN</strong></div>
						<div className="dep-sum-row dep-sum-paid"><span>{full ? t.paidFull : t.deposit}</span><strong>{formatMxn(deal.depositMxn)} MXN</strong></div>
						{!full && <div className="dep-sum-row"><span>{t.remaining}</span><strong>{formatMxn(deal.remainingMxn)} MXN</strong></div>}
					</div>
					{!full && <p className="dep-note">💵 {t.payNote}</p>}
					<p className="dep-email-sent">📧 {t.emailSent}</p>
				</div>
			</div>
		)
	}

	if (step === "pay" && clientSecret && options) {
		return (
			<div className="deal-wrap">
				<div className="dep-pay">
					<div className="dep-pay-head">
						<button type="button" className="checkout-back" onClick={() => setStep("view")}>{t.back}</button>
						<div className="dep-pay-amount"><span>{full ? t.dueToday : t.deposit}</span><strong>{formatMxn(deal.depositMxn)} MXN</strong></div>
					</div>
					<Elements stripe={getStripeClient()} options={options}>
						<DealPaymentForm locale={locale} full={full} emailDefault={email} returnUrl={window.location.href.split("#")[0]} onDone={() => setStep("result")} />
					</Elements>
				</div>
			</div>
		)
	}

	const pct = Math.round(deal.rate * 100)
	return (
		<div className="deal-wrap">
			<div className="deal-head">
				<span className="deal-kicker">Keabelmet Expeditions</span>
				<h1>{deal.title}</h1>
				{deal.subtitle && <p className="deal-subtitle">{deal.subtitle}</p>}
			</div>

			{cover && (
				<div className="deal-cover" role="img" aria-label={cover.label} style={{ backgroundImage: `url("${cover.src}")` }}>
					<span className="deal-cover-label">{cover.label}</span>
				</div>
			)}
			{gallery.length > 0 && (
				<div className={`deal-gallery deal-gallery-${Math.min(gallery.length, 3)}`}>
					{gallery.map((p) => (
						<div key={p.src} className="deal-gallery-item" role="img" aria-label={p.label} style={{ backgroundImage: `url("${p.src}")` }}>
							<span>{p.label}</span>
						</div>
					))}
				</div>
			)}

			<div className="deal-card">
				<h2 className="dep-sec-title">{t.breakdown}</h2>
				<table className="deal-lines">
					<tbody>
						{deal.lines.map((l, i) => (
							<tr key={i}>
								<td>{l.label}</td>
								<td className="deal-amount">{formatMxn(l.amountMxn)} MXN</td>
							</tr>
						))}
					</tbody>
				</table>

				<div className="dep-sum">
					{full ? (
						<div className="dep-sum-row dep-sum-paid"><span>{t.dueToday}</span><strong>{formatMxn(deal.totalMxn)} MXN</strong></div>
					) : (
						<>
							<div className="dep-sum-row"><span>{t.total}</span><strong>{formatMxn(deal.totalMxn)} MXN</strong></div>
							<div className="dep-sum-row dep-sum-paid"><span>{t.deposit} ({pct}%)</span><strong>{formatMxn(deal.depositMxn)} MXN</strong></div>
							<div className="dep-sum-row"><span>{t.remaining}</span><strong>{formatMxn(deal.remainingMxn)} MXN</strong></div>
						</>
					)}
				</div>
				{!full && <p className="dep-note">💵 {t.payNote}</p>}
				{deal.note && <p className="deal-note-extra">{deal.note}</p>}

				{(deal.includes || deal.excludes) && (
					<div className="deal-inex">
						{deal.includes && (
							<div className="deal-inex-col">
								<h3>✓ {t.includes}</h3>
								<ul>{lines2(deal.includes).map((x, i) => <li key={i}>{x}</li>)}</ul>
							</div>
						)}
						{deal.excludes && (
							<div className="deal-inex-col deal-inex-no">
								<h3>✕ {t.excludes}</h3>
								<ul>{lines2(deal.excludes).map((x, i) => <li key={i}>{x}</li>)}</ul>
							</div>
						)}
					</div>
				)}

				<form onSubmit={startPayment} className="deal-checkout">
					<label className="res-field"><span>{t.name}</span><input type="text" value={name} placeholder={t.namePh} onChange={(e) => setName(e.target.value)} /></label>
					<label className="res-field"><span>{t.email}</span><input type="email" value={email} placeholder="tu@correo.com" onChange={(e) => setEmail(e.target.value)} /></label>
					<label className="res-field"><span>{t.phone}</span><input type="tel" value={phone} placeholder={t.phonePh} onChange={(e) => setPhone(e.target.value)} /></label>
					{err && <p className="checkout-error">⚠️ {err}</p>}
					<button type="submit" className="btn btn-teal dep-pay-btn" disabled={busy}>{busy ? t.processing : `${full ? t.payBtnFull : t.payBtn} · ${formatMxn(deal.depositMxn)} MXN`}</button>
				</form>
			</div>
		</div>
	)
}

function DealPaymentForm({ locale, full, emailDefault, returnUrl, onDone }: { locale: string; full: boolean; emailDefault: string; returnUrl: string; onDone: () => void }) {
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
		const { error, paymentIntent } = await stripe.confirmPayment({ elements, redirect: "if_required", confirmParams: { return_url: returnUrl, receipt_email: email || undefined } })
		setSubmitting(false)
		if (error) { setMessage(error.message ?? "error"); return }
		if (paymentIntent && (paymentIntent.status === "succeeded" || paymentIntent.status === "processing")) onDone()
	}

	return (
		<form onSubmit={handleSubmit} className="checkout-form">
			<LinkAuthenticationElement options={{ defaultValues: { email: emailDefault } }} onChange={(e) => setEmail(e.value.email)} />
			<PaymentElement options={{ layout: "tabs" }} />
			{message && <p className="checkout-error">⚠️ {message}</p>}
			<button type="submit" className="btn btn-teal checkout-submit" disabled={!stripe || submitting}>{submitting ? t.processing : full ? t.payFull : t.pay}</button>
			<p className="checkout-secure">🔒 {t.secure}</p>
		</form>
	)
}
