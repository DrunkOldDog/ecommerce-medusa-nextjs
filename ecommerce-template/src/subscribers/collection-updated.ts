import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { updatePayloadCollectionsWorkflow } from "../workflows/update-payload-collections";

export default async function productVariantUpdatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string;
}>) {
  await updatePayloadCollectionsWorkflow(container).run({
    input: {
      collection_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: "product-collection.updated",
};
