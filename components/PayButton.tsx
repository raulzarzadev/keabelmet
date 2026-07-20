"use client"

import { useEffect, useState, type FormEvent } from "react"
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

function formatMxn(amount: number) {
	return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", maximumFractionDigits: 0 }).format(amount)
}

function stripeLocale(locale: string): StripeElementLocale {
	if (locale === "es" || locale === "en" || locale === "fr" || locale === "zh") return locale
	return "auto"
}

const copy: Record<string, { preparing: string; secure: string; pay: string; processing: string; success: string; successBody: string; pending: string; pendingBody: string; close: string }> = {
	es: { preparing: "Preparando tu pago…", secure: "Pago seguro procesado por Stripe", pay: "Pagar ahora", processing: "Procesando…", success: "¡Pago confirmado!", successBody: "Te enviamos la confirmación por correo. Nos vemos pronto en el mar.", pending: "Pago en proceso", pendingBody: "Estamos confirmando tu pago. Te avisaremos en cuanto se complete.", close: "Cerrar" },
	en: { preparing: "Preparing your payment…", secure: "Secure payment processed by Stripe", pay: "Pay now", processing: "Processing…", success: "Payment confirmed!", successBody: "We sent your confirmation by email. See you at sea soon.", pending: "Payment processing", pendingBody: "We're confirming your payment. We'll let you know once it's complete.", close: "Close" },
	fr: { preparing: "Préparation de votre paiement…", secure: "Paiement sécurisé traité par Stripe", pay: "Payer maintenant", processing: "Traitement…", success: "Paiement confirmé !", successBody: "Nous vous avons envoyé la confirmation par e-mail. À bientôt en mer.", pending: "Paiement en cours", pendingBody: "Nous confirmons votre paiement. Nous vous avertirons une fois terminé.", close: "Fermer" },
	zh: { preparing: "正在准备付款…", secure: "由 Stripe 处理的安全支付", pay: "立即支付", processing: "处理中…", success: "付款已确认!", successBody: "我们已通过电子邮件发送确认信息。海上见。", pending: "付款处理中", pendingBody: "我们正在确认您的付款,完成后会通知您。", close: "关闭" },
}

interface PayButtonProps {
	slug: string
	expeditionName: string
	cardName: string
	amountMxn: number
	label: string
	locale?: string
	featured?: boolean
}

export default function PayButton({ slug, expeditionName, cardName, amountMxn, label, locale = "es", featured }: PayButtonProps) {
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
					amountMxn={amountMxn}
					locale={locale}
					onClose={() => setOpen(false)}
				/>
			)}
		</>
	)
}

