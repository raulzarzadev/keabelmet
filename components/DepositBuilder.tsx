"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { Elements, PaymentElement, LinkAuthenticationElement, useStripe, useElements } from "@stripe/react-stripe-js"
import type { StripeElementLocale, StripeElementsOptions } from "@stripe/stripe-js"
import { getStripeClient } from "@/lib/stripe-client"
import { getSeason, seasonLabel, isDateInSeason } from "@/lib/expedition-seasons"
import { formatMxn } from "@/lib/reservation"
import type { BookableActivity } from "@/lib/bookable-activities"
import { computePackageDiscount } from "@/lib/packages"
import type { Locale } from "@/lib/i18n"

const DEPOSIT_RATE = 0.2
const MAX_ITEMS = 6

function stripeLocale(locale: string): StripeElementLocale {
	if (locale === "es" || locale === "en" || locale === "fr" || locale === "zh") return locale
	return "auto"
}
function tomorrowISO(): string {
	const d = new Date()
	d.setDate(d.getDate() + 1)
	return d.toISOString().slice(0, 10)
}

interface UI {
	title: string; sub: string; pick: string; add: string; inCart: string; yourTrip: string; empty: string;
	date: string; people: string; per: string; season: string; remove: string; from: string;
	name: string; email: string; phone: string; namePh: string; phonePh: string;
	subtotal: string; discount: string; total: string; deposit: string; remaining: string; payNote: string;
	payBtn: string; processing: string; secure: string; back: string; pay: string;
	okTitle: string; okText: string; close: string; emailSent: string;
	errItems: string; errDate: string; errName: string; errEmail: string; errPhone: string; errGeneric: string;
}

