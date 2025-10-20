import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework";
import { createPayloadCategoriesWorkflow } from "../workflows/create-payload-categories";

export default async function collectionsSyncPayloadHandler({
  container,
}: SubscriberArgs) {
  const query = container.resolve("query");

  const limit = 1000;
  let offset = 0;
  let count = 0;

  do {
    const { data: categories, metadata: { count: totalCount } = {} } =
      await query.graph({
        entity: "product_category",
        fields: ["id", "metadata"],
        pagination: {
          take: limit,
          skip: offset,
        },
      });

    count = totalCount || 0;
    offset += limit;
    const filteredCategories = categories.filter(
      (category) => !category.metadata?.payload_id
    );

    if (filteredCategories.length === 0) {
      break;
    }

    await createPayloadCategoriesWorkflow(container).run({
      input: {
        category_ids: filteredCategories.map((category) => category.id),
      },
    });
  } while (count > offset + limit);
}

export const config: SubscriberConfig = { event: `categories.sync-payload` };
