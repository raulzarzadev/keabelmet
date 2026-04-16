# Google Reviews, Currency Selector & Instagram Gallery - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three features: a curated Google Reviews section, a MXN/USD currency selector with price badges, and an Instagram gallery integration that hides when not configured.

**Architecture:** Currency system uses React Context with a `<Price>` client component so Server Components just pass MXN amounts. Google Reviews is a new locale-driven section. Instagram uses server-side fetching with ISR and conditionally renders only when env vars are present.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, Framer Motion, Lucide icons, Instagram Graph API

**Spec:** `docs/superpowers/specs/2026-04-16-google-reviews-currency-instagram-design.md`

---

## File Structure

### New files
- `config/currency.ts` — exchange rate config and available currencies
- `lib/currency.ts` — `formatPrice()` utility function
- `contexts/CurrencyContext.tsx` — React Context provider + hook + `<Price>` component
- `components/CurrencySelector.tsx` — MXN/USD toggle for navbar
- `components/sections/GoogleReviews.tsx` — Google Reviews section component
- `lib/instagram.ts` — Instagram Graph API fetch utility
- `app/api/instagram/refresh/route.ts` — token refresh endpoint
- `components/sections/InstagramGallery.tsx` — reusable Instagram grid component

### Modified files
- `locales/es.json`, `locales/en.json`, `locales/fr.json`, `locales/zh.json` — add googleReviews data, convert adventure prices to MXN numbers, add Instagram labels
- `app/[locale]/layout.tsx` — wrap children with CurrencyProvider
- `components/Header.tsx` — add CurrencySelector
- `app/[locale]/page.tsx` — use `<Price>`, add GoogleReviews section, add Instagram preview
- `app/[locale]/tarifas/page.tsx` — use `<Price>`
- `app/[locale]/galeria/page.tsx` — conditionally use Instagram feed

---

## Feature 1: Currency System

### Task 1: Create currency config and formatPrice utility

**Files:**
- Create: `config/currency.ts`
- Create: `lib/currency.ts`

- [ ] **Step 1: Create currency config**

```typescript
// config/currency.ts
export type Currency = "MXN" | "USD"

export const currencyConfig = {
  base: "MXN" as const,
  available: ["MXN", "USD"] as const,
  exchangeRates: {
    MXN: 1,
    USD: 0.057,
  },
  symbols: {
    MXN: "$",
    USD: "$",
  },
} as const
```

- [ ] **Step 2: Create formatPrice utility**

```typescript
// lib/currency.ts
import { currencyConfig, type Currency } from "@/config/currency"

export function formatPrice(amountMXN: number, currency: Currency): string {
  const rate = currencyConfig.exchangeRates[currency]
  const converted = Math.round(amountMXN * rate)
  const symbol = currencyConfig.symbols[currency]
  const formatted = converted.toLocaleString("en-US")
  return `${symbol}${formatted} ${currency}`
}
```

- [ ] **Step 3: Commit**

```bash
git add config/currency.ts lib/currency.ts
git commit -m "feat: add currency config and formatPrice utility"
```

---

### Task 2: Create CurrencyContext and Price component

**Files:**
- Create: `contexts/CurrencyContext.tsx`

- [ ] **Step 1: Create context with provider, hook, and Price component**

```typescript
// contexts/CurrencyContext.tsx
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Currency, currencyConfig } from "@/config/currency"
import { formatPrice } from "@/lib/currency"

type CurrencyContextType = {
  currency: Currency
  setCurrency: (c: Currency) => void
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: currencyConfig.base,
  setCurrency: () => {},
})

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencyConfig.base)

  useEffect(() => {
    const saved = localStorage.getItem("currency") as Currency | null
    if (saved && currencyConfig.available.includes(saved)) {
      setCurrencyState(saved)
    }
  }, [])

  function setCurrency(c: Currency) {
    setCurrencyState(c)
    localStorage.setItem("currency", c)
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}

export function Price({ amount }: { amount: number }) {
  const { currency } = useCurrency()
  return <>{formatPrice(amount, currency)}</>
}
```

