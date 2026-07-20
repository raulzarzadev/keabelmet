import { Suspense } from "react"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import PaymentStatus from "@/components/PaymentStatus"

export const metadata = {
	title: "Estado de tu pago · Keabelmet",
	robots: { index: false, follow: false },
}

export default async function PagoExitosoPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: loc } = await params
	const locale = isValidLocale(loc) ? loc : defaultLocale

	return (
		<Suspense fallback={null}>
			<PaymentStatus locale={locale} />
		</Suspense>
	)
}
