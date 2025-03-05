import { MediaLink } from '@/components/ui/media-link'
import { contactLinks } from '@/config/mediaLinks'

interface ContactLinksProps {
  className?: string
  iconSize?: number
  hideLabels?: boolean
}

export function ContactLinks({
  className,
  iconSize = 20,
  hideLabels = false
}: ContactLinksProps) {
  return (
    <div className={`flex flex-col gap-3 ${className || ''}`}>
      {contactLinks.map((contact) => (
        <MediaLink
          key={contact.name}
          href={contact.url}
          icon={contact.icon}
          label={contact.value || contact.name}
          variant="contact"
          iconSize={iconSize}
          hideLabel={hideLabels}
        />
      ))}
    </div>
  )
}
