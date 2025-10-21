import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { createPayloadCategoriesWorkflow } from "../workflows/create-payload-categories";

export default async function categoryCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string;
}>) {
  await createPayloadCategoriesWorkflow(container).run({
    input: {
      category_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: "product-category.created",
};
