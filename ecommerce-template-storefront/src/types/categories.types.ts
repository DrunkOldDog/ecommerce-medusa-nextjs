import type { HttpTypes } from "@medusajs/types"
import type { PayloadImage } from "./global"

export type ProductCategoryWithPayload = HttpTypes.StoreProductCategory & {
  payload_category?: PayloadCategory
}

export interface PayloadCategory {
  id: string
  title: string
  description: string
  images: { id: string; image: PayloadImage }[]
  handle: string
}