- [ ] **Step 2: Commit**

```bash
git add contexts/CurrencyContext.tsx
git commit -m "feat: add CurrencyContext provider and Price component"
```

---

### Task 3: Create CurrencySelector and add to navbar

**Files:**
- Create: `components/CurrencySelector.tsx`
- Modify: `components/Header.tsx`

- [ ] **Step 1: Create CurrencySelector component**

```typescript
// components/CurrencySelector.tsx
"use client"

import { useCurrency } from "@/contexts/CurrencyContext"
import { currencyConfig } from "@/config/currency"

export default function CurrencySelector() {
  const { currency, setCurrency } = useCurrency()

  return (
    <div className="flex items-center rounded-lg border border-gray-200 text-sm overflow-hidden">
      {currencyConfig.available.map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-2.5 py-1 font-medium transition-colors ${
            currency === c
              ? "bg-teal-700 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Add CurrencySelector to Header**

In `components/Header.tsx`, import and add next to LanguageSelector.

Find the desktop nav area (around line 96-97):
```tsx
import CurrencySelector from "@/components/CurrencySelector"
```

In the desktop `<div className="hidden lg:flex items-center gap-3">`, add `<CurrencySelector />` before `<LanguageSelector>`.

In the mobile `<div className="flex lg:hidden items-center gap-2">`, add `<CurrencySelector />` before `<LanguageSelector>`.

- [ ] **Step 3: Wrap app with CurrencyProvider**

In `app/[locale]/layout.tsx`, import and wrap children:

```tsx
import { CurrencyProvider } from "@/contexts/CurrencyContext"
```

Wrap the body content:
```tsx
<body className={`${geist.variable} font-sans antialiased`}>
  <CurrencyProvider>
    <Header locale={locale} />
    {children}
  </CurrencyProvider>
  <Analytics />
```

- [ ] **Step 4: Commit**

```bash
git add components/CurrencySelector.tsx components/Header.tsx app/[locale]/layout.tsx
git commit -m "feat: add currency selector to navbar with provider"
```

---

### Task 4: Standardize prices in locale JSON files

**Files:**
- Modify: `locales/es.json`, `locales/en.json`, `locales/fr.json`, `locales/zh.json`

All adventure prices change from string (`"$120"`) to numeric MXN values. Use these MXN base prices (derived from current USD prices * 17.5 rate):

| Adventure | Current | MXN Base |
|-----------|---------|----------|
| Isla Espiritu Santo | $120 USD | 2100 |
| Ballenas | $180 USD | 3150 |
| Buceo Cabo Pulmo | $190 USD | 3325 |
| Buceo La Paz | $200 USD | 3500 |
| Renta Velero | $600 USD | 10500 |
| Renta Yate | $1,700 USD | 29750 |

- [ ] **Step 1: Update es.json adventure prices**

In `locales/es.json`, change each adventure item's `price` from string to number:
```json
{ "title": "Isla Espiritu Santo", "badge": "...", "description": "...", "price": 2100 }
{ "title": "Ve ballenas por primera vez", "badge": "...", "description": "...", "price": 3150 }
{ "title": "Buceo en Cabo Pulmo", "badge": "...", "description": "...", "price": 3325 }
{ "title": "Buceo en La Paz", "badge": "...", "description": "...", "price": 3500 }
{ "title": "Renta un velero", "badge": "...", "description": "...", "price": 10500 }
{ "title": "Renta un Yate", "badge": "...", "description": "...", "price": 29750 }
```

- [ ] **Step 2: Update en.json, fr.json, zh.json adventure prices**

Same numeric values in all locales (prices are language-independent).

- [ ] **Step 3: Commit**

```bash
git add locales/es.json locales/en.json locales/fr.json locales/zh.json
git commit -m "feat: standardize adventure prices to numeric MXN base values"
```

---

### Task 5: Update homepage to use Price component

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Update Featured Adventures price display**

Import Price component at top:
```tsx
import { Price } from "@/contexts/CurrencyContext"
```

Find the adventures price rendering (around line 172-176). Replace the price display:

Old:
```tsx
<span className="ml-1 text-2xl font-bold">{item.price}</span>
```
New:
```tsx
<span className="ml-1 text-2xl font-bold"><Price amount={item.price} /></span>
```

- [ ] **Step 2: Update Expediciones price display**

Find the expeditions price rendering (around line 317-325). Replace:

Old:
```tsx
<div className="text-2xl font-bold text-teal-700">${expedition.price}</div>
```
New:
```tsx
<div className="text-2xl font-bold text-teal-700"><Price amount={expedition.price} /></div>
```

Also update the `expeditionsData` prices from USD to MXN:
```typescript
// Safari Bahia Magdalena
price: 3500,
// Safari La Ventana
price: 2800,
// Surf Camp La Paz
price: 3400,
```

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: use Price component on homepage for dynamic currency"
```

