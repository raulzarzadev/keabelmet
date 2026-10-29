import type { Metadata } from "next"
import { isValidLocale, defaultLocale } from "@/lib/i18n"
import DealBuilder from "@/components/DealBuilder"

export const metadata: Metadata = {
	title: "Armar deal · Keabelmet",
	robots: { index: false, follow: false },
}

export default async function ArmaDealPage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale: loc } = await params
	const locale = isValidLocale(loc) ? loc : defaultLocale
	return (
		<main className="deal-page">
			<DealBuilder locale={locale} />
		</main>
	)
}
