import type { Metadata } from "next"
import { SafariBahiaMagdalena } from "@/components/safari-bahia-magdalena"

export const metadata: Metadata = {
  title: "Safari Bahia Magdalena",
  description:
    "Safari marino en Bahia Magdalena, BCS. Nada con lobos marinos, avista marlines y disfruta la corrida de sardinas. Una expedicion unica de noviembre a diciembre.",
}

export default function SafariBahiaMagdalenaPage() {
  return <SafariBahiaMagdalena />
}
