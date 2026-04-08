# SEO Audit Report: keabelmet.com

**Date:** 2026-04-08
**Business Type:** Adventure/Ecotourism Operator (Marine Safaris, BCS Mexico)
**Stack:** Next.js 16, Tailwind CSS v4, Vercel
**Pages Analyzed:** 17

---

## Overall SEO Health Score: 25/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 18/100 | 4.5 |
| Content Quality | 25% | 38/100 | 9.5 |
| On-Page SEO | 20% | 15/100 | 3.0 |
| Schema / Structured Data | 10% | 0/100 | 0.0 |
| Performance (CWV) | 10% | 40/100 | 4.0 |
| Images | 5% | 20/100 | 1.0 |
| AI Search Readiness | 5% | 22/100 | 1.1 |
| **Total** | **100%** | | **23.1** |

---

## Executive Summary

### Top 5 Critical Issues
1. **Placeholder metadata** -- Title is "v0 App", description is "Created with v0" on ALL pages
2. **`lang="en"` on Spanish site** -- Incorrect language declaration damages rankings
3. **No robots.txt or sitemap.xml** -- Both return 404, search engines have no crawl guidance
4. **Image optimization disabled** -- `unoptimized: true` in next.config.ts serves 31 MB of raw JPEGs
5. **Zero structured data** -- No JSON-LD, no rich results possible

### Top 5 Quick Wins (< 5 min each)
1. Change `lang="en"` to `lang="es"` in layout.tsx
2. Replace title/description placeholders with real metadata
3. Remove `generator: "v0.app"` meta tag
4. Add `metadataBase: new URL("https://www.keabelmet.com")`
5. Remove `images: { unoptimized: true }` from next.config.ts

---

## 1. Technical SEO (18/100)

### CRITICAL
- **No robots.txt** -- Returns 404. No crawl directives for search engines.
- **No sitemap.xml** -- Returns 404. 17 pages undiscoverable via sitemap.
- **Placeholder title: "v0 App"** -- Displayed in SERPs for every page.
- **Placeholder description: "Created with v0"** -- Zero click-through appeal.
- **Generator meta: "v0.app"** -- Signals boilerplate scaffold to crawlers.
- **No canonical tags** -- No `metadataBase` set, so Next.js can't generate canonicals.
- **No per-page metadata** -- None of 17 pages export their own metadata.
- **`lang="en"` on Spanish site** -- All content is Spanish, html tag says English.
- **Image optimization disabled globally** -- `unoptimized: true` in next.config.ts.

### HIGH
- **No Open Graph / Twitter Card tags** -- Social sharing shows generic previews.
- **No security headers** -- Missing HSTS, X-Content-Type-Options, X-Frame-Options, CSP, etc.
- **ESLint/TypeScript errors ignored** -- `ignoreDuringBuilds: true` masks broken pages.

### MEDIUM
- **Broken internal link** -- `/bahia-magdalena#inicio` leads to 404 (should be `/expediciones/safari-bahia-magdalena`).
- **Navigation gaps** -- 9 tour/activity pages only reachable from homepage body, not main nav.
- **Mobile touch targets too small** -- Nav links have `py-2` (8px), Google recommends 48px minimum.
- **Missing `sizes` attribute** on `<Image fill>` components.
- **Blog uses raw `<img>` instead of `next/image`**.
- **Empty alt text** on FAQ section image.

### LOW
- **Duplicate `src/app/` directory** -- Legacy scaffold should be removed.

---

## 2. Content Quality (38/100)

### E-E-A-T Assessment: 29/100

| Factor | Score | Issues |
|--------|-------|--------|
| Experience | 45/100 | Good local signals, but testimonials appear fabricated (generic names, no external links, no dates). "10K+ adventurers" claim unsubstantiated. |
| Expertise | 35/100 | Claims "biologists" and "certified guides" but no names, credentials, PADI certs, or profiles shown. |
| Authoritativeness | 15/100 | Zero external validation -- no Google Reviews, TripAdvisor, press mentions, or partnership badges (UNESCO, CONANP). |
| Trustworthiness | 25/100 | Contact page exists (good), but no privacy policy, terms of service, cancellation policy, or business registration. Copyright says 2025 (outdated). |

