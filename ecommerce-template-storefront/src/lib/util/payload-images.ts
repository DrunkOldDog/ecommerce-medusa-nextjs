import type {
  PayloadImage,
  PayloadImageItem,
  StoreProductWithPayload,
} from "../../types/global"

export function getProductImages(product: StoreProductWithPayload) {
  const payloadImages =
    product?.payload_product?.images?.map((image) => ({
      id: image.id,
      url: formatPayloadImageUrl(image.image.url),
    })) || []

  return payloadImages.length > 0 ? payloadImages : product.images || []
}

export function formatPayloadImageUrl(url: string): string {
  return url.replace(/^\/api\/media\/file/, "")
}

export function getPayloadImage(url: string): string {
  // Check if the image is from Medusa
  if (url.includes("localhost")) {
    return url.replace(
      "localhost",
      process.env.NEXT_PUBLIC_BACKEND_CONTAINER_NAME || "backend"
    )
  }

  // If the image is from Payload, return the full URL
  return `${process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL}${url}`
}

export function parsePayloadImage(image: PayloadImage): PayloadImage {
  return {
    ...image,
    url: getPayloadImage(image.url),
    thumbnailURL: getPayloadImage(image.thumbnailURL),
  }
}

export function parsePayloadImageItems(
  imageItems: PayloadImageItem[]
): PayloadImageItem[] {
  return imageItems.map((imageItem) => ({
    ...imageItem,
    image: parsePayloadImage(imageItem.image),
  }))
}
