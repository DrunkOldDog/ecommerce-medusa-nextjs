import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { deletePayloadItemsStep } from "./steps/delete-payload-items";

type WorkflowInput = {
  category_ids: string[];
};

export const deletePayloadCategoriesWorkflow = createWorkflow(
  "delete-payload-categories",
  ({ category_ids }: WorkflowInput) => {
    const deleteCategoriesData = transform(
      {
        category_ids,
      },
      (data) => {
        return {
          collection: "categories",
          where: {
            medusa_id: {
              in: data.category_ids.join(","),
            },
          },
        };
      }
    );

    deletePayloadItemsStep(deleteCategoriesData);

    return new WorkflowResponse(void 0);
  }
);
