import type { Metadata } from "next"
import { SafariLanding } from "@/components/safari-landing"

export const metadata: Metadata = {
  title: "Safari La Ventana",
  description:
    "Expedicion marina en La Ventana, BCS. Observa la migracion de mobulas y ballenas con guias expertos. Aventura de medio dia de abril a junio en el Mar de Cortes.",
}

export default function SafariLaVentanaPage() {
  return <SafariLanding />
}
