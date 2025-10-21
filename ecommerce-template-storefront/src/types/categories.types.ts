import type { HttpTypes } from "@medusajs/types"
import type { PayloadImageItem } from "./global"

export type ProductCategoryWithPayload = HttpTypes.StoreProductCategory & {
  payload_category?: PayloadCategory
}

export interface PayloadCategory {
  id: string
  title: string
  description: string
  images: PayloadImageItem[]
  handle: string
}
