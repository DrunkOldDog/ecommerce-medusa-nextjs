import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { deletePayloadCollectionsWorkflow } from "../workflows/delete-payload-collections";

export default async function productDeletedHandler({
  event: { data },
  container,
}: SubscriberArgs<{
  id: string;
}>) {
  await deletePayloadCollectionsWorkflow(container).run({
    input: {
      collection_ids: [data.id],
    },
  });
}

export const config: SubscriberConfig = {
  event: "product-collection.deleted",
};
