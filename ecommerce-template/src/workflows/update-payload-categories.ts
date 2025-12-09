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
  category_ids: string[];
};

export const updatePayloadCategoriesWorkflow = createWorkflow(
  "update-payload-categories",
  ({ category_ids }: WorkflowInput) => {
    const { data: categories } = useQueryGraphStep({
      entity: "product_category",
      fields: [
        "id",
        "name",
        "handle",
        "description",
        "is_active",
        "is_internal",
        "rank",
        "created_at",
        "updated_at",
        "payload_category.*",
      ],
      filters: {
        id: category_ids,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });

    const updateData = transform(
      {
        categories,
      },
      (data) => {
        return {
          collection: "categories",
          items: data.categories
            .filter((category) => {
              const payloadCategory =
                // @ts-ignore
                category.payload_category as PayloadCollectionItem;
              return payloadCategory;
            })
            .map((category) => {
              const payloadCategory =
                // @ts-ignore
                category.payload_category as PayloadCollectionItem;
              return {
                id: payloadCategory.id, // Use the Payload category ID
                medusa_id: category.id,
                createdAt: category.created_at as string,
                updatedAt: category.updated_at as string,
                title: category.name,
                handle: category.handle,
                description: category.description,
                is_active: category.is_active,
                is_internal: category.is_internal,
                rank: category.rank,
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
