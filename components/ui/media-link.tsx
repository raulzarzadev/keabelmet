import React from 'react'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { IconType } from 'react-icons'

export type MediaVariant = 'social' | 'contact'

export interface MediaLinkProps {
  href: string
  icon: LucideIcon | IconType
  label: string
  variant?: MediaVariant
  iconSize?: number
  className?: string
  hideLabel?: boolean
  openInNewTab?: boolean
  onClick?: () => void
}

export function MediaLink({
  href,
  icon: Icon,
  label,
  variant = 'social',
  iconSize = 20,
  className,
  hideLabel = false,
  openInNewTab = true,
  onClick
}: MediaLinkProps) {
  const variantStyles = {
    social: 'hover:text-primary text-gray-600 transition-colors',
    contact:
      'hover:text-primary text-slate-700 flex items-center gap-2 transition-colors'
  }

  return (
    <Link
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noopener noreferrer' : undefined}
      className={cn(
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md',
        variantStyles[variant],
        className
      )}
      aria-label={hideLabel ? label : undefined}
      onClick={onClick}
    >
      <span className="flex items-center gap-2">
        <Icon size={iconSize} />
        {!hideLabel && variant === 'contact' && <span>{label}</span>}
      </span>
    </Link>
  )
}
