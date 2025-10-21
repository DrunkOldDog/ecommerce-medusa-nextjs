import { listProducts } from "@lib/data/products"
import { FeaturedTitle } from "./featured-title"
import { MotionImageGallery } from "@modules/products/components/motion-image-gallery"

import type { HttpTypes } from "@medusajs/types"
import type { PayloadCollection } from "types/collection.types"

interface FeaturedCollectionProps {
  collection: PayloadCollection
  region: HttpTypes.StoreRegion
}

export default async function FeaturedCollection({
  collection,
  region,
}: FeaturedCollectionProps) {
  const {
    response: { products: defaultProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      collection_id: collection.id,
    },
  })

  if (!defaultProducts) {
    return null
  }

  const products = defaultProducts.slice(0, 4)

  return (
    <div>
      <FeaturedTitle title={collection.title} />

      <MotionImageGallery
        products={products}
        collectionHandle={collection.handle}
      />
    </div>
  )
}
