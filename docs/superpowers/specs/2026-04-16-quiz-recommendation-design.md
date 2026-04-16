# Design: Quiz de Recomendacion y Pagina de Contacto

**Date:** 2026-04-16
**Status:** Approved

## Overview

A multi-step mobile-first quiz that recommends tours based on user experience level and preferences, ending with a WhatsApp link containing all answers. The contact page is updated with two entry paths: "I want to know more about a tour" (activity selector → WhatsApp) and "Help me choose" (redirects to `/quiz`).

---

## 1. Contact Page Update (`/contacto`)

### Changes
Add two large cards at the top of the existing contact page, before the current form:

**Card 1: "Quiero saber mas sobre un tour"**
- Shows a selector/grid of current activities: Isla Espiritu Santo, Ballenas, Buceo Cabo Pulmo, Buceo La Paz, Safari Bahia Magdalena, Safari La Ventana, Renta Velero, Renta Yate, Surf Camp, Tiburon Ballena
- On selection, generates WhatsApp link: `https://wa.me/524422056214?text=Hola, quiero saber mas sobre [tour name]`

**Card 2: "Ayudame a escoger"**
- Redirects to `/quiz`

The existing contact form stays below as a third option.

### Localization
Add labels to all 4 locale files under a `"contactCards"` key:
```json
"contactCards": {
  "tourTitle": "Quiero saber mas sobre un tour",
  "tourSubtitle": "Selecciona la actividad que te interesa",
  "quizTitle": "Ayudame a escoger",
  "quizSubtitle": "Responde unas preguntas y te recomendamos la mejor experiencia"
}
```

---

## 2. Quiz Page (`/quiz`)

### Route
New page at `app/[locale]/quiz/page.tsx`. Client component ("use client") since it manages multi-step state.

### Conditional Question Flow

```
Step 1: "Sabes nadar?"
  → Si / No

Step 2: (only if can swim) "Has hecho snorkel?"
  → Nunca / Pocas veces / Varias veces / Muchas veces

Step 3: (only if can swim) "Has buceado?"
  → Si / No

Step 4: (only if has dived) "Tienes certificado de buceo?"
  → No / Open Water / Advanced / Rescue / Divemaster+

Step 5: "Que te gustaria hacer?" (multiple selection)
  Options filtered by previous answers:
  - Can't swim: Rentar embarcacion, Pescar, Hikes, Avistamiento desde barco
  - Can swim: Snorkel, Buceo*, Surf, Rentar embarcacion, Pescar, Hikes
  - *Buceo only if has certificate or has dived

Step 6: "Con quien vas?"
  → Solo / Pareja / Familia / Amigos

Step 7: "Cuantas personas son?"
  → 1 / 2 / 3-4 / 5-6 / 7+
```

Steps are numbered dynamically based on which are shown (e.g., if user can't swim, they see steps 1, 2, 3, 4 instead of 1, 5, 6, 7).

### UI Design (Mobile-First)

- **One question per screen**, full viewport height
- **Progress bar** at top showing current step / total steps (dynamic based on conditional flow)
- **Options as large tap-friendly buttons/cards** (minimum 48px touch target)
- **Smooth transitions** between steps (slide or fade with Framer Motion)
- **Back button** to go to previous step
- **No "Next" button** — selecting an option auto-advances (except multi-select step 5 which has a "Continue" button)
- Responsive: on desktop, centered card with max-width ~480px

### State Management
All state lives in a single `useState` object within the quiz page component:
```typescript
type QuizState = {
  canSwim: boolean | null
  snorkelLevel: string | null
  hasDived: boolean | null
  diveCert: string | null
  activities: string[]
  groupType: string | null
  groupSize: string | null
}
```

---

## 3. Recommendation Engine

### Location
`lib/quiz-recommendations.ts` — pure function, no API needed.

### Function Signature
```typescript
interface TourRecommendation {
  id: string        // matches tour page slug
  title: string
  image: string
  price: number     // MXN base
  duration: string
  description: string
  href: string
}

function getRecommendations(answers: QuizState): TourRecommendation[]
```

### Recommendation Logic
Returns 1-3 tours sorted by relevance:

**Can't swim:**
- Renta Velero, Renta Yate, Avistamiento de ballenas (from boat)

**Can swim, no diving:**
- Isla Espiritu Santo, Safari La Ventana, Tiburon Ballena
- If surf selected → add Surf Camp

**Can swim, with diving:**
- Buceo Cabo Pulmo, Buceo La Paz
- Plus non-diving options from above

**Group modifiers:**
- Family → prioritize Isla Espiritu Santo, Ballenas (family-friendly)
- Large group (5+) → suggest private options, velero, yate
- Couple → prioritize Safari La Ventana, Renta Velero

**Activity preferences:**
- Filter results to match selected activities where possible
- Always return at least 1 recommendation

---

## 4. Results Screen

### Layout
Shown after the last quiz step:

1. **Title:** "Estas son nuestras recomendaciones para ti"
2. **Tour cards (1-3):** Each shows image, name, price (using `<Price>` component), duration, short description, and link to tour page
3. **WhatsApp button:** Large green button at bottom

### WhatsApp Message Format
```
Hola! Hice el quiz de Keabelmet y estos son mis datos:
- Nadar: Si/No
- Snorkel: [level]
- Buceo: Si/No
- Certificado: [cert level]
- Actividades: [list]
- Grupo: [type], [size] personas
- Tours recomendados: [tour names]

Me gustaria mas informacion!
```

URL: `https://wa.me/524422056214?text=[encoded message]`

---

## 5. Localization

All quiz text lives in a new page-specific locale file `locales/pages/quiz.json` with all 4 languages (es, en, fr, zh).

Content includes: page title, each question text, all option labels, results title, WhatsApp button text, back button text, progress text.

---

## 6. Files Affected

### New files
- `app/[locale]/quiz/page.tsx` — quiz page component (client)
- `lib/quiz-recommendations.ts` — recommendation logic
- `locales/pages/quiz.json` — quiz translations (4 languages)

### Modified files
- `app/[locale]/contacto/page.tsx` — add two entry cards at top
- `locales/pages/contact.json` — add contactCards labels (4 languages)
