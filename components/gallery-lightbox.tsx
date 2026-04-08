"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  featured?: boolean
}

interface GalleryLightboxProps {
  images: GalleryImage[]
}

export function GalleryLightbox({ images }: GalleryLightboxProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedImage(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction: "next" | "prev") => {
    if (selectedImage === null) return

    if (direction === "next") {
      setSelectedImage((selectedImage + 1) % images.length)
    } else {
      setSelectedImage((selectedImage - 1 + images.length) % images.length)
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") navigateImage("next")
    if (e.key === "ArrowLeft") navigateImage("prev")
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg cursor-pointer ${
              image.featured ? "md:col-span-2 md:row-span-2" : ""
            }`}
            onClick={() => openLightbox(index)}
          >
            <div className={`${image.featured ? "aspect-square md:aspect-auto md:h-full" : "aspect-square"}`}>
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
            onClick={closeLightbox}
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative w-full max-w-5xl max-h-[90vh] px-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-full">
              <Image
                src={images[selectedImage].src || "/placeholder.svg"}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="mx-auto max-h-[85vh] w-auto object-contain"
              />
            </div>

            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
              <button
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("prev")
                }}
              >
                &#10094;
              </button>
              <button
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage("next")
                }}
              >
                &#10095;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
