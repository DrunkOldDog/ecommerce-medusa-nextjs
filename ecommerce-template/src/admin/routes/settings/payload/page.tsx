import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Button, Container, Heading, toast } from "@medusajs/ui";
import { useState } from "react";
import { sdk } from "../../../lib/sdk";

const PayloadSettingsPage = () => {
  const [isSyncingProductsToPayload, setIsSyncingProductsToPayload] =
    useState(false);

  const syncProductsToPayload = async (collection: string) => {
    try {
      setIsSyncingProductsToPayload(true);
      await sdk.client.fetch(`/admin/payload/sync/${collection}`, {
        method: "POST",
      });
      toast.success(`Triggered syncing collection data with Payload`);
    } catch (error) {
      toast.error(`Failed to trigger syncing collection data with Payload`);
    } finally {
      setIsSyncingProductsToPayload(false);
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
        <Button
          variant="primary"
          onClick={() => syncProductsToPayload("products")}
          isLoading={isSyncingProductsToPayload}
        >
          Sync Products to Payload
        </Button>
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Payload",
});

export default PayloadSettingsPage;
