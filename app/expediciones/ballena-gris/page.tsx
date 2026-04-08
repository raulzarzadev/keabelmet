import type { Metadata } from "next"
import { BallenaGrisLanding } from "@/components/ballena-gris-landing"

export const metadata: Metadata = {
  title: "Expedicion Ballena Gris",
  description:
    "Expedicion para avistar ballenas grises en Baja California Sur. Encuentros cercanos en su santuario natural con guias certificados y embarcaciones seguras.",
}

export default function BallenaGrisPage() {
  return <BallenaGrisLanding />
}
