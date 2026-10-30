import type { Metadata } from "next"
import WhatsAppPanel from "@/components/WhatsAppPanel"

export const metadata: Metadata = {
	title: "Panel de WhatsApp · Keabelmet",
	robots: { index: false, follow: false },
}

export default function PanelWhatsAppPage() {
	return <WhatsAppPanel />
}