const copy: Record<string, UI> = {
	es: { title: "Arma tu reserva", sub: "Elige tus actividades, aparta con el 20% y paga el resto el día de tus tours.", pick: "Elige tus actividades", add: "Agregar", inCart: "Agregada", yourTrip: "Tu reserva", empty: "Aún no has agregado actividades.", date: "Fecha", people: "Personas", per: "persona", season: "Temporada", remove: "Quitar", from: "desde", name: "Nombre completo", email: "Correo electrónico", phone: "Teléfono / WhatsApp", namePh: "Tu nombre", phonePh: "+52 …", subtotal: "Subtotal", discount: "Descuento de paquete", total: "Total", deposit: "Anticipo a pagar hoy (20%)", remaining: "Restante (el día del tour)", payNote: "El restante lo pagas en efectivo, transferencia o tarjeta el día de tus tours.", payBtn: "Apartar con 20%", processing: "Procesando…", secure: "Pago seguro procesado por Stripe", back: "← Editar", pay: "Pagar anticipo", okTitle: "¡Tu reserva está apartada!", okText: "Te enviamos un correo de bienvenida con el resumen, el calendario de todas tus actividades y el restante por liquidar.", close: "Cerrar", emailSent: "Revisa tu correo (y spam).", errItems: "Agrega al menos una actividad con su fecha.", errDate: "Elige una fecha futura y en temporada para cada actividad.", errName: "Escribe tu nombre.", errEmail: "Correo inválido.", errPhone: "Teléfono inválido.", errGeneric: "No pudimos iniciar el pago. Intenta de nuevo o escríbenos por WhatsApp." },
	en: { title: "Build your reservation", sub: "Pick your activities, reserve with 20% and pay the rest on the day of your tours.", pick: "Choose your activities", add: "Add", inCart: "Added", yourTrip: "Your reservation", empty: "You haven't added any activities yet.", date: "Date", people: "People", per: "person", season: "Season", remove: "Remove", from: "from", name: "Full name", email: "Email", phone: "Phone / WhatsApp", namePh: "Your name", phonePh: "+1 …", subtotal: "Subtotal", discount: "Package discount", total: "Total", deposit: "Deposit due today (20%)", remaining: "Balance (day of tour)", payNote: "You pay the balance in cash, transfer or card on the day of your tours.", payBtn: "Reserve with 20%", processing: "Processing…", secure: "Secure payment processed by Stripe", back: "← Edit", pay: "Pay deposit", okTitle: "Your reservation is held!", okText: "We've sent you a welcome email with the summary, the calendar of all your activities and the balance due.", close: "Close", emailSent: "Check your email (and spam).", errItems: "Add at least one activity with its date.", errDate: "Pick a future, in-season date for each activity.", errName: "Enter your name.", errEmail: "Invalid email.", errPhone: "Invalid phone.", errGeneric: "We couldn't start the payment. Try again or message us on WhatsApp." },
	fr: { title: "Composez votre réservation", sub: "Choisissez vos activités, réservez avec 20% et payez le reste le jour de vos tours.", pick: "Choisissez vos activités", add: "Ajouter", inCart: "Ajoutée", yourTrip: "Votre réservation", empty: "Vous n'avez pas encore ajouté d'activités.", date: "Date", people: "Personnes", per: "personne", season: "Saison", remove: "Retirer", from: "dès", name: "Nom complet", email: "E-mail", phone: "Téléphone / WhatsApp", namePh: "Votre nom", phonePh: "+33 …", subtotal: "Sous-total", discount: "Remise forfait", total: "Total", deposit: "Acompte à payer aujourd'hui (20%)", remaining: "Solde (le jour du tour)", payNote: "Vous réglez le solde en espèces, virement ou carte le jour de vos tours.", payBtn: "Réserver avec 20%", processing: "Traitement…", secure: "Paiement sécurisé traité par Stripe", back: "← Modifier", pay: "Payer l'acompte", okTitle: "Votre réservation est enregistrée !", okText: "Nous vous avons envoyé un e-mail de bienvenue avec le résumé, l'agenda de toutes vos activités et le solde à régler.", close: "Fermer", emailSent: "Vérifiez votre e-mail (et les spams).", errItems: "Ajoutez au moins une activité avec sa date.", errDate: "Choisissez une date future et en saison pour chaque activité.", errName: "Indiquez votre nom.", errEmail: "E-mail invalide.", errPhone: "Téléphone invalide.", errGeneric: "Nous n'avons pas pu démarrer le paiement. Réessayez ou écrivez-nous sur WhatsApp." },
	zh: { title: "定制你的预订", sub: "选择活动，先付20%预订，其余在行程当天支付。", pick: "选择你的活动", add: "添加", inCart: "已添加", yourTrip: "你的预订", empty: "你还没有添加任何活动。", date: "日期", people: "人数", per: "人", season: "季节", remove: "移除", from: "起", name: "全名", email: "电子邮箱", phone: "电话 / WhatsApp", namePh: "你的姓名", phonePh: "+86 …", subtotal: "小计", discount: "套餐折扣", total: "总计", deposit: "今天支付的定金（20%）", remaining: "余额（行程当天）", payNote: "余额在行程当天以现金、转账或刷卡支付。", payBtn: "付20%预订", processing: "处理中…", secure: "由 Stripe 处理的安全支付", back: "← 编辑", pay: "支付定金", okTitle: "你的预订已保留！", okText: "我们已向你发送欢迎邮件，内含摘要、所有活动的日历以及待付余额。", close: "关闭", emailSent: "请查看你的邮箱（及垃圾邮件）。", errItems: "请至少添加一个活动及其日期。", errDate: "请为每个活动选择一个未来且在季节内的日期。", errName: "请输入你的姓名。", errEmail: "邮箱无效。", errPhone: "电话无效。", errGeneric: "无法开始付款。请重试或通过 WhatsApp 联系我们。" },
	ca: { title: "Munta la teva reserva", sub: "Tria les teves activitats, aparta amb el 20% i paga la resta el dia dels teus tours.", pick: "Tria les teves activitats", add: "Afegir", inCart: "Afegida", yourTrip: "La teva reserva", empty: "Encara no has afegit activitats.", date: "Data", people: "Persones", per: "persona", season: "Temporada", remove: "Treure", from: "des de", name: "Nom complet", email: "Correu electrònic", phone: "Telèfon / WhatsApp", namePh: "El teu nom", phonePh: "+34 …", subtotal: "Subtotal", discount: "Descompte de paquet", total: "Total", deposit: "Bestreta a pagar avui (20%)", remaining: "Pendent (el dia del tour)", payNote: "El pendent el pagues en efectiu, transferència o targeta el dia dels teus tours.", payBtn: "Apartar amb 20%", processing: "Processant…", secure: "Pagament segur processat per Stripe", back: "← Editar", pay: "Pagar bestreta", okTitle: "La teva reserva està apartada!", okText: "T'hem enviat un correu de benvinguda amb el resum, el calendari de totes les teves activitats i el pendent de liquidar.", close: "Tancar", emailSent: "Revisa el teu correu (i el correu brossa).", errItems: "Afegeix almenys una activitat amb la seva data.", errDate: "Tria una data futura i en temporada per a cada activitat.", errName: "Escriu el teu nom.", errEmail: "Correu no vàlid.", errPhone: "Telèfon no vàlid.", errGeneric: "No hem pogut iniciar el pagament. Torna-ho a provar o escriu-nos per WhatsApp." },
}

