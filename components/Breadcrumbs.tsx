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
    <nav aria-label="Breadcrumb" className={className} style={{ background: "var(--ink)", borderBottom: "1px solid var(--line)", paddingTop: 72 }}>
      <div className="wrap" style={{ paddingTop: 14, paddingBottom: 14 }}>
        <ol className="flex items-center flex-wrap gap-1 text-sm" style={{ color: "var(--sand-dim)", listStyle: "none", margin: 0, padding: 0 }}>
          {all.map((c, i) => {
            const isLast = i === all.length - 1
            return (
              <li key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight size={14} style={{ color: "var(--sand-dim)", opacity: 0.6 }} aria-hidden />}
                {isLast || !c.href ? (
                  <span className="font-medium" style={{ color: "var(--sand)" }} aria-current={isLast ? "page" : undefined}>
                    {i === 0 ? <Home size={14} className="inline mr-1 -mt-0.5" aria-hidden /> : null}
                    {c.label}
                  </span>
                ) : (
                  <Link href={c.href} className="flex items-center transition-colors kbm-crumb-link">
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