---

### Task 6: Update rates page to use Price component

**Files:**
- Modify: `app/[locale]/tarifas/page.tsx`

- [ ] **Step 1: Update rates page prices**

Import Price:
```tsx
import { Price } from "@/contexts/CurrencyContext"
```

Change hardcoded USD prices to MXN:
```typescript
const prices = [2900, 3150, 3400]
```

Replace price rendering (around line 47-48):

Old:
```tsx
<span className="text-5xl font-bold text-teal-600">${prices[i]}</span>
<span className="text-gray-600"> {t.currency}</span>
```
New:
```tsx
<span className="text-5xl font-bold text-teal-600"><Price amount={prices[i]} /></span>
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/tarifas/page.tsx
git commit -m "feat: use Price component on rates page"
```

---

### Task 6b: Update tour detail pages to use Price component

**Files:**
- Modify: all tour page components under `app/[locale]/experiencias/*/page.tsx`

Tour detail pages (tour-espiritu-santo, tour-ballena-gris, safari-bahia-magdalena, safari-la-ventana, buceo-cabo-pulmo, buceo-la-paz, renta-velero, renta-yate) display prices from their page-specific JSON files using the pattern `{t.pricing.standard.price}` (string like `"$1,800"`).

- [ ] **Step 1: Convert pricing strings to numeric MXN in page JSON files**

In each `locales/pages/*.json` file, convert pricing `price` fields from strings like `"$1,800"` or `"Desde $16,000"` to numeric values. Add a `priceNumeric` field alongside the existing `price` string for cases where the price text includes "Desde" or non-numeric content.

For standard prices that are clean numbers, change the rendering in each tour page to use `<Price>`.

For complex prices like "Desde $16,000" or "Consulta con un asesor", keep the string as-is (these are not suitable for automatic conversion).

- [ ] **Step 2: Import Price in each tour page and update standard price rendering**

In each tour detail page, import:
```tsx
import { Price } from "@/contexts/CurrencyContext"
```

Replace the standard pricing card's price display from:
```tsx
<div className="text-4xl font-bold text-teal-600">
  {t.pricing.standard.price} <span ...>{t.pricing.standard.currency}</span>
</div>
```
To:
```tsx
<div className="text-4xl font-bold text-teal-600">
  <Price amount={1800} />
</div>
```