interface CartItem {
	key: string
	slug: string
	title: string
	cardName: string
	unitAmountMxn: number
	image: string
	dateISO: string
	people: number
}

let keyCounter = 0

export default function DepositBuilder({ locale = "es", activities }: { locale?: Locale; activities: BookableActivity[] }) {
	const t = copy[locale] ?? copy.es
	const [cart, setCart] = useState<CartItem[]>([])
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [step, setStep] = useState<"build" | "pay" | "result">("build")
	const [clientSecret, setClientSecret] = useState<string | null>(null)
	const [folio, setFolio] = useState("")
	const [totals, setTotals] = useState({ subtotal: 0, discount: 0, total: 0, deposit: 0, remaining: 0 })
	const [err, setErr] = useState<string | null>(null)
	const [busy, setBusy] = useState(false)

	const subtotal = useMemo(() => cart.reduce((s, it) => s + it.unitAmountMxn * it.people, 0), [cart])
	const { discountMxn: discount, applied: appliedPackages } = useMemo(
		() => computePackageDiscount(cart.map((it) => ({ slug: it.slug, unitAmountMxn: it.unitAmountMxn, people: it.people })), locale),
		[cart, locale],
	)
	const total = subtotal - discount
	const deposit = Math.round(total * DEPOSIT_RATE)
	const remaining = total - deposit

	function addActivity(a: BookableActivity) {
		if (cart.length >= MAX_ITEMS) return
		setCart((c) => [...c, { key: `k${keyCounter++}`, slug: a.slug, title: a.title, cardName: a.cardName, unitAmountMxn: a.unitAmountMxn, image: a.image, dateISO: "", people: 1 }])
	}
	function updateItem(key: string, patch: Partial<CartItem>) {
		setCart((c) => c.map((it) => (it.key === key ? { ...it, ...patch } : it)))
	}
	function removeItem(key: string) {
		setCart((c) => c.filter((it) => it.key !== key))
	}

	async function startPayment(e: FormEvent) {
		e.preventDefault()
		if (cart.length === 0) return setErr(t.errItems)
		for (const it of cart) {
			if (!it.dateISO || it.dateISO < tomorrowISO() || !isDateInSeason(it.slug, it.dateISO)) return setErr(t.errDate)
		}
		if (name.trim().length < 2) return setErr(t.errName)
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setErr(t.errEmail)
		if (phone.trim().length < 7) return setErr(t.errPhone)
		setErr(null)
		setBusy(true)
		try {
			const res = await fetch("/api/create-deposit-intent", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					items: cart.map((it) => ({ slug: it.slug, cardName: it.cardName, expeditionName: it.title, unitAmountMxn: it.unitAmountMxn, people: it.people, dateISO: it.dateISO })),
					customerName: name.trim(), customerEmail: email.trim(), customerPhone: phone.trim(), locale,
				}),
			})
			const data = await res.json()
			if (!res.ok) throw new Error(data.error || "init")
			setClientSecret(data.clientSecret)
			setFolio(data.folio)
			setTotals({ subtotal: data.subtotalMxn ?? subtotal, discount: data.discountMxn ?? discount, total: data.totalMxn ?? total, deposit: data.depositMxn ?? deposit, remaining: data.remainingMxn ?? remaining })
			setStep("pay")
		} catch (e2) {
			setErr(e2 instanceof Error && e2.message !== "init" ? t.errGeneric : t.errGeneric)
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

	if (step === "result") {
		return (
			<div className="dep-result">
				<div className="dep-result-badge">✓</div>
				<h2>{t.okTitle}</h2>
				<p className="dep-result-text">{t.okText}</p>
				<div className="dep-result-folio">{folio}</div>
				<div className="dep-sum">
					{totals.discount > 0 && (
						<>
							<div className="dep-sum-row"><span>{t.subtotal}</span><strong>{formatMxn(totals.subtotal)} MXN</strong></div>
							<div className="dep-sum-row dep-sum-disc"><span>🎁 {t.discount}</span><strong>−{formatMxn(totals.discount)} MXN</strong></div>
						</>
					)}
					<div className="dep-sum-row"><span>{t.total}</span><strong>{formatMxn(totals.total)} MXN</strong></div>
					<div className="dep-sum-row dep-sum-paid"><span>{t.deposit}</span><strong>{formatMxn(totals.deposit)} MXN</strong></div>
					<div className="dep-sum-row"><span>{t.remaining}</span><strong>{formatMxn(totals.remaining)} MXN</strong></div>
				</div>
				<p className="dep-note">💵 {t.payNote}</p>
				<p className="dep-email-sent">📧 {t.emailSent}</p>
			</div>
		)
	}

	if (step === "pay" && clientSecret && options) {
		return (
			<div className="dep-pay">
				<div className="dep-pay-head">
					<button type="button" className="checkout-back" onClick={() => setStep("build")}>{t.back}</button>
					<div className="dep-pay-amount"><span>{t.deposit}</span><strong>{formatMxn(totals.deposit)} MXN</strong></div>
				</div>
				<Elements stripe={getStripeClient()} options={options}>
					<DepositPaymentForm locale={locale} emailDefault={email} returnUrl={`${window.location.origin}/${locale}/arma-tu-reserva`} onDone={() => setStep("result")} />
				</Elements>
			</div>
		)
	}

	const added = new Set(cart.map((c) => c.slug))

	return (
		<div className="dep-wrap">
			<div className="dep-head">
				<h1>{t.title}</h1>
				<p>{t.sub}</p>
			</div>

			<div className="dep-grid">
				<section className="dep-catalog">
					<h2 className="dep-sec-title">{t.pick}</h2>
					<div className="dep-cards">
						{activities.map((a) => (
							<div key={a.slug} className="dep-card">
								<div className="dep-card-img" style={{ backgroundImage: `linear-gradient(rgba(8,21,31,0.15), rgba(8,21,31,0.65)), url("${a.image}")` }} />
								<div className="dep-card-body">
									<h3>{a.title}</h3>
									<div className="dep-card-price">{t.from} {formatMxn(a.unitAmountMxn)} <span>MXN / {t.per}</span></div>
									<button type="button" className={`btn ${added.has(a.slug) ? "btn-ghost" : "btn-teal"} dep-add`} onClick={() => addActivity(a)} disabled={cart.length >= MAX_ITEMS}>
										{added.has(a.slug) ? `+ ${t.add}` : t.add}
									</button>
								</div>
							</div>
						))}
					</div>
				</section>

				<aside className="dep-cart">
					<h2 className="dep-sec-title">{t.yourTrip}</h2>
					{cart.length === 0 && <p className="dep-empty">{t.empty}</p>}
					{cart.map((it) => {
						const season = getSeason(it.slug)
						return (
							<div key={it.key} className="dep-item">
								<div className="dep-item-top">
									<div className="dep-item-title">{it.title}</div>
									<button type="button" className="dep-item-remove" onClick={() => removeItem(it.key)} aria-label={t.remove}>×</button>
								</div>
								<div className="dep-item-fields">
									<label>
										<span>{t.date}</span>
										<input type="date" value={it.dateISO} min={tomorrowISO()} onChange={(e) => updateItem(it.key, { dateISO: e.target.value })} />
									</label>
									<div className="dep-item-people">
										<span>{t.people}</span>
										<div className="res-stepper">
											<button type="button" onClick={() => updateItem(it.key, { people: Math.max(1, it.people - 1) })}>−</button>
											<input type="number" min={1} max={season.maxPeople} value={it.people} onChange={(e) => updateItem(it.key, { people: Math.max(1, Math.min(season.maxPeople, Number(e.target.value) || 1)) })} />
											<button type="button" onClick={() => updateItem(it.key, { people: Math.min(season.maxPeople, it.people + 1) })}>+</button>
										</div>
									</div>
								</div>
								<div className="dep-item-foot">
									<em>{t.season}: {seasonLabel(it.slug, locale)}</em>
									<strong>{formatMxn(it.unitAmountMxn * it.people)} MXN</strong>
								</div>
							</div>
						)
					})}

					{cart.length > 0 && (
						<form onSubmit={startPayment} className="dep-checkout">
							<div className="dep-sum">
								{discount > 0 && (
									<>
										<div className="dep-sum-row"><span>{t.subtotal}</span><strong>{formatMxn(subtotal)} MXN</strong></div>
										{appliedPackages.map((p) => (
											<div key={p.id} className="dep-sum-row dep-sum-disc">
												<span>🎁 {p.name} · −{Math.round(p.off * 100)}%</span>
												<strong>−{formatMxn(p.discountMxn)} MXN</strong>
											</div>
										))}
									</>
								)}
								<div className="dep-sum-row"><span>{t.total}</span><strong>{formatMxn(total)} MXN</strong></div>
								<div className="dep-sum-row dep-sum-paid"><span>{t.deposit}</span><strong>{formatMxn(deposit)} MXN</strong></div>
								<div className="dep-sum-row"><span>{t.remaining}</span><strong>{formatMxn(remaining)} MXN</strong></div>
							</div>
							<p className="dep-note">💵 {t.payNote}</p>
							<label className="res-field"><span>{t.name}</span><input type="text" value={name} placeholder={t.namePh} onChange={(e) => setName(e.target.value)} /></label>
							<label className="res-field"><span>{t.email}</span><input type="email" value={email} placeholder="tu@correo.com" onChange={(e) => setEmail(e.target.value)} /></label>
							<label className="res-field"><span>{t.phone}</span><input type="tel" value={phone} placeholder={t.phonePh} onChange={(e) => setPhone(e.target.value)} /></label>
							{err && <p className="checkout-error">⚠️ {err}</p>}
							<button type="submit" className="btn btn-teal dep-pay-btn" disabled={busy}>{busy ? t.processing : `${t.payBtn} · ${formatMxn(deposit)} MXN`}</button>
						</form>
					)}
				</aside>
			</div>
		</div>
	)
}

function DepositPaymentForm({ locale, emailDefault, returnUrl, onDone }: { locale: string; emailDefault: string; returnUrl: string; onDone: () => void }) {
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
			<button type="submit" className="btn btn-teal checkout-submit" disabled={!stripe || submitting}>{submitting ? t.processing : t.pay}</button>
			<p className="checkout-secure">🔒 {t.secure}</p>
		</form>
	)
}
