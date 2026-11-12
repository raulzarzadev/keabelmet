import type { Metadata } from "next"
import ReservasPanel from "@/components/ReservasPanel"

export const metadata: Metadata = {
	title: "Reservas · Keabelmet",
	robots: { index: false, follow: false },
}

export default function PanelReservasPage() {
	return <ReservasPanel />
}
