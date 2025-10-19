import { Heading, Text } from "@medusajs/ui"
import Image from "next/image"

export default function ProductCategories() {
  const categories = [
    {
      id: "pants",
      name: "Pants",
      description: "Comfortable & stylish bottoms",
      image:
        "http://localhost:9000/static/1760838967964-NP_GARDENINCLUB5144_1000x.webp",
    },
    {
      id: "merch",
      name: "Merch",
      description: "Exclusive branded items",
      image:
        "http://localhost:9000/static/1760838901701-NUDE_ECOMM_DENIM0363_1000x.webp",
    },
    {
      id: "shirts",
      name: "Shirts",
      description: "Classic & modern tops",
      image:
        "http://localhost:9000/static/1760839064388-NUDEPROJECT_NEWINJULY0883_1200x.webp",
    },
    {
      id: "sweatshirts",
      name: "Sweatshirts",
      description: "Cozy & warm essentials",
      image:
        "http://localhost:9000/static/1760834280081-NP_BUSINESS_ECOMM4350copia_b4b72f30-8109-444c-983c-c5c05f7dc9cf_1000x.webp",
    },
  ]

  const getImageUrl = (image: string) => {
    return image.replace(
      "localhost",
      process.env.NEXT_PUBLIC_BACKEND_CONTAINER_NAME || "backend"
    )
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
          <div
            key={category.id}
            className="relative rounded-lg overflow-hidden group cursor-pointer"
          >
            <Image
              src={getImageUrl(category.image)}
              alt={category.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center">
              <Heading level="h3" className="text-white font-bold text-lg mb-2">
                {category.name}
              </Heading>
              <Text className="text-white/90 text-sm">
                {category.description}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