Repeat for each tour page with the appropriate MXN amount. Sailboat and yacht prices that include "Desde" or "Consultar" remain as text strings since they aren't fixed prices.

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/experiencias/ locales/pages/
git commit -m "feat: use Price component on tour detail pages for standard pricing"
```

---

## Feature 2: Google Reviews

### Task 7: Add Google Reviews data to locale files

**Files:**
- Modify: `locales/es.json`, `locales/en.json`, `locales/fr.json`, `locales/zh.json`

- [ ] **Step 1: Add googleReviews to es.json**

Add before the `"language"` key at the end:

```json
"googleReviews": {
  "title": "Lo que dicen en Google",
  "subtitle": "Resenas reales de nuestros aventureros",
  "overallRating": "4.9",
  "totalReviews": "50+",
  "reviews": [
    {
      "name": "Ana Lopez",
      "rating": 5,
      "date": "Hace 1 mes",
      "text": "Experiencia increible con Keabelmet. Los guias son muy profesionales y el trato es excelente. Nadamos con lobos marinos y fue magico. 100% recomendado."
    },
    {
      "name": "Roberto Diaz",
      "rating": 5,
      "date": "Hace 2 semanas",
      "text": "El safari en Bahia Magdalena fue lo mejor de nuestro viaje. Vimos marlines, lobos marinos y el equipo nos hizo sentir seguros en todo momento."
    },
    {
      "name": "Patricia Hernandez",
      "rating": 5,
      "date": "Hace 3 semanas",
      "text": "Las fotos y videos que nos entregaron son espectaculares. Se nota que aman lo que hacen. Definitivamente volveremos el proximo ano."
    }
  ],
  "ctaAll": "Ver todas en Google",
  "ctaLeave": "Deja tu resena",
  "googleMapsUrl": "https://www.google.com/maps/place/Keabelmet+Expeditions"
},
```

- [ ] **Step 2: Add googleReviews to en.json**

```json
"googleReviews": {
  "title": "What they say on Google",
  "subtitle": "Real reviews from our adventurers",
  "overallRating": "4.9",
  "totalReviews": "50+",
  "reviews": [
    {
      "name": "Ana Lopez",
      "rating": 5,
      "date": "1 month ago",
      "text": "Incredible experience with Keabelmet. The guides are very professional and the service is excellent. We swam with sea lions and it was magical. 100% recommended."
    },
    {
      "name": "Roberto Diaz",
      "rating": 5,
      "date": "2 weeks ago",
      "text": "The safari in Bahia Magdalena was the highlight of our trip. We saw marlins, sea lions, and the team made us feel safe the entire time."
    },
    {
      "name": "Patricia Hernandez",
      "rating": 5,
      "date": "3 weeks ago",
      "text": "The photos and videos they delivered are spectacular. You can tell they love what they do. We will definitely come back next year."
    }
  ],
  "ctaAll": "See all on Google",
  "ctaLeave": "Leave a review",
  "googleMapsUrl": "https://www.google.com/maps/place/Keabelmet+Expeditions"
},
```

- [ ] **Step 3: Add googleReviews to fr.json**

```json
"googleReviews": {
  "title": "Ce qu'ils disent sur Google",
  "subtitle": "Avis reels de nos aventuriers",
  "overallRating": "4.9",
  "totalReviews": "50+",
  "reviews": [
    {
      "name": "Ana Lopez",
      "rating": 5,
      "date": "Il y a 1 mois",
      "text": "Experience incroyable avec Keabelmet. Les guides sont tres professionnels et le service est excellent. Nous avons nage avec des lions de mer et c'etait magique. 100% recommande."
    },
    {
      "name": "Roberto Diaz",
      "rating": 5,
      "date": "Il y a 2 semaines",
      "text": "Le safari a Bahia Magdalena a ete le point fort de notre voyage. Nous avons vu des marlins, des lions de mer et l'equipe nous a fait sentir en securite tout le temps."
    },
    {
      "name": "Patricia Hernandez",
      "rating": 5,
      "date": "Il y a 3 semaines",
      "text": "Les photos et videos qu'ils nous ont livres sont spectaculaires. On voit qu'ils aiment ce qu'ils font. Nous reviendrons certainement l'annee prochaine."
    }
  ],
  "ctaAll": "Voir tous sur Google",
  "ctaLeave": "Laisser un avis",
  "googleMapsUrl": "https://www.google.com/maps/place/Keabelmet+Expeditions"
},
```

- [ ] **Step 4: Add googleReviews to zh.json**

```json
"googleReviews": {
  "title": "Google 上的评价",
  "subtitle": "来自探险者的真实评价",
  "overallRating": "4.9",
  "totalReviews": "50+",
  "reviews": [
    {
      "name": "Ana Lopez",
      "rating": 5,
      "date": "1 个月前",
      "text": "与 Keabelmet 的体验令人难以置信。导游非常专业，服务一流。我们与海狮一起游泳，太神奇了。100% 推荐。"
    },
    {
      "name": "Roberto Diaz",
      "rating": 5,
      "date": "2 周前",
      "text": "Bahia Magdalena 的探险是我们旅行的亮点。我们看到了马林鱼、海狮，团队让我们全程感到安全。"
    },
    {
      "name": "Patricia Hernandez",
      "rating": 5,
      "date": "3 周前",
      "text": "他们交付的照片和视频非常壮观。可以看出他们热爱自己的工作。我们明年一定会再来。"
    }
  ],
  "ctaAll": "在 Google 上查看全部",
  "ctaLeave": "留下评价",
  "googleMapsUrl": "https://www.google.com/maps/place/Keabelmet+Expeditions"
},
```

- [ ] **Step 5: Commit**

```bash
git add locales/es.json locales/en.json locales/fr.json locales/zh.json
git commit -m "feat: add Google Reviews data to all 4 locale files"
```

---

### Task 8: Create GoogleReviews component

**Files:**
- Create: `components/sections/GoogleReviews.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/GoogleReviews.tsx
import { Star } from "lucide-react"

