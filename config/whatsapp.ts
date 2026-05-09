export const WHATSAPP_NUMBER = "526122347897"
export const WHATSAPP_DISPLAY = "+52 612 234 7897"
export const WHATSAPP_DEFAULT_MESSAGE = "Me gustaria saber mas sobre el tour a ... "

export function buildWhatsAppLink(text?: string): string {
  const message = text?.trim() || WHATSAPP_DEFAULT_MESSAGE
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
