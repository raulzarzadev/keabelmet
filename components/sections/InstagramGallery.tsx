import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"
import type { InstagramPost } from "@/lib/instagram"

interface InstagramGalleryProps {
  posts: InstagramPost[]
  title: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  instagramUrl: string
  followText: string
}

export default function InstagramGallery({
  posts, title, subtitle, ctaText, ctaHref, instagramUrl, followText,
}: InstagramGalleryProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{title}</h2>
          {subtitle && <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl group cursor-pointer"
            >
              <Image
                src={post.mediaType === "VIDEO" ? (post.thumbnailUrl || post.mediaUrl) : post.mediaUrl}
                alt={post.caption?.slice(0, 100) || "Keabelmet Expeditions"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              {post.mediaType === "VIDEO" && (
                <div className="absolute top-3 right-3 bg-black/60 rounded-full p-1.5">
                  <Play className="h-4 w-4 text-white fill-white" />
                </div>
              )}
              {post.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm line-clamp-2">{post.caption}</p>
                </div>
              )}
            </a>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          {ctaText && ctaHref && (
            <Link href={ctaHref} className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-6 py-3 font-medium text-white hover:bg-teal-800 transition-colors">
              {ctaText}
            </Link>
          )}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            {followText}
          </a>
        </div>
      </div>
    </section>
  )
}
