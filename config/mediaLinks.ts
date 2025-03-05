import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send
} from 'lucide-react'
import { TbBrandTiktok } from 'react-icons/tb'

export const socialLinks = [
  // {
  //   name: 'Facebook',
  //   url: 'https://facebook.com/keabelmet',
  //   icon: Facebook
  // },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/keabelmet__expeditions/',
    icon: Instagram
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
    name: 'Ticktok',
    url: 'https://www.tiktok.com/@kea_expeditions',
    icon: TbBrandTiktok
  }
]

export const contactLinks = [
  {
    name: 'Email',
    value: 'info@keabelmet.com',
    url: 'mailto:info@keabelmet.com',
    icon: Mail
  },
  {
    name: 'Teléfono',
    value: '+52 624 123 4567',
    url: 'tel:+526241234567',
    icon: Phone
  },
  {
    name: 'WhatsApp',
    value: '+52 624 123 4567',
    url: 'https://wa.me/526241234567',
    icon: Send
  },
  {
    name: 'Dirección',
    value: 'La Paz, Baja California Sur, México',
    url: 'https://maps.google.com/?q=La+Paz+BCS+Mexico',
    icon: MapPin
  }
]

export type SocialLink = (typeof socialLinks)[0]
export type ContactLink = (typeof contactLinks)[0]
