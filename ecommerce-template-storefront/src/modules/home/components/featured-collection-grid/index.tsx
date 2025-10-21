import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

import type { PayloadCollection } from "types/collection.types"

interface FeaturedCollectionGridProps {
  collections: PayloadCollection[]
}

export default async function FeaturedCollectionGrid({
  collections: defaultCollections,
}: FeaturedCollectionGridProps) {
  const collections = defaultCollections.slice(0, 3)

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

          return (
            <LocalizedClientLink
              href={`/collections/${collection.handle}`}
              key={collection.id}
              className={`
                  ${isFirst ? "row-span-2" : ""} 
                  relative rounded-lg overflow-hidden group cursor-pointer
                `}
            >
              {collection.thumbnail && (
                <Image
                  src={collection.thumbnail.url}
                  alt={collection.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}

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
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}
