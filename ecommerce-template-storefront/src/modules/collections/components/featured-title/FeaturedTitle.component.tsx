"use client"

import { motion } from "motion/react"
import { Oswald } from "next/font/google"

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export default function FeaturedTitle() {
  const scrollVariants = {
    loop: {
      x: ["100%", "-100%"],
      transition: {
        duration: 15,
        ease: "linear" as const,
        repeat: Infinity,
        times: [0, 1],
      },
    },
  }

  const ScrollItem = () => (
    <motion.div
      variants={scrollVariants}
      style={{ fontFamily: oswald.style.fontFamily }}
      animate="loop"
      className="flex h-full w-full items-center justify-center align-middle gap-8 whitespace-nowrap px-8 py-1 text-6xl"
    >
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={`header-item-${index}`} className="flex gap-4">
          <span
            className="font-black uppercase tracking-tight text-white"
            style={{ WebkitTextStroke: "2px rgba(75, 85, 99, 0.6)" }}
          >
            NEW
          </span>
          <span className="font-black uppercase tracking-tight text-gray-800">
            CHANDAL COLLECTION
          </span>
        </div>
      ))}
    </motion.div>
  )

  return (
    <div className="relative w-full overflow-hidden">
      <ScrollItem />
      {/* <ScrollItem /> */}
    </div>
  )
}
