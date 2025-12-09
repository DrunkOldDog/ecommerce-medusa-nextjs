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
  product_ids: string[];
};

export const updatePayloadProductsWorkflow = createWorkflow(
  "update-payload-products",
  ({ product_ids }: WorkflowInput) => {
    const { data: products } = useQueryGraphStep({
      entity: "product",
      fields: [
        "id",
        "title",
        "handle",
        "subtitle",
        "description",
        "created_at",
        "updated_at",
        "options.*",
        "variants.*",
        "variants.options.*",
        "thumbnail",
        "images.*",
        "payload_product.*",
      ],
      filters: {
        id: product_ids,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });

    const updateData = transform(
      {
        products,
      },
      (data) => {
        return {
          collection: "products",
          items: data.products
            .filter((product) => {
              const payloadProduct =
                // @ts-ignore
                product.payload_product as PayloadCollectionItem;
              return payloadProduct;
            })
            .map((product) => {
              const payloadProduct =
                // @ts-ignore
                product.payload_product as PayloadCollectionItem;
              return {
                id: payloadProduct.id, // Use the Payload product ID
                medusa_id: product.id,
                createdAt: product.created_at as string,
                updatedAt: product.updated_at as string,
                title: product.title,
                handle: product.handle,
                subtitle: product.subtitle,
                description: product.description || "",
                options: product.options.map((option) => ({
                  title: option.title,
                  medusa_id: option.id,
                })),
                variants: product.variants.map((variant) => ({
                  title: variant.title,
                  medusa_id: variant.id,
                  option_values: variant.options.map((option) => ({
                    medusa_id: option.id,
                    medusa_option_id: option.option?.id,
                    value: option.value,
                  })),
                })),
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
