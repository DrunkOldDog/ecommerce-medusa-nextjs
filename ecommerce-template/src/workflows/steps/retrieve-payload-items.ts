import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk";
import { PAYLOAD_MODULE } from "../../modules/payload";
import PayloadModuleService from "../../modules/payload/payload.service";

type StepInput = {
  collection: string;
  where: Record<string, any>;
};

export const retrievePayloadItemsStep = createStep(
  "retrieve-payload-items",
  async ({ where, collection }: StepInput, { container }) => {
    const payloadModuleService = container.resolve<PayloadModuleService>(PAYLOAD_MODULE);

    const items = await payloadModuleService.find(collection, {
      where,
    });

    return new StepResponse({
      items: items.docs,
    });
  }
);
