import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { createPayloadItemsStep } from "./steps/create-payload-items";
import {
  updateCollectionsWorkflow,
  useQueryGraphStep,
} from "@medusajs/medusa/core-flows";

type WorkflowInput = {
  collection_ids: string[];
};

export const createPayloadCollectionsWorkflow = createWorkflow(
  "create-payload-collections",
  (input: WorkflowInput) => {
    const { data: collections } = useQueryGraphStep({
      entity: "product_collection",
      fields: [
        "id",
        "title",
        "handle",
        "created_at",
        "updated_at",
      ],
      filters: {
        id: input.collection_ids,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });

    const createData = transform(
      {
        collections,
      },
      (data) => {
        return {
          collection: "collections",
          items: data.collections.map((collection) => ({
            medusa_id: collection.id,
            createdAt: collection.created_at as string,
            updatedAt: collection.updated_at as string,
            title: collection.title,
            handle: collection.handle,
          })),
        };
      }
    );

    const { items } = createPayloadItemsStep(createData);

    updateCollectionsWorkflow.runAsStep({
      input: {
        selector: {
          id: input.collection_ids,
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
