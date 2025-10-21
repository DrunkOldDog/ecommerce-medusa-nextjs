"use server"

import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getCacheOptions } from "./cookies"
import {
  CollectionWithPayload,
  PayloadCollection,
} from "types/collection.types"
import {
  parsePayloadImage,
  parsePayloadImageItems,
} from "@lib/util/payload-images"

export const retrieveCollection = async (id: string) => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<{ collection: HttpTypes.StoreCollection }>(
      `/store/collections/${id}`,
      {
        next,
        cache: "force-cache",
      }
    )
    .then(({ collection }) => collection)
}

export const listCollections = async (
  queryParams: HttpTypes.FindParams & HttpTypes.StoreCollectionFilters = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  queryParams.limit = queryParams.limit || 100
  queryParams.offset = queryParams.offset || 0

  return sdk.client
    .fetch<{ collections: HttpTypes.StoreCollection[]; count: number }>(
      "/store/collections",
      {
        query: queryParams,
        next,
        cache: "force-cache",
      }
    )
    .then(({ collections }) => ({ collections, count: collections.length }))
}

export const getPayloadCollections = async (
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreCollectionFilters
): Promise<PayloadCollection[]> => {
  const { collections } = await listCollections({
    fields: "id, title, description, handle, featured, *payload_collection",
    ...queryParams,
  })

  return collections.map((collection: CollectionWithPayload) => {
    return {
      id: collection.id,
      title: collection.payload_collection?.title || collection.title,
      handle: collection.payload_collection?.handle || collection.handle,
      description: collection.payload_collection?.description || "",
      featured: collection.payload_collection?.featured || false,
      thumbnail: collection.payload_collection?.thumbnail
        ? parsePayloadImage(collection.payload_collection.thumbnail)
        : null,
      images: collection.payload_collection?.images
        ? parsePayloadImageItems(collection.payload_collection.images)
        : [],
    }
  })
}

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection> => {
  const next = {
    ...(await getCacheOptions("collections")),
  }

  return sdk.client
    .fetch<HttpTypes.StoreCollectionListResponse>(`/store/collections`, {
      query: { handle, fields: "*products" },
      next,
      cache: "force-cache",
    })
    .then(({ collections }) => collections[0])
}
