import { experiences } from "@/constants/experiences"

const SITE = "https://www.keabelmet.com"

export const dynamic = "force-static"

export function GET() {
  const lines: string[] = []
  lines.push("# Keabelmet Expeditions")
  lines.push("")
  lines.push(
    "> Ecoturismo y safari marino en La Paz, Baja California Sur. Expediciones, buceo, surf camp, avistamiento de fauna marina y rentas privadas en el Mar de Cortés.",
  )
  lines.push("")
  lines.push(`Idioma canónico: español. Moneda base: MXN. Sitio: ${SITE}`)
  lines.push("")
  lines.push("## Recursos")
  lines.push("")
  lines.push(`- [Datos completos en JSON](${SITE}/experiences.json): catálogo estructurado de todas las experiencias.`)
  lines.push(`- [Versión expandida en texto](${SITE}/llms-full.txt): contenido completo para ingestión por LLMs.`)
  lines.push(`- [Sitemap](${SITE}/sitemap.xml)`)
  lines.push(`- [Página de experiencias](${SITE}/experiencias)`)
  lines.push(`- [Sobre nosotros](${SITE}/sobre-nosotros)`)
  lines.push(`- [Contacto](${SITE}/contacto)`)
  lines.push("")
  lines.push("## Experiencias")
  lines.push("")
  for (const e of experiences) {
    const i = e.i18n.es
    lines.push(`- [${i.title}](${SITE}${e.href}): ${i.description}`)
  }
  lines.push("")
  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
