import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createPayloadItemsStep } from "./steps/create-payload-items";
import {
  updateProductCategoriesWorkflow,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows";

type WorkflowInput = {
  category_ids: string[];
};

export const createPayloadCategoriesWorkflow = createWorkflow(
  "create-payload-categories",
  (input: WorkflowInput) => {
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
      ],
      filters: {
        id: input.category_ids,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });

    const createData = transform(
      {
        categories,
      },
      (data) => {
        return {
          collection: "categories",
          items: data.categories.map((category) => ({
            medusa_id: category.id,
            createdAt: category.created_at as string,
            updatedAt: category.updated_at as string,
            title: category.name,
            handle: category.handle,
            description: category.description,
            is_active: category.is_active,
            is_internal: category.is_internal,
            rank: category.rank,
          })),
        };
      }
    );

    const { items } = createPayloadItemsStep(createData);

    updateProductCategoriesWorkflow.runAsStep({
      input: {
        selector: {
          id: input.category_ids,
        },
        update: {
          metadata: createData,
        },
      },
    });

    return new WorkflowResponse({
      items,
    });
  }
);
