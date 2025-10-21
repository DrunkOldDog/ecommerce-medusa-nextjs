import type { HttpTypes } from "@medusajs/types"
import type { PayloadImageItem, PayloadImage } from "./global"

export type CollectionWithPayload = HttpTypes.StoreCollection & {
  payload_collection?: PayloadCollection
}

export interface PayloadCollection {
  id: string
  title: string
  description: string
  images: PayloadImageItem[]
  thumbnail: PayloadImage | null
  featured: boolean
  handle: string
}
