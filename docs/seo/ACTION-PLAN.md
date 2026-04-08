# SEO Action Plan: keabelmet.com

**Generated:** 2026-04-08
**Current Score:** 25/100
**Target Score:** 80+/100

---

## Tier 1 -- CRITICAL (Do first, 1-2 hours total)

These fixes alone would move the score from ~25 to ~55-60.

| # | Issue | File | Effort |
|---|-------|------|--------|
| 1 | Change `lang="en"` to `lang="es"` | `app/layout.tsx:40` | 1 min |
| 2 | Replace title "v0 App" with branded title | `app/layout.tsx:12` | 5 min |
| 3 | Replace description "Created with v0" | `app/layout.tsx:13` | 5 min |
| 4 | Remove `generator: "v0.app"` | `app/layout.tsx:14` | 1 min |
| 5 | Add `metadataBase: new URL("https://www.keabelmet.com")` | `app/layout.tsx:11` | 1 min |
| 6 | Remove `images: { unoptimized: true }` | `next.config.ts:11-13` | 1 min |
| 7 | Create `app/robots.ts` with crawl directives | new file | 10 min |
| 8 | Create `app/sitemap.ts` listing all 17 routes | new file | 15 min |
| 9 | Fix all English text on Spanish pages | `app/page.tsx` + activity pages | 30 min |
| 10 | Replace raw `<img>` with `<Image>` on homepage | `app/page.tsx` | 20 min |

---

## Tier 2 -- HIGH (Significant SEO value, 3-4 hours)

Completing Tier 1+2 would bring score to ~80.

| # | Issue | File(s) | Effort |
|---|-------|---------|--------|
| 11 | Add Open Graph + Twitter Card metadata | `app/layout.tsx` | 15 min |
| 12 | Add unique metadata to all 17 page files | all `page.tsx` | 1-2 hrs |
| 13 | Add Organization + WebSite JSON-LD to layout | `app/layout.tsx` | 20 min |
| 14 | Add TouristTrip JSON-LD to tour pages | activity/expedition pages | 1 hr |
| 15 | Add BreadcrumbList JSON-LD to all subpages | all pages | 30 min |
| 16 | Add security headers to next.config.ts | `next.config.ts` | 20 min |
| 17 | Enable ESLint and TypeScript build checks | `next.config.ts` | variable |
| 18 | Fix broken `/bahia-magdalena` internal link | `app/page.tsx:847` | 2 min |
| 19 | Fix broken blog article links or remove them | `app/blog/page.tsx` | 10 min |

---

## Tier 3 -- MEDIUM (Quality improvements, 4-6 hours)

| # | Issue | Effort |
|---|-------|--------|
| 20 | Expand "Sobre Nosotros" to 500+ words (team bios, certs, permits) | 1 hr |
| 21 | Expand thin pages (galeria, tarifas, experiencias) | 2 hrs |
| 22 | Add privacy policy, terms, cancellation policy pages | 1 hr |
| 23 | Add AggregateRating + Review JSON-LD | 30 min |
| 24 | Compress/convert images to WebP, remove duplicates | 1 hr |
| 25 | Replace CSS background-image hero with next/image | 15 min |
| 26 | Fix font loading (Geist variables or remove Montserrat/Poppins refs) | 15 min |
| 27 | Add `sizes` prop to all `<Image fill>` components | 30 min |
| 28 | Remove unnecessary `priority` from below-fold images | 15 min |
| 29 | Add Expediciones/Actividades dropdowns to main nav | 30 min |
| 30 | Increase mobile touch target sizes to 48px | 10 min |
| 31 | Deduplicate expedition content across pages | 30 min |

---

## Tier 4 -- LOW (Backlog)

| # | Issue | Effort |
|---|-------|--------|
| 32 | Remove unused heavy deps (recharts, react-day-picker, etc.) | 15 min |
| 33 | Add dynamic imports for below-fold sections | 30 min |
| 34 | Extract mobile menu into separate client component | 15 min |
| 35 | Remove legacy `src/app/` directory | 5 min |
| 36 | Add educational/factual content for AI citation readiness | 2-3 hrs |
| 37 | Add external trust signals (Google Reviews embed, TripAdvisor link) | 30 min |
| 38 | Update copyright year to 2026 | 1 min |
| 39 | Add TouristAttraction JSON-LD for destinations | 30 min |
| 40 | Add ImageObject schema to gallery | 20 min |

---

## Estimated Impact

| After completing | Estimated Score |
|-----------------|----------------|
| Tier 1 only | 55-60/100 |
| Tier 1 + 2 | 75-80/100 |
| Tier 1 + 2 + 3 | 85-90/100 |
| All tiers | 90-95/100 |
