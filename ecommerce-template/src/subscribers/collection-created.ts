import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { createPayloadCollectionsWorkflow } from "../workflows/create-payload-collections";

export default async function productCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string;
}>) {
  await createPayloadCollectionsWorkflow(container).run({
    input: {
      collection_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: "product-collection.created",
};
