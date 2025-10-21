import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deletePayloadItemsStep } from "./steps/delete-payload-items";

type WorkflowInput = {
  collection_ids: string[];
};

export const deletePayloadCollectionsWorkflow = createWorkflow(
  "delete-payload-collections",
  ({ collection_ids }: WorkflowInput) => {
    const deleteCollectionsData = transform(
      {
        collection_ids,
      },
      (data) => {
        return {
          collection: "collections",
          where: {
            medusa_id: {
              in: data.collection_ids.join(","),
            },
          },
        };
      }
    );

    deletePayloadItemsStep(deleteCollectionsData);

    return new WorkflowResponse(void 0);
  }
);
