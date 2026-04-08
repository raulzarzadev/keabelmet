import type { Metadata } from "next"
import { SurfCampLanding } from "@/components/surf-camp-landing"

export const metadata: Metadata = {
  title: "Surf Camp La Paz",
  description:
    "Surf camp de 6 dias en La Paz, Baja California Sur. Clases diarias, analisis de video, transporte y snacks incluidos. Aprende a surfear con instructores expertos.",
}

export default function SurfCampPage() {
  return <SurfCampLanding />
}
