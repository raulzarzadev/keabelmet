import React from 'react'
import Link from 'next/link'

interface LinksListProps {
  links: {
    id: string
    title: string
    href: string
    description?: string
  }[]
}

const LinksList: React.FC<LinksListProps> = ({ links }) => {
  return (
    <nav className="links-list">
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.id} className="transition-colors hover:text-primary">
            <Link href={link.href} className="flex flex-col">
              <span className="font-medium">{link.title}</span>
              {link.description && (
                <span className="text-sm text-muted-foreground">
                  {link.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default LinksList
