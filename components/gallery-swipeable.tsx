"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useSwipeable } from "react-swipeable"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

interface GalleryImage {
  src: string
  alt: string
}

interface GallerySwipeableProps {
  images: GalleryImage[]
}

export function GallerySwipeable({ images }: GallerySwipeableProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (newDirection: number) => {
    if (selectedIndex === null) return

    setDirection(newDirection)

    const newIndex = selectedIndex + newDirection
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedIndex(newIndex)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateImage(1),
    onSwipedRight: () => navigateImage(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  })

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") navigateImage(1)
    if (e.key === "ArrowLeft") navigateImage(-1)
  }

  return (
    <>
      {/* Grid Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
          >
            <X className="h-6 w-6" />
          </button>

          {/* Swipeable area */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            {...handlers}
          >
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={selectedIndex}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction < 0 ? 300 : -300 }}
                transition={{ duration: 0.3 }}
                className="absolute w-full max-w-4xl px-4 flex items-center justify-center"
              >
                <Image
                  src={images[selectedIndex].src || "/placeholder.svg"}
                  alt={images[selectedIndex].alt}
                  width={1200}
                  height={800}
                  className="max-h-[85vh] w-auto object-contain"
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === selectedIndex ? "bg-white" : "bg-white/40"}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    setDirection(index > selectedIndex ? 1 : -1)
                    setSelectedIndex(index)
                  }}
                />
              ))}
            </div>

            {/* Navigation arrows */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-6">
              <button
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage(-1)
                }}
                disabled={selectedIndex === 0}
                style={{ opacity: selectedIndex === 0 ? 0.5 : 1 }}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white"
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage(1)
                }}
                disabled={selectedIndex === images.length - 1}
                style={{ opacity: selectedIndex === images.length - 1 ? 0.5 : 1 }}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Swipe instruction (mobile only) */}
            <div className="absolute bottom-12 left-0 right-0 text-center text-white/70 text-sm md:hidden">
              Desliza para ver más imágenes
            </div>
          </div>
        </div>
      )}
    </>
  )
}
