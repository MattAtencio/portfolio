"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react"

export interface Screenshot {
  src: string
  alt: string
  caption?: string
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[]
}

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [index, setIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const count = screenshots.length
  const mod = (n: number) => ((n % count) + count) % count

  const next = useCallback(() => setIndex((i) => mod(i + 1)), [count]) // eslint-disable-line react-hooks/exhaustive-deps
  const prev = useCallback(() => setIndex((i) => mod(i - 1)), [count]) // eslint-disable-line react-hooks/exhaustive-deps
  const openLightbox = () => setLightbox(true)
  const closeLightbox = useCallback(() => setLightbox(false), [])

  // Keyboard navigation — always active for the carousel, also works for the lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next()
      else if (e.key === "ArrowLeft") prev()
      else if (e.key === "Escape" && lightbox) closeLightbox()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [next, prev, lightbox, closeLightbox])

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (!lightbox) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox])

  if (count === 0) return null

  const current = screenshots[index]

  // 5-slot coverflow: [-2, -1, 0, +1, +2]
  // All slots use aspect-[16/10] so heights align with the screenshot dimensions.
  const slots = [-2, -1, 0, 1, 2].map((offset) => {
    const i = mod(index + offset)
    const shot = screenshots[i]
    const abs = Math.abs(offset)
    const config =
      abs === 0
        ? { height: "h-full", opacity: "opacity-100", z: "z-30" }
        : abs === 1
        ? { height: "h-[78%]", opacity: "opacity-70", z: "z-20" }
        : { height: "h-[62%]", opacity: "opacity-35", z: "z-10" }
    return { offset, i, shot, ...config }
  })

  return (
    <>
      {/* Carousel — full-bleed, breaks out of the parent max-w container */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <div className="relative mx-auto flex h-[min(18vw,220px)] max-w-[1800px] items-center justify-center gap-3 overflow-hidden px-4 sm:h-[min(16vw,210px)]">
          {slots.map(({ offset, i, shot, height, opacity, z }) => {
            const isCenter = offset === 0
            // Each slot is aspect-[16/10]; width follows from its height.
            const commonClass = `relative ${height} ${opacity} ${z} aspect-[16/10] shrink-0 overflow-hidden rounded-lg border border-border bg-card transition-all duration-300`
            if (isCenter) {
              return (
                <motion.button
                  key={`center-${shot.src}`}
                  type="button"
                  onClick={openLightbox}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  aria-label="Open full-size"
                  className={`group ${commonClass} shadow-2xl`}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/40 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-md bg-background/80 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
                      <Expand className="h-3.5 w-3.5" />
                      Click to expand
                    </span>
                  </div>
                </motion.button>
              )
            }
            // Hide outermost (±2) below md breakpoint to avoid crowding
            const hideOnMobile = Math.abs(offset) === 2 ? "hidden md:block" : ""
            return (
              <button
                key={`${offset}-${i}-${shot.src}`}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Jump to screenshot ${i + 1}`}
                className={`${commonClass} ${hideOnMobile} hover:opacity-90`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </button>
            )
          })}
        </div>

        {/* Arrow controls (always visible, useful on mobile where peeks are hidden) */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-background/70 p-2 text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* Caption + dots */}
      <div className="mt-4 flex flex-col items-center gap-3">
        {current.caption && (
          <p className="text-center text-sm text-muted-foreground">
            {current.caption}
          </p>
        )}
        {count > 1 && (
          <div className="flex items-center gap-2">
            {screenshots.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                }`}
              />
            ))}
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          {index + 1} / {count}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 sm:p-8"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                closeLightbox()
              }}
              className="absolute right-4 top-4 rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.figure
              key={current.src}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative max-h-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={current.src}
                alt={current.alt}
                className="max-h-[85vh] w-auto rounded-lg border border-border object-contain shadow-2xl"
              />
              {current.caption && (
                <figcaption className="mt-3 text-center text-sm text-muted-foreground">
                  {current.caption}
                </figcaption>
              )}
              <div className="mt-2 text-center text-xs text-muted-foreground">
                {index + 1} / {count}
              </div>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
