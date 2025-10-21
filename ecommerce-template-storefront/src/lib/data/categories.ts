import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"

import type {
  PayloadCategory,
  ProductCategoryWithPayload,
} from "types/categories.types"

export const listCategories = async (query?: Record<string, any>) => {
  const next = {
    ...(await getCacheOptions("categories")),
  }

  const limit = query?.limit || 100

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category, *payload_category",
          limit,
          ...query,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getPayloadCategories = async (): Promise<PayloadCategory[]> => {
  const categories = await listCategories({
    fields:
      "id, title, description, handle, *payload_category, *payload_category.images",
  })

  return categories.map((category: ProductCategoryWithPayload) => {
    return {
      id: category.id,
      title: category.payload_category?.title || category.name,
      handle: category.payload_category?.handle || category.handle,
      description:
        category.payload_category?.description || category.description,
      images: category.payload_category?.images || [],
    }
  })
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const next = {
    ...(await getCacheOptions("categories")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products",
          handle,
        },
        next,
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
