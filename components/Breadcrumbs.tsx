import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { defaultLocale, type Locale } from "@/lib/i18n"

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
  locale?: Locale
  className?: string
}

const homeLabel: Record<Locale, string> = {
  es: "Inicio",
  en: "Home",
  fr: "Accueil",
  zh: "首页",
}

function localizeHref(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  return `/${locale}${path === "/" ? "" : path}`
}

export default function Breadcrumbs({ items, locale = defaultLocale, className = "" }: BreadcrumbsProps) {
  const all: Crumb[] = [{ label: homeLabel[locale], href: localizeHref("/", locale) }, ...items]

  return (
    <nav aria-label="Breadcrumb" className={`bg-gray-50 border-b border-gray-200 ${className}`}>
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center flex-wrap gap-1 text-sm text-gray-600">
          {all.map((c, i) => {
            const isLast = i === all.length - 1
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} className="text-gray-400" aria-hidden />}
                {isLast || !c.href ? (
                  <span className="font-medium text-gray-900" aria-current={isLast ? "page" : undefined}>
                    {i === 0 ? <Home size={14} className="inline mr-1 -mt-0.5" aria-hidden /> : null}
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="hover:text-teal-700 transition-colors flex items-center">
                    {i === 0 ? <Home size={14} className="inline mr-1 -mt-0.5" aria-hidden /> : null}
                    {c.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
