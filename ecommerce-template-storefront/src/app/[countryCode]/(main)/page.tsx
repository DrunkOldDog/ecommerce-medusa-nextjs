import { Metadata } from "next"

import FeaturedCollectionGrid from "@modules/home/components/featured-collection-grid"
import Hero from "@modules/home/components/hero"
import { getPayloadCollections } from "@lib/data/collections"
import FeaturedCollection from "@modules/collections/components/featured-collection"
import ProductCategories from "@modules/home/components/product-categories"
import { getPayloadCategories } from "@lib/data/categories"
import { PayloadCollection } from "types/collection.types"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 15 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params

  const region = await getRegion(countryCode)
  const productCategories = await getPayloadCategories()
  const payloadCollections = await getPayloadCollections()

  const { featuredCollection, collections } = payloadCollections.reduce(
    (acc, collection) => {
      if (collection.featured) {
        acc.featuredCollection = collection
      } else {
        acc.collections.push(collection)
      }
      return acc
    },
    {
      featuredCollection: {} as PayloadCollection,
      collections: [] as PayloadCollection[],
    }
  )

  return (
    <>
      <div className="-mt-16">
        <Hero />
      </div>

      <div className="flex flex-col gap-y-16">
        {region && (
          <FeaturedCollection collection={featuredCollection} region={region} />
        )}

        <FeaturedCollectionGrid collections={collections} />

        <ProductCategories categories={productCategories} />
      </div>
    </>
  )
}
