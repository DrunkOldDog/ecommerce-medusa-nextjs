import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { createPayloadCollectionsWorkflow } from "../workflows/create-payload-collections";

export default async function collectionsSyncPayloadHandler({
  container,
}: SubscriberArgs) {
  const query = container.resolve("query");

  const limit = 1000;
  let offset = 0;
  let count = 0;

  do {
    const { data: collections, metadata: { count: totalCount } = {} } =
      await query.graph({
        entity: "product_collection",
        fields: ["id", "metadata"],
        pagination: {
          take: limit,
          skip: offset,
        },
      });

    count = totalCount || 0;
    offset += limit;
    const filteredCollections = collections.filter(
      (collection) => !collection.metadata?.payload_id
    );

    if (filteredCollections.length === 0) {
      break;
    }

    await createPayloadCollectionsWorkflow(container).run({
      input: {
        collection_ids: filteredCollections.map((collection) => collection.id),
      },
    });
  } while (count > offset + limit);
}

export const config: SubscriberConfig = {
  event: `collections.sync-payload`,
};
