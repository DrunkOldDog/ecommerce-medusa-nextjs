"use client"

import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Button } from "@medusajs/ui"

type ImageGalleryProps = {
  images: {
    id: string
    url: string
    name: string
  }[]
}

const MotionImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = (index: number) => {
    setCurrentIndex(index)
  }

  const handleMouseEnter = () => {
    // Clear any existing interval when hovering
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleMouseLeave = () => {
    // Start auto-advance when mouse leaves
    startAutoAdvance()
  }

  const startAutoAdvance = () => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Start new interval
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 3000) // 3 seconds between transitions
  }

  // Start auto-advance on mount
  useEffect(() => {
    startAutoAdvance()

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [images.length])

  // Cleanup interval when component unmounts
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const getImageUrl = (image: string) => {
    return image.replace(
      "localhost",
      process.env.NEXT_PUBLIC_BACKEND_CONTAINER_NAME || "backend"
    )
  }

  const getFlexValue = (index: number) => {
    return currentIndex === index ? 3 : 1
  }

  return (
    <div
      className="flex w-full cursor-pointer h-[400px] md:h-[500px] lg:h-[640px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {images.map((image, index) => {
        const isActive = currentIndex === index

        return (
          <motion.div
            key={image.id}
            className="relative overflow-hidden bg-ui-bg-subtle"
            onClick={() => handleClick(index)}
            layout
            initial={{ flex: 1 }}
            animate={{
              flex: getFlexValue(index),
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 25,
                duration: 0.8,
              },
            }}
          >
            <motion.div
              className="relative w-full h-full"
              animate={{
                scale: isActive ? 1.1 : 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 25,
                  duration: 0.8,
                },
              }}
            >
              <Image
                src={getImageUrl(image.url)}
                alt={`Product image ${index + 1}`}
                fill
                sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                className="object-cover"
              />

              {/* Overlay effect */}
              <motion.div
                className="absolute inset-0 bg-black/50"
                animate={{
                  opacity: isActive ? 0.2 : 0.4,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }}
              />

              <AnimatePresence>
                {/* Text Labels */}
                {isActive ? (
                  // Active image - centered content within the image area
                  <motion.div
                    key="active-text"
                    className="absolute inset-0 flex items-center justify-center z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: -20,
                      transition: { duration: 0.4, delay: 0 },
                    }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="text-white text-center space-y-4 max-w-sm">
                      <div>
                        <h3 className="text-3xl font-bold leading-tight mb-1">
                          {image.name}
                        </h3>
                        <p>Explore the collection</p>
                      </div>
                      <Button className="bg-white text-black shadow-sm hover:bg-white/90">
                        Show Now
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  // Inactive images - rotated text aligned to button
                  <motion.div
                    key="inactive-text"
                    className="absolute left-4 bottom-6 transform  z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div
                      className="text-white text-md font-bold uppercase whitespace-nowrap"
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {image.name}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default MotionImageGallery
