# Design: Google Reviews, Currency Selector & Instagram Gallery

**Date:** 2026-04-16
**Status:** Approved

## Overview

Three new features for the Keabelmet website:
1. Google Reviews section with real curated reviews and links to Google Maps
2. Currency selector (MXN/USD) with badge indicators on all prices
3. Instagram gallery integration pulling live content from @keabelmet__expeditions

---

## 1. Google Reviews (Hybrid)

### What it does
Displays curated real Google reviews on the homepage with a link to the Google Maps profile for viewing all reviews and leaving new ones.

### Location
New section on the homepage, placed after the existing Testimonials section and before the final CTA.

### Data structure
Add `googleReviews` key to all 4 locale files (`es.json`, `en.json`, `fr.json`, `zh.json`):

```json
"googleReviews": {
  "title": "Lo que dicen en Google",
  "subtitle": "Resenas reales de nuestros aventureros",
  "overallRating": "4.9",
  "totalReviews": "50+",
  "reviews": [
    {
      "name": "Nombre",
      "rating": 5,
      "date": "Hace 2 semanas",
      "text": "Texto de la resena..."
    }
  ],
  "ctaAll": "Ver todas en Google",
  "ctaLeave": "Deja tu resena",
  "googleMapsUrl": "https://www.google.com/maps/place/Keabelmet+Expeditions"
}
```

### Component
- `components/sections/GoogleReviews.tsx`
- Google "G" logo badge with overall rating and total review count
- 3-column responsive grid of review cards (name, stars, date, text)
- Two CTA buttons linking to Google Maps profile
- Follows existing card design patterns from Testimonials.tsx

### What it depends on
- Locale JSON files for content
- Google Maps URL from `config/mediaLinks.ts`
- No external API - reviews are manually curated from real Google reviews

---

## 2. Currency Selector & Price Badges

### What it does
Allows users to toggle between MXN and USD. All prices display with a currency badge. Prices are stored in MXN as the base currency and converted using a fixed exchange rate.

### Config file
New file `config/currency.ts`:

```typescript
export const currencyConfig = {
  base: "MXN" as const,
  available: ["MXN", "USD"] as const,
  exchangeRates: {
    MXN: 1,
    USD: 0.057, // 1 MXN = ~0.057 USD (~17.5 MXN per dollar)
  },
  symbols: {
    MXN: "$",
    USD: "$",
  },
  labels: {
    MXN: "MXN",
    USD: "USD",
  },
};
```

Update manually when exchange rate shifts significantly.

### Price standardization
All prices in JSON files change from string format (`"$120"`) to numeric MXN base values. Example for homepage adventures:

```json
{
  "title": "Isla Espiritu Santo",
  "price": 2100
}
```

The `formatPrice()` function converts and formats based on selected currency.

### State management
- React Context (`CurrencyProvider`) wraps the app
- Selected currency stored in `localStorage` for persistence
- Default: MXN

### Currency selector UI
- Small toggle in the navbar, next to the language selector
- Simple dropdown or toggle: `MXN | USD`

### formatPrice utility
New file `lib/currency.ts`:

```typescript
export function formatPrice(amountMXN: number, currency: "MXN" | "USD"): string
// formatPrice(2100, "MXN") => "$2,100 MXN"
// formatPrice(2100, "USD") => "$120 USD"
```

### Price badge display
Every price on the site shows the currency code after the amount:
- `$2,100 MXN` or `$120 USD`
- Applied in: homepage adventures, expedition cards, tour detail pages, rates page

### Files affected
- All 4 homepage locale files: prices become numeric MXN values
- All page-specific locale files: prices become numeric MXN values
- Homepage page component: use `formatPrice()` instead of string interpolation
- All experience page components: same
- Rates page component: same
- New: `config/currency.ts`, `lib/currency.ts`, `contexts/CurrencyContext.tsx`
- Navbar component: add currency toggle

---

## 3. Instagram Gallery

### What it does
Replaces the static gallery with live content from the `@keabelmet__expeditions` Instagram account using the Instagram Graph API.

### Architecture

```
Instagram Graph API
        |
        v
lib/instagram.ts (fetch + transform)
        |
        v
ISR cache (revalidate: 3600 = 1 hour)
        |
        v
Gallery page (/galeria) - 12 latest posts
Homepage section - 6 latest posts as preview
```

### Instagram utility
New file `lib/instagram.ts`:

```typescript
export interface InstagramPost {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string; // for videos
  permalink: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  timestamp: string;
}

export async function getInstagramPosts(limit?: number): Promise<InstagramPost[]>
export async function refreshInstagramToken(): Promise<string>
```

### Caching strategy
- Data fetched server-side at build time via ISR
- `revalidate: 3600` (refresh every hour)
- If API fails, fallback to the 9 existing static gallery images

### Token management
- Long-lived token stored as env var: `INSTAGRAM_ACCESS_TOKEN`
- Token lasts 60 days, must be refreshed before expiry
- `refreshInstagramToken()` function available for manual or automated refresh
- Optional: API route `app/api/instagram/refresh/route.ts` for cron-based refresh

### Environment variables
```
INSTAGRAM_ACCESS_TOKEN=<long-lived-token>
INSTAGRAM_USER_ID=<numeric-user-id>
```

### Gallery page (`/galeria`)
- Fetches 12 latest posts from Instagram
- Responsive grid: 1 col (mobile), 2 col (tablet), 3 col (desktop)
- Each item: image/video thumbnail, caption on hover, "Video" badge if applicable
- Click opens existing lightbox component (`gallery-lightbox.tsx`)
- Fallback to static images if API unavailable
- "Siguenos en Instagram" button at bottom linking to profile

### Homepage gallery preview
- New section "Galeria de Aventuras" showing 6 latest Instagram posts
- Placed after the "Why Keabelmet" section and before the Consequences section
- "Ver galeria completa" button linking to `/galeria`

### Files affected
- New: `lib/instagram.ts`
- New: `app/api/instagram/refresh/route.ts` (optional token refresh endpoint)
- Modified: `app/[locale]/galeria/page.tsx` (replace static with dynamic)
- Modified: `app/[locale]/page.tsx` (add Instagram preview section)
- Gallery locale files: add new labels for Instagram-related text

---

## Implementation order

1. **Currency system** (config, context, utility, price standardization) - foundational, affects all price displays
2. **Google Reviews section** - self-contained, only adds new section
3. **Instagram Gallery** - most complex, requires API setup and env vars

## Dependencies

- No new npm packages required for Google Reviews or Currency
- Instagram: no additional packages needed (native fetch with Next.js)
- Instagram requires: Facebook Developer App, Instagram Business account connected to Facebook Page, Graph API permissions (instagram_basic, pages_show_list)
