import { Module } from "@medusajs/framework/utils";
import PayloadModuleService from "./payload.service";

export const PAYLOAD_MODULE = "payload";

export default Module(PAYLOAD_MODULE, {
  service: PayloadModuleService,
});
