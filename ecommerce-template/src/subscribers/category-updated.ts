import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { updatePayloadCategoriesWorkflow } from "../workflows/update-payload-categories";

export default async function categoryUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string;
}>) {
  await updatePayloadCategoriesWorkflow(container).run({
    input: {
      category_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: "product-category.updated",
};
