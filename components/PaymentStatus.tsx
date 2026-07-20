"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getStripeClient } from "@/lib/stripe-client"
import { defaultLocale, type Locale } from "@/lib/i18n"

const copy: Record<string, { checking: string; success: string; successBody: string; processing: string; processingBody: string; failed: string; failedBody: string; missing: string; missingBody: string; cta: string }> = {
	es: { checking: "Verificando tu pago…", success: "¡Pago confirmado!", successBody: "Gracias por reservar con Keabelmet. Te enviamos la confirmación por correo y nuestro equipo te contactará para coordinar los detalles.", processing: "Tu pago está en proceso", processingBody: "En cuanto se confirme te avisaremos por correo. Si pagaste en OXXO o por transferencia, puede tardar unas horas.", failed: "El pago no se completó", failedBody: "Algo salió mal al procesar tu pago. Puedes intentarlo de nuevo desde la página de la expedición.", missing: "No encontramos tu pago", missingBody: "Si acabas de pagar, revisa tu correo para la confirmación. Si tienes dudas, escríbenos.", cta: "Volver al inicio" },
	en: { checking: "Verifying your payment…", success: "Payment confirmed!", successBody: "Thank you for booking with Keabelmet. We sent your confirmation by email and our team will reach out to coordinate the details.", processing: "Your payment is processing", processingBody: "We'll email you as soon as it's confirmed. If you paid via OXXO or bank transfer, it may take a few hours.", failed: "Payment didn't go through", failedBody: "Something went wrong processing your payment. You can try again from the expedition page.", missing: "We couldn't find your payment", missingBody: "If you just paid, check your email for confirmation. If you have questions, message us.", cta: "Back to home" },
	fr: { checking: "Vérification de votre paiement…", success: "Paiement confirmé !", successBody: "Merci d'avoir réservé avec Keabelmet. Nous vous avons envoyé la confirmation par e-mail et notre équipe vous contactera pour organiser les détails.", processing: "Votre paiement est en cours", processingBody: "Nous vous enverrons un e-mail dès sa confirmation. Si vous avez payé via OXXO ou virement, cela peut prendre quelques heures.", failed: "Le paiement n'a pas abouti", failedBody: "Une erreur s'est produite lors du traitement de votre paiement. Vous pouvez réessayer depuis la page de l'expédition.", missing: "Nous n'avons pas trouvé votre paiement", missingBody: "Si vous venez de payer, vérifiez votre e-mail. Pour toute question, écrivez-nous.", cta: "Retour à l'accueil" },
	zh: { checking: "正在核实您的付款…", success: "付款已确认!", successBody: "感谢您通过Keabelmet预订。我们已通过电子邮件发送确认信息,我们的团队将与您联系以协调细节。", processing: "您的付款正在处理中", processingBody: "确认后我们会通过电子邮件通知您。如果您通过OXXO或银行转账支付,可能需要几个小时。", failed: "付款未能完成", failedBody: "处理您的付款时出现问题。您可以从探险页面重新尝试。", missing: "未找到您的付款信息", missingBody: "如果您刚刚完成付款,请查看邮箱确认信息。如有疑问,请联系我们。", cta: "返回首页" },
}

export default function PaymentStatus({ locale = defaultLocale }: { locale?: Locale }) {
	const t = copy[locale] ?? copy.es
	const searchParams = useSearchParams()
	const [state, setState] = useState<"checking" | "success" | "processing" | "failed" | "missing">("checking")

	useEffect(() => {
		const clientSecret = searchParams.get("payment_intent_client_secret")
		if (!clientSecret) {
			setState("missing")
			return
		}
		getStripeClient().then(async (stripe) => {
			if (!stripe) {
				setState("missing")
				return
			}
			const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret)
			if (!paymentIntent) setState("missing")
			else if (paymentIntent.status === "succeeded") setState("success")
			else if (paymentIntent.status === "processing" || paymentIntent.status === "requires_action") setState("processing")
			else setState("failed")
		})
	}, [searchParams])

	const icon = state === "success" ? "✓" : state === "processing" ? "⏳" : state === "failed" ? "✕" : state === "missing" ? "?" : null
	const title = state === "checking" ? t.checking : state === "success" ? t.success : state === "processing" ? t.processing : state === "failed" ? t.failed : t.missing
	const body = state === "success" ? t.successBody : state === "processing" ? t.processingBody : state === "failed" ? t.failedBody : state === "missing" ? t.missingBody : null

	return (
		<main className="page-wrap" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 20px" }}>
			<div className="dcard" style={{ maxWidth: 460, width: "100%", textAlign: "center", padding: "44px 34px" }}>
				{state === "checking" ? (
					<div className="checkout-loading" style={{ padding: "20px 0" }}>{t.checking}</div>
				) : (
					<>
						<div className={`checkout-result-ic${state === "success" ? " ok" : state === "failed" ? " fail" : ""}`} style={{ margin: "0 auto 18px" }}>{icon}</div>
						<h1 style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{title}</h1>
						{body && <p style={{ color: "var(--sand-dim)", fontSize: 14.5, marginBottom: 24 }}>{body}</p>}
						<Link href={locale === defaultLocale ? "/" : `/${locale}`} className="btn btn-teal" style={{ justifyContent: "center" }}>
							{t.cta}
						</Link>
					</>
				)}
			</div>
		</main>
	)
}
