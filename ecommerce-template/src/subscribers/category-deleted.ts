import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { deletePayloadCategoriesWorkflow } from "../workflows/delete-payload-categories";

export default async function categoryDeletedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string;
}>) {
  await deletePayloadCategoriesWorkflow(container).run({
    input: {
      category_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: "product-category.deleted",
};
