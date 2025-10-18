import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { MotionImageGallery } from "@modules/products/components/motion-image-gallery"
import FeaturedTitle from "@modules/collections/components/featured-title/FeaturedTitle.component"

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

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <div className="-mt-16">
        <Hero />
      </div>

      <div>
        {/* <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul> */}

        <FeaturedTitle />

        <MotionImageGallery
          images={[
            {
              id: "1",
              name: "Chandal Rodeo Tee",
              url: "http://backend:9000/static/1760540293874-511543504_18508861954001158_2024859792835374283_n.jpg",
            },
            {
              id: "2",
              name: "Chandal Rodeo Pinky Promise",
              url: "http://backend:9000/static/1760540455408-496236541_18499111396001158_4355818629480426480_n.jpg",
            },
            {
              id: "3",
              name: "Chandal Soccer Jersey",
              url: "http://backend:9000/static/1760541940332-IMG_4286_3591x4489.webp",
            },
            {
              id: "4",
              name: "Join the Chandal Family",
              url: "http://backend:9000/static/1760540293875-503110423_1473135363676668_5399906251157081470_n.jpg",
            },
          ]}
        />
      </div>
    </>
  )
}
