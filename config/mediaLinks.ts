import { Instagram, Mail, Phone, MapPin, Send } from "lucide-react"
import { TbBrandTiktok } from "react-icons/tb"
import { WHATSAPP_DISPLAY, buildWhatsAppLink } from "./whatsapp"

export { WHATSAPP_NUMBER, WHATSAPP_DISPLAY, WHATSAPP_DEFAULT_MESSAGE, buildWhatsAppLink } from "./whatsapp"

export const socialLinks = [
  // {
  //   name: 'Facebook',
  //   url: 'https://facebook.com/keabelmet',
  //   icon: Facebook
  // },
  {
    name: "Instagram",
    url: "https://www.instagram.com/keabelmet__expeditions/",
    icon: Instagram,
  },
  // {
  //   name: 'Twitter',
  //   url: 'https://twitter.com/keabelmet',
  //   icon: Twitter
  // },
  // {
  //   name: 'YouTube',
  //   url: 'https://youtube.com/keabelmet',
  //   icon: Youtube
  // }
  {
    name: "Ticktok",
    url: "https://www.tiktok.com/@kea_expeditions",
    icon: TbBrandTiktok,
  },
]

export const contactLinks = [
  {
    name: "Email",
    value: "keabelmet@gmail.com",
    url: "mailto:keabelmet@gmail.com",
    icon: Mail,
  },
  {
    name: "Teléfono",
    value: "+52 442 205 6214",
    url: "tel:+524422056214",
    icon: Phone,
  },
  {
    name: "WhatsApp",
    value: WHATSAPP_DISPLAY,
    url: buildWhatsAppLink(),
    icon: Send,
  },
  {
    name: "Dirección",
    value: "La Ventana, Baja California Sur, México C.P. 23232",
    url: "https://maps.google.com/?q=La+Ventana+BCS+Mexico",
    icon: MapPin,
  },
]

export type SocialLink = (typeof socialLinks)[0]
export type ContactLink = (typeof contactLinks)[0]
