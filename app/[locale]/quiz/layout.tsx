import type { Metadata } from "next"
import { isValidLocale } from "@/lib/i18n"
import { buildPageMeta } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  if (!isValidLocale(locale)) return {}
  return buildPageMeta("quiz", "/quiz", locale)
}

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return children
}
