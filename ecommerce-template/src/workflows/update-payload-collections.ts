import {
  createWorkflow,
  transform,
  when,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { useQueryGraphStep } from "@medusajs/medusa/core-flows";
import { updatePayloadItemsStep } from "./steps/update-payload-items";

import type { PayloadCollectionItem } from "../modules/payload/payload.types";

type WorkflowInput = {
  collection_ids: string[];
};

export const updatePayloadCollectionsWorkflow = createWorkflow(
  "update-payload-collections",
  ({ collection_ids }: WorkflowInput) => {
    const { data: collections } = useQueryGraphStep({
      entity: "product_collection",
      fields: [
        "id",
        "title",
        "handle",
        "created_at",
        "updated_at",
        "payload_collection.*",
      ],
      filters: {
        id: collection_ids,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });

    const updateData = transform(
      {
        collections,
      },
      (data) => {
        return {
          collection: "collections",
          items: data.collections
            .filter((collection) => {
              const payloadCollection =
                // @ts-ignore
                collection.payload_collection as PayloadCollectionItem;
              return payloadCollection;
            })
            .map((collection) => {
              const payloadCollection =
                // @ts-ignore
                collection.payload_collection as PayloadCollectionItem;
              return {
                id: payloadCollection.id, // Use the Payload collection ID
                medusa_id: collection.id,
                createdAt: collection.created_at as string,
                updatedAt: collection.updated_at as string,
                title: collection.title,
                handle: collection.handle,
              };
            }),
        };
      }
    );

    const result = when(
      { updateData },
      (data) => data.updateData.items.length > 0
    ).then(() => {
      return updatePayloadItemsStep(updateData);
    });

    const items = transform({ result }, (data) => data.result?.items || []);

    return new WorkflowResponse({
      items,
    });
  }
);
