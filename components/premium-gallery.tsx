"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useSwipeable } from "react-swipeable"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  story: string
}

interface PremiumGalleryProps {
  images: GalleryImage[]
}

export function PremiumGallery({ images }: PremiumGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Bloquear el scroll cuando el modal está abierto
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedIndex])

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
    setDirection(0)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
    setIsZooming(false)
  }

  const navigateImage = (newDirection: number) => {
    if (selectedIndex === null || isZooming) return

    setDirection(newDirection)

    const newIndex = selectedIndex + newDirection
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedIndex(newIndex)
    }
  }

  const toggleZoom = () => {
    setIsZooming(!isZooming)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => navigateImage(1),
    onSwipedRight: () => navigateImage(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-square overflow-hidden rounded-2xl shadow-lg border border-white/20 cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => openLightbox(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-sm font-medium line-clamp-2">{image.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            ref={modalRef}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors z-10"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Swipeable area */}
            <div
              className="relative w-full h-full flex flex-col items-center justify-center px-4 md:px-12"
              onClick={(e) => e.stopPropagation()}
              {...handlers}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 100 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="w-full max-w-5xl flex flex-col items-center"
                >
                  {/* Image container with white border */}
                  <div
                    className={`relative w-full max-w-4xl overflow-hidden rounded-lg border border-white/20 shadow-2xl ${
                      isZooming ? "cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleZoom()
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: isZooming ? 1.5 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="relative aspect-[4/3] w-full"
                    >
                      <Image
                        src={images[selectedIndex].src || "/placeholder.svg"}
                        alt={images[selectedIndex].alt}
                        fill
                        sizes="(max-width: 1024px) 90vw, 1200px"
                        className="object-contain"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Story text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-6 max-w-2xl text-center px-4"
                  >
                    <p className="text-white/90 text-lg md:text-xl italic font-light">{images[selectedIndex].story}</p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-6 md:px-10">
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage(-1)
                  }}
                  disabled={selectedIndex === 0}
                  style={{ opacity: selectedIndex === 0 ? 0.5 : 1 }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-black/30 text-white backdrop-blur-sm transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage(1)
                  }}
                  disabled={selectedIndex === images.length - 1}
                  style={{ opacity: selectedIndex === images.length - 1 ? 0.5 : 1 }}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Image counter */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm">
                  {selectedIndex + 1} / {images.length}
                </div>
              </div>
              {/* Mobile swipe instruction */}
              <div className="absolute bottom-16 left-0 right-0 text-center text-white/60 text-sm md:hidden">
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
