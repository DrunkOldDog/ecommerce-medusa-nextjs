import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Button, Container, Heading, toast } from "@medusajs/ui";
import { useState } from "react";
import { sdk } from "../../../lib/sdk";

const PayloadSettingsPage = () => {
  const [isSyncingCollectionsToPayload, setIsSyncingCollectionsToPayload] =
    useState(false);

  const syncCollectionToPayload = async (collection: string) => {
    try {
      setIsSyncingCollectionsToPayload(true);
      await sdk.client.fetch(`/admin/payload/sync/${collection}`, {
        method: "POST",
      });
      toast.success(`Triggered syncing ${collection} data with Payload`);
    } catch (error) {
      toast.error(`Failed to trigger syncing ${collection} data with Payload`);
    } finally {
      setIsSyncingCollectionsToPayload(false);
    }
  };

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Payload Settings</Heading>
      </div>
      <div className="flex flex-col gap-4 px-6 py-4">
        <p>
          This page allows you to trigger syncing your Medusa data with Payload.
          It will only create items not in Payload.
        </p>

        <div className="flex gap-4">
          <Button
            variant="primary"
            onClick={() => syncCollectionToPayload("products")}
            isLoading={isSyncingCollectionsToPayload}
          >
            Sync Products to Payload
          </Button>

          <Button
            variant="primary"
            onClick={() => syncCollectionToPayload("collections")}
            isLoading={isSyncingCollectionsToPayload}
          >
            Sync Collections to Payload
          </Button>
        </div>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Payload",
});

export default PayloadSettingsPage;