interface Review {
  name: string
  rating: number
  date: string
  text: string
}

interface GoogleReviewsProps {
  title: string
  subtitle: string
  overallRating: string
  totalReviews: string
  reviews: Review[]
  ctaAll: string
  ctaLeave: string
  googleMapsUrl: string
}

export default function GoogleReviews({
  title,
  subtitle,
  overallRating,
  totalReviews,
  reviews,
  ctaAll,
  ctaLeave,
  googleMapsUrl,
}: GoogleReviewsProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with Google badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm mb-6">
            <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span className="text-2xl font-bold text-gray-900">{overallRating}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500">({totalReviews})</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex mb-3">
                {Array.from({ length: 5 }, (_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${
                      s < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-4 line-clamp-4">&ldquo;{review.text}&rdquo;</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-medium text-gray-900">{review.name}</span>
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {ctaAll}
          </a>
          <a
            href={`${googleMapsUrl}?action=write`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800 transition-colors"
          >
            {ctaLeave}
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/GoogleReviews.tsx
git commit -m "feat: add GoogleReviews section component"
```

---

### Task 9: Add GoogleReviews to homepage

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Import and add section**

Import at top:
```tsx
import GoogleReviews from "@/components/sections/GoogleReviews"
```

Add `const gr = d.googleReviews` to the dictionary destructuring block (around line 24).

Insert the GoogleReviews section after the Testimonials section (after line ~212) and before the Problem/Solution section:

```tsx
{/* Google Reviews */}
{gr && (
  <GoogleReviews
    title={gr.title}
    subtitle={gr.subtitle}
    overallRating={gr.overallRating}
    totalReviews={gr.totalReviews}
    reviews={gr.reviews}
    ctaAll={gr.ctaAll}
    ctaLeave={gr.ctaLeave}
    googleMapsUrl={gr.googleMapsUrl}
  />
)}
```

- [ ] **Step 2: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: add Google Reviews section to homepage"
```

---

## Feature 3: Instagram Gallery

### Task 10: Create Instagram utility

**Files:**
- Create: `lib/instagram.ts`

- [ ] **Step 1: Create the Instagram fetch utility**

```typescript
// lib/instagram.ts

export interface InstagramPost {
  id: string
  mediaUrl: string
  thumbnailUrl?: string
  permalink: string
  caption?: string
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  timestamp: string
}

const INSTAGRAM_API = "https://graph.instagram.com"

function isConfigured(): boolean {
  return !!(process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_USER_ID)
}

export async function getInstagramPosts(
  limit: number = 12
): Promise<InstagramPost[] | null> {
  if (!isConfigured()) return null

  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN
    const userId = process.env.INSTAGRAM_USER_ID
    const fields = "id,media_url,thumbnail_url,permalink,caption,media_type,timestamp"
    const url = `${INSTAGRAM_API}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`

    const res = await fetch(url, { next: { revalidate: 3600 } })

    if (!res.ok) return null

    const json = await res.json()
    if (!json.data) return null

    return json.data.map((post: any) => ({
      id: post.id,
      mediaUrl: post.media_url,
      thumbnailUrl: post.thumbnail_url || undefined,
      permalink: post.permalink,
      caption: post.caption || undefined,
      mediaType: post.media_type,
      timestamp: post.timestamp,
    }))
  } catch {
    return null
  }
}

export async function refreshInstagramToken(): Promise<string | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return null

  try {
    const url = `${INSTAGRAM_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    const res = await fetch(url)
    if (!res.ok) return null
    const json = await res.json()
    return json.access_token || null
  } catch {
    return null
  }
}
```

- [ ] **Step 2: Create token refresh API route**

```typescript
// app/api/instagram/refresh/route.ts
import { refreshInstagramToken } from "@/lib/instagram"
import { NextResponse } from "next/server"

export async function GET() {
  const newToken = await refreshInstagramToken()

  if (!newToken) {
    return NextResponse.json({ error: "Failed to refresh token" }, { status: 500 })
  }

  // Log the new token - must be manually updated in env vars
  console.log("New Instagram token (update INSTAGRAM_ACCESS_TOKEN):", newToken)

  return NextResponse.json({
    success: true,
    message: "Token refreshed. Update INSTAGRAM_ACCESS_TOKEN env var with the new token.",
    token: newToken,
  })
}
```

- [ ] **Step 3: Commit**

```bash
git add lib/instagram.ts app/api/instagram/refresh/route.ts
git commit -m "feat: add Instagram Graph API utility and token refresh endpoint"
```

---

### Task 11: Create InstagramGallery component

**Files:**
- Create: `components/sections/InstagramGallery.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/InstagramGallery.tsx
import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import type { InstagramPost } from "@/lib/instagram"

interface InstagramGalleryProps {
  posts: InstagramPost[]
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  instagramUrl: string
  followText: string
}

export default function InstagramGallery({
  posts,
  title,
  subtitle,
  ctaText,
  ctaHref,
  instagramUrl,
  followText,
}: InstagramGalleryProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <Image
                src={post.mediaType === "VIDEO" ? (post.thumbnailUrl || post.mediaUrl) : post.mediaUrl}
                alt={post.caption?.slice(0, 100) || "Keabelmet Expeditions"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              {post.mediaType === "VIDEO" && (
                <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1.5">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
              )}
              {post.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm line-clamp-2">{post.caption}</p>
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          {ctaText && ctaHref && (
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800 transition-colors"
            >
              {ctaText}
            </Link>
          )}
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            {followText}
          </a>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/InstagramGallery.tsx
git commit -m "feat: add InstagramGallery section component"
```

---

### Task 12: Add Instagram labels to locale files

**Files:**
- Modify: `locales/es.json`, `locales/en.json`, `locales/fr.json`, `locales/zh.json`

- [ ] **Step 1: Add instagram section to all 4 locale files**

Add before the `"language"` key in each file:

**es.json:**
```json
"instagram": {
  "title": "Galeria de Aventuras",
  "subtitle": "Momentos reales capturados durante nuestras expediciones",
  "ctaFull": "Ver galeria completa",
  "follow": "Siguenos en Instagram"
},
```

**en.json:**
```json
"instagram": {
  "title": "Adventure Gallery",
  "subtitle": "Real moments captured during our expeditions",
  "ctaFull": "See full gallery",
  "follow": "Follow us on Instagram"
},
```

**fr.json:**
```json
"instagram": {
  "title": "Galerie d'aventures",
  "subtitle": "Moments reels captures lors de nos expeditions",
  "ctaFull": "Voir la galerie complete",
  "follow": "Suivez-nous sur Instagram"
},
```

**zh.json:**
```json
"instagram": {
  "title": "探险画廊",
  "subtitle": "探险中捕捉的真实瞬间",
  "ctaFull": "查看完整画廊",
  "follow": "在 Instagram 上关注我们"
},
```

- [ ] **Step 2: Commit**

```bash
git add locales/es.json locales/en.json locales/fr.json locales/zh.json
git commit -m "feat: add Instagram gallery labels to all locale files"
```

---

### Task 13: Add Instagram preview to homepage

**Files:**
- Modify: `app/[locale]/page.tsx`

- [ ] **Step 1: Import and fetch Instagram data**

Add imports at top:
```tsx
import { getInstagramPosts } from "@/lib/instagram"
import InstagramGallery from "@/components/sections/InstagramGallery"
```

Inside the `HomePage` function, after the dictionary loading, fetch Instagram posts:
```tsx
const instagramPosts = await getInstagramPosts(6)
```

Add `const ig = d.instagram` to the dictionary destructuring block.

- [ ] **Step 2: Insert Instagram section**

Insert after the "Why Keabelmet" section and before the Consequences section:

```tsx
{/* Instagram Gallery Preview */}
{instagramPosts && ig && (
  <InstagramGallery
    posts={instagramPosts}
    title={ig.title}
    subtitle={ig.subtitle}
    ctaText={ig.ctaFull}
    ctaHref={l("/galeria", locale)}
    instagramUrl="https://www.instagram.com/keabelmet__expeditions/"
    followText={ig.follow}
  />
)}
```

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: add Instagram gallery preview to homepage (hidden when not configured)"
```

---

### Task 14: Update gallery page with Instagram integration

**Files:**
- Modify: `app/[locale]/galeria/page.tsx`

- [ ] **Step 1: Add Instagram data fetching with static fallback**

Import Instagram utility at top:
```tsx
import { getInstagramPosts } from "@/lib/instagram"
import InstagramGallery from "@/components/sections/InstagramGallery"
```

Inside the page function, fetch posts:
```tsx
const instagramPosts = await getInstagramPosts(12)
```

- [ ] **Step 2: Conditionally render Instagram or static gallery**

Wrap the existing static gallery in a condition: only show it when Instagram is NOT available. When Instagram IS available, render the InstagramGallery component instead.

```tsx
{instagramPosts ? (
  <InstagramGallery
    posts={instagramPosts}
    title={t.title || "Galeria"}
    instagramUrl="https://www.instagram.com/keabelmet__expeditions/"
    followText={t.follow || "Instagram"}
  />
) : (
  /* existing static gallery grid stays here as fallback */
)}
```

- [ ] **Step 3: Commit**

```bash
git add app/[locale]/galeria/page.tsx
git commit -m "feat: use Instagram feed on gallery page with static fallback"
```

---

## Final Verification

### Task 15: Visual verification and cleanup

- [ ] **Step 1: Start dev server and verify all features**

```bash
npm run dev
```

Check in browser:
1. Currency toggle appears in navbar next to language selector
2. Clicking MXN/USD updates all prices across the site
3. Price badges show currency code (e.g., "$2,100 MXN" or "$120 USD")
4. Google Reviews section appears on homepage with 3 review cards and Google badge
5. "Ver todas en Google" and "Deja tu resena" buttons link correctly
6. Instagram sections are NOT visible (no env vars configured)
7. Gallery page shows existing static images (Instagram fallback)
8. All 4 languages display correctly

- [ ] **Step 2: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: visual adjustments after verification"
```
