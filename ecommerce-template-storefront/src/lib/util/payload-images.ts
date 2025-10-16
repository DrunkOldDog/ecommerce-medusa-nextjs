import type { StoreProductWithPayload } from "../../types/global"

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