function CheckoutModal({ slug, expeditionName, cardName, amountMxn, locale, onClose }: { slug: string; expeditionName: string; cardName: string; amountMxn: number; locale: string; onClose: () => void }) {
	const t = copy[locale] ?? copy.es
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [loadError, setLoadError] = useState<string | null>(null)

	useEffect(() => {
		let cancelled = false
		fetch("/api/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ slug, amountMxn, cardName, expeditionName }),
		})
			.then(async (res) => {
				const data = await res.json()
				if (!res.ok) throw new Error(data.error || "payment_init_failed")
				if (!cancelled) setClientSecret(data.clientSecret)
			})
			.catch(() => {
				if (!cancelled) setLoadError("payment_init_failed")
			})
		return () => {
			cancelled = true
		}
	}, [slug, amountMxn, cardName, expeditionName])

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose()
		}
		document.addEventListener("keydown", onKey)
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = "hidden"
		return () => {
			document.removeEventListener("keydown", onKey)
			document.body.style.overflow = prevOverflow
		}
	}, [onClose])

	const options: StripeElementsOptions | undefined = clientSecret
		? {
				clientSecret,
				locale: stripeLocale(locale),
				fonts: [{ cssSrc: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" }],
				appearance: {
					theme: "night",
					variables: {
						colorPrimary: "#28c2a0",
						colorBackground: "#0d222f",
						colorText: "#f4efe4",
						colorTextSecondary: "#cdc6b4",
						colorDanger: "#ff8a80",
						fontFamily: "Poppins, sans-serif",
						borderRadius: "12px",
						spacingUnit: "4px",
					},
					rules: {
						".Input": { border: "1.5px solid rgba(244,239,228,0.16)", backgroundColor: "rgba(244,239,228,0.04)" },
						".Input:focus": { border: "1.5px solid #28c2a0", boxShadow: "0 0 0 1px #28c2a0" },
						".Label": { color: "#cdc6b4", fontSize: "13px" },
						".Tab": { border: "1.5px solid rgba(244,239,228,0.16)", backgroundColor: "rgba(244,239,228,0.04)" },
						".Tab:hover": { backgroundColor: "rgba(244,239,228,0.08)" },
						".Tab--selected": { border: "1.5px solid #28c2a0", backgroundColor: "rgba(40,194,160,0.12)" },
						".Tab--selected .TabIcon, .Tab--selected .TabLabel": { color: "#f4efe4" },
					},
				},
			}
		: undefined

	const modal = (
		<div className="checkout-overlay" onMouseDown={onClose}>
			<div className="checkout-modal" onMouseDown={(e) => e.stopPropagation()}>
				<button type="button" className="checkout-close" onClick={onClose} aria-label={t.close}>
					×
				</button>
				<div className="checkout-summary">
					<span className="kicker">{expeditionName}</span>
					<h3>{cardName}</h3>
					<div className="checkout-amount">
						{formatMxn(amountMxn)} <span>MXN</span>
					</div>
				</div>
				{loadError && <p className="checkout-error">⚠️ {loadError === "payment_init_failed" ? "No pudimos iniciar el pago. Intenta de nuevo o escríbenos por WhatsApp." : loadError}</p>}
				{!loadError && !clientSecret && <div className="checkout-loading">{t.preparing}</div>}
				{clientSecret && options && (
					<Elements stripe={getStripeClient()} options={options}>
						<PaymentForm locale={locale} onClose={onClose} />
					</Elements>
				)}
			</div>
		</div>
	)

	return createPortal(modal, document.body)
}

function PaymentForm({ locale, onClose }: { locale: string; onClose: () => void }) {
	const t = copy[locale] ?? copy.es
	const stripe = useStripe()
	const elements = useElements()
	const [email, setEmail] = useState("")
	const [submitting, setSubmitting] = useState(false)
	const [message, setMessage] = useState<string | null>(null)
	const [status, setStatus] = useState<"idle" | "success" | "processing">("idle")

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		if (!stripe || !elements) return
		setSubmitting(true)
		setMessage(null)
		const { error, paymentIntent } = await stripe.confirmPayment({
			elements,
			redirect: "if_required",
			confirmParams: {
				return_url: `${window.location.origin}/${locale}/pago-exitoso`,
				receipt_email: email || undefined,
			},
		})
		setSubmitting(false)
		if (error) {
			setMessage(error.message ?? "payment_error")
			return
		}
		if (paymentIntent?.status === "succeeded") setStatus("success")
		else if (paymentIntent?.status === "processing") setStatus("processing")
		else if (paymentIntent) setStatus("processing")
	}

	if (status === "success") {
		return (
			<div className="checkout-result">
				<div className="checkout-result-ic ok">✓</div>
				<h4>{t.success}</h4>
				<p>{t.successBody}</p>
				<button type="button" className="btn btn-teal" onClick={onClose}>
					{t.close}
				</button>
			</div>
		)
	}
	if (status === "processing") {
		return (
			<div className="checkout-result">
				<div className="checkout-result-ic">⏳</div>
				<h4>{t.pending}</h4>
				<p>{t.pendingBody}</p>
				<button type="button" className="btn btn-teal" onClick={onClose}>
					{t.close}
				</button>
			</div>
		)
	}

	return (
		<form onSubmit={handleSubmit} className="checkout-form">
			<LinkAuthenticationElement onChange={(e) => setEmail(e.value.email)} />
			<PaymentElement options={{ layout: "tabs" }} />
			{message && <p className="checkout-error">⚠️ {message}</p>}
			<button type="submit" className="btn btn-teal checkout-submit" disabled={!stripe || submitting}>
				{submitting ? t.processing : t.pay}
			</button>
			<p className="checkout-secure">🔒 {t.secure}</p>
		</form>
	)
}
