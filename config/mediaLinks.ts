import { Instagram, Mail, Phone, MapPin, Send } from "lucide-react"
import { TbBrandTiktok } from "react-icons/tb"

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
    value: "+52 442 205 6214",
    url: "https://wa.me/524422056214",
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
