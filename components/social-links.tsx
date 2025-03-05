import { MediaLink } from '@/components/ui/media-link'
import { socialLinks } from '@/config/mediaLinks'

interface SocialLinksProps {
  className?: string
  iconSize?: number
  vertical?: boolean
}

export function SocialLinks({
  className,
  iconSize = 20,
  vertical = false
}: SocialLinksProps) {
  return (
    <div
      className={`flex ${vertical ? 'flex-col' : ''} gap-4 ${className || ''}`}
    >
      {socialLinks.map((social) => (
        <MediaLink
          key={social.name}
          href={social.url}
          icon={social.icon}
          label={social.name}
          variant="social"
          iconSize={iconSize}
          hideLabel
        />
      ))}
    </div>
  )
}
