import { Heading, Text } from "@medusajs/ui"

import type { HttpTypes } from "@medusajs/types"
import Image from "next/image"

export default async function FeaturedCollectionGrid({
  collections,
}: {
  collections: HttpTypes.StoreCollection[]
}) {
  return (
    <div className="content-container">
      <div className="mb-6">
        <Text className="text-sm font-semibold uppercase tracking-tight text-gray-400">
          DEALS
        </Text>
        <Heading level="h3" className="text-2xl font-bold">
          Our Favorite Collections
        </Heading>
      </div>

      <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[620px]">
        {collections.map((collection, index) => {
          const isFirst = index === 0

          // Fallback images array (same as MotionImageGallery)
          const fallbackImages = [
            "http://localhost:9000/static/1760580823373-3311210921_OFF_WHITE_REMERA_MAGAZINE_1620.webp",
            "http://localhost:9000/static/1760834205954-img_0967-cf2e60962467a7cbab17594162762155-1024-1024.jpg",
            "http://localhost:9000/static/1760834280081-NP_BUSINESS_ECOMM4350copia_b4b72f30-8109-444c-983c-c5c05f7dc9cf_1000x.webp",
          ]

          const getImageUrl = (image: string) => {
            return image.replace(
              "localhost",
              process.env.NEXT_PUBLIC_BACKEND_CONTAINER_NAME || "backend"
            )
          }

          const imageUrl = getImageUrl(
            fallbackImages[index] || fallbackImages[0]
          )

          return (
            <div
              key={collection.id}
              className={`
                  ${isFirst ? "row-span-2" : ""} 
                  relative rounded-lg overflow-hidden group cursor-pointer
                `}
            >
              <Image
                src={imageUrl}
                alt={collection.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center">
                <Text className="text-sm text-white/80 mb-2 uppercase tracking-wide">
                  {isFirst ? "Featured" : index === 1 ? "Trending" : "New"}
                </Text>
                <Heading
                  level={isFirst ? "h2" : "h3"}
                  className={`text-white font-bold ${
                    isFirst ? "text-2xl" : "text-lg"
                  }`}
                >
                  {collection.title}
                </Heading>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
