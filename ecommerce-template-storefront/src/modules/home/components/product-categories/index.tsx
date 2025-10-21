import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"

import type { PayloadCategory } from "types/categories.types"

interface ProductCategoriesProps {
  categories: PayloadCategory[]
}

export default function ProductCategories({
  categories,
}: ProductCategoriesProps) {
  const getImageUrl = (image: string) => {
    // Always using the Payload URL as Medusa categories are not used to serve images
    return `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}${image}`
  }

  return (
    <div className="content-container">
      <div className="mb-6">
        <Text className="text-sm font-semibold uppercase tracking-tight text-gray-400">
          SHOP BY CATEGORY
        </Text>
        <Heading level="h3" className="text-2xl font-bold">
          Browse Our Categories
        </Heading>
      </div>

      <div className="grid grid-cols-4 gap-4 h-[500px]">
        {categories.map((category) => (
          <LocalizedClientLink
            href={`/categories/${category.handle}`}
            key={category.id}
            className="relative rounded-lg overflow-hidden group cursor-pointer"
          >
            {category.images[0]?.image.url && (
              <Image
                src={getImageUrl(category.images[0].image.url)}
                alt={category.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center">
              <Heading level="h3" className="text-white font-bold text-lg mb-2">
                {category.title}
              </Heading>
              <Text className="text-white/90 text-sm">
                {category.description}
              </Text>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}
