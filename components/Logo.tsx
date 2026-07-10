import Link from "next/link"

export function LogoMark() {
  return (
    <span className="logo-mark">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" fill="#304542" />
        <g fill="#1c2f2d" opacity="0.4" transform="translate(1.4,2)">
          <rect x="26.5" y="20" width="17.5" height="60" rx="7" />
          <path d="M44 45 C50 41,58 35,66 28 C72 23,76 20,78.5 18 C80 17,81 18.5,79.5 20.5 C74 26,66 33,58 40 C52 45,47 48,44 50 Z" />
          <path d="M44 55 C50 58,60 63,68 68 C74 72,78 75,79.5 78 C80.5 80.5,77.5 82,75 80.5 C68 77,60 72,52 66 C47 62,44 59,44 56 Z" />
        </g>
        <rect x="26.5" y="20" width="17.5" height="60" rx="7" fill="#f7f3ea" />
        <path d="M44 45 C50 41,58 35,66 28 C72 23,76 20,78.5 18 C80 17,81 18.5,79.5 20.5 C74 26,66 33,58 40 C52 45,47 48,44 50 Z" fill="#f7f3ea" />
        <path d="M44 55 C50 58,60 63,68 68 C74 72,78 75,79.5 78 C80.5 80.5,77.5 82,75 80.5 C68 77,60 72,52 66 C47 62,44 59,44 56 Z" fill="#f7f3ea" />
      </svg>
    </span>
  )
}

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo">
      <LogoMark />
      KEA<span className="accent">BEL</span>MET
    </Link>
  )
}
