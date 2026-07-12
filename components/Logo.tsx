import Link from "next/link"
import Image from "next/image"

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="logo">
      <span className="logo-mark" style={{ borderRadius: "50%", overflow: "hidden" }}>
        <Image src="/logo.png" alt="Keabelmet" width={34} height={34} />
      </span>
      Keabelmet
    </Link>
  )
}