### Thin Content Pages
| Page | Word Count | Minimum | Status |
|------|-----------|---------|--------|
| /sobre-nosotros | ~150 | 500 | FAIL |
| /galeria | ~30 | 300 | FAIL |
| /blog | ~80 | 500 | FAIL |
| /tarifas | ~120 | 500 | FAIL |
| /experiencias | ~100 | 500 | FAIL |

### Mixed Language Issues (HIGH)
English text scattered throughout Spanish content:
- Hero stats: "Unique Tours", "Happy Adventurers", "Average Rating"
- Velero/Yate cards: "From", "Learn More", "Protected Natural Area"
- Expedition buttons: "Book Now"
- Activity badges: "Sea Lion Colony", "Premium Experience"

### Dead Links
Blog page lists 3 articles linking to routes that don't exist (`/blog/temporada-ballenas-grises`, etc.).

### Content Duplication
Expedition data (Safari Bahia Magdalena, Safari La Ventana, Surf Camp) duplicated across homepage, /experiencias, and /tarifas -- internal cannibalization risk.

---

## 3. Schema & Structured Data (0/100)

**Current implementation: NONE** -- Zero JSON-LD, Microdata, or RDFa anywhere.

### Missing schemas (by priority):

| Schema Type | Priority | Rich Result |
|-------------|----------|-------------|
| TourOperator / LocalBusiness | CRITICAL | Knowledge Panel, Maps |
| WebSite | CRITICAL | Sitelinks Searchbox |
| TouristTrip + Offer | CRITICAL | Product rich results |
| BreadcrumbList | HIGH | Breadcrumb trail in SERPs |
| AggregateRating | HIGH | Star ratings in SERPs |
| Review | HIGH | Review snippets |
| TouristAttraction | HIGH | Google Travel / Maps |

**Note:** FAQPage schema should NOT be implemented -- Google restricted FAQ rich results to gov/health sites only (Aug 2023).

---

## 4. Performance (40/100)

### Predicted Core Web Vitals
| Metric | Estimated | Status |
|--------|-----------|--------|
| LCP | 4.0-8.0s | POOR |
| INP | 150-250ms | NEEDS IMPROVEMENT |
| CLS | 0.15-0.30 | POOR |

### Critical Issues
- **`unoptimized: true`** -- Disables ALL Next.js image optimization (WebP/AVIF, resizing, lazy loading).
- **Raw `<img>` tags on homepage** -- 7+ images without width/height cause CLS; no lazy loading.
- **31 MB of uncompressed images** in public/ -- largest files: `ballena-gris-encuentro.jpg` (2.36 MB), `buceo-cabo-pulmo-cardumen.jpg` (2.24 MB).
- **CSS background image for hero** -- Bypasses Next.js optimization, discovered late by browser.

### Other Issues
- Font mismatch: Geist loaded but unused, CSS references Montserrat/Poppins which don't exist.
- Unused heavy dependencies: recharts (~45KB), react-day-picker + date-fns (~25KB), react-hook-form + zod (~20KB).
- No code splitting or `<Suspense>` boundaries -- 866-line page.tsx is monolithic.

---

## 5. Images (20/100)

- 90+ images totaling 31 MB in public/
- Multiple duplicates (cachalotecta.jpeg appears 5 times)
- `manta-ray-swimming.png` (681 KB) should be WebP
- Most card images served at full resolution despite displaying at ~400px
- 1 empty alt text, several in English on Spanish pages

---

## 6. AI Search Readiness (22/100)

| Requirement | Present |
|-------------|---------|
| Clear heading hierarchy | Partial |
| Quotable factual statements | Minimal |
| Structured data | No |
| Unique data/statistics | No |
| Entity identification | No |
| Educational content | No |

**Recommendation:** Add factual, citable content (species facts, water temperatures, conservation data, seasonal calendars) that AI systems can reference.
