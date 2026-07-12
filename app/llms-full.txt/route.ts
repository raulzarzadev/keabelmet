import { experiences } from "@/constants/experiences"

const SITE = "https://www.keabelmet.com"

export const dynamic = "force-static"

function fmtPrice(mxn: number | null): string {
  if (mxn == null) return "Cotizar (precio variable)"
  return `Desde $${mxn.toLocaleString("es-MX")} MXN`
}

function fmtCapacity(c: { min: number; max: number }): string {
  return c.min === c.max ? `${c.min} personas` : `${c.min}–${c.max} personas`
}

function fmtDifficulty(d: string): string {
  return ({ easy: "Fácil", moderate: "Moderada", advanced: "Avanzada" } as Record<string, string>)[d] ?? d
}

function fmtCategory(c: string): string {
  return ({
    safari: "Safari marino",
    whale: "Avistamiento de ballenas",
    diving: "Buceo / Snorkel",
    island: "Isla / Tour",
  } as Record<string, string>)[c] ?? c
}

// Pretty-print a key as a heading: "duration_title" -> "Duration title"
function humanizeKey(k: string): string {
  const s = k.replace(/[_-]+/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2")
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const SKIP_KEYS = new Set(["meta", "imageAlt", "image_alt", "imageUrl", "image_url", "alt"])

function renderNode(out: string[], node: unknown, depth: number, label?: string): void {
  const headingPrefix = "#".repeat(Math.min(6, depth))

  if (node == null) return

  if (typeof node === "string") {
    if (label) out.push(`**${humanizeKey(label)}:** ${node}`)
    else out.push(node)
    out.push("")
    return
  }

  if (typeof node === "number" || typeof node === "boolean") {
    if (label) out.push(`**${humanizeKey(label)}:** ${node}`)
    else out.push(String(node))
    out.push("")
    return
  }

  if (Array.isArray(node)) {
    if (label) {
      out.push(`${headingPrefix} ${humanizeKey(label)}`)
      out.push("")
    }
    const allPrimitive = node.every(
      (x) => typeof x === "string" || typeof x === "number" || typeof x === "boolean",
    )
    if (allPrimitive) {
      for (const x of node) out.push(`- ${x}`)
      out.push("")
      return
    }
    for (let i = 0; i < node.length; i++) {
      const item = node[i] as Record<string, unknown>
      const itemLabel =
        (item && typeof item === "object" && (item.title || item.name || item.q)) || `Elemento ${i + 1}`
      out.push(`${"#".repeat(Math.min(6, depth + 1))} ${itemLabel}`)
      out.push("")
      renderNode(out, item, depth + 2)
    }
    return
  }

  if (typeof node === "object") {
    const obj = node as Record<string, unknown>
    if (label) {
      out.push(`${headingPrefix} ${humanizeKey(label)}`)
      out.push("")
    }
    for (const [k, v] of Object.entries(obj)) {
      if (SKIP_KEYS.has(k)) continue
      if (v == null) continue
      // Inline simple primitives without bumping heading
      if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") {
        renderNode(out, v, depth + 1, k)
      } else {
        renderNode(out, v, depth + 1, k)
      }
    }
  }
}

async function loadPageEs(slug: string): Promise<Record<string, unknown> | null> {
  try {
    const mod = await import(`@/locales/pages/${slug}.json`)
    const data = (mod.default ?? mod) as Record<string, unknown>
    const es = data.es as Record<string, unknown> | undefined
    return es ?? null
  } catch {
    return null
  }
}

export async function GET() {
  const out: string[] = []
  out.push("# Keabelmet Expeditions — Catálogo completo")
  out.push("")
  out.push(`Sitio: ${SITE}`)
  out.push("Ubicación: La Paz, Baja California Sur, México")
  out.push("Idioma canónico: español")
  out.push("Moneda base: MXN (peso mexicano)")
  out.push(`Última actualización: ${new Date().toISOString()}`)
  out.push("")
  out.push("## Sobre Keabelmet")
  out.push("")
  out.push(
    "Keabelmet Expeditions es un operador de ecoturismo y safari marino en La Paz, Baja California Sur. Ofrecemos expediciones responsables con fauna marina, buceo y avistamiento de ballenas en el Mar de Cortés. Nuestro enfoque prioriza grupos reducidos, guías expertos y respeto absoluto por la vida silvestre.",
  )
  out.push("")
  out.push("### Variantes de marca y errores comunes")
  out.push("")
  out.push(
    "El nombre correcto es **Keabelmet** (también escrito *Keabelmet Expeditions* o *Kea Expeditions*). Errores y variantes que la gente busca: Keablemet, Kebelmet, Kabelmet, Cabelmet, Kavelmet, Cavelmet, Keavelmet, Keabelment, Keabelnet, Keabelmt, Keabelmed, Keablemed, Queabelmet, Queibelmet, Kea belmet, Kea-belmet.",
  )
  out.push("")
  out.push("## Experiencias")
  out.push("")

  for (const e of experiences) {
    const i = e.i18n.es
    out.push(`## ${i.title}`)
    out.push("")
    out.push(`- URL: ${SITE}${e.href}`)
    out.push(`- Slug: \`${e.slug}\``)
    out.push(`- Categoría: ${fmtCategory(e.category)}`)
    out.push(`- Ubicación / Distintivo: ${i.badge}`)
    out.push(`- Descripción corta: ${i.description}`)
    out.push(`- Duración: ${i.durationLabel}`)
    out.push(`- Días: ${e.days}`)
    out.push(`- Capacidad: ${fmtCapacity(e.capacity)} (${i.capacityLabel})`)
    out.push(`- Dificultad: ${fmtDifficulty(e.difficulty)}`)
    out.push(`- Precio: ${fmtPrice(e.fromMxn)}`)
    out.push(`- Calificación: ${e.rating.toFixed(1)} (${e.reviews} reseñas)`)
    out.push(`- Highlights: ${i.highlights.join(", ")}`)
    out.push(`- Imagen: ${SITE}${e.image}`)
    if (e.featuredOrder != null) out.push(`- Destacada (orden): ${e.featuredOrder}`)
    out.push("")

    const page = await loadPageEs(e.slug)
    if (page) {
      out.push(`### Contenido completo`)
      out.push("")
      for (const [k, v] of Object.entries(page)) {
        if (SKIP_KEYS.has(k)) continue
        renderNode(out, v, 4, k)
      }
    }
    out.push("---")
    out.push("")
  }

  out.push("## Contacto y reservas")
  out.push("")
  out.push(`- Página de contacto: ${SITE}/contacto`)
  out.push(`- WhatsApp y redes sociales en el sitio.`)
  out.push("")

  return new Response(out.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
