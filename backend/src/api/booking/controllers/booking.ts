/**
 * booking controller
 */

import { factories } from "@strapi/strapi";

function generatePatientId(name: string, phone: string, id: number): string {
  // First word of name, alpha chars only
  const firstName = name.trim().split(" ")[0].replace(/[^a-zA-Z]/g, "");
  // Last 4 digits of phone
  const last4 = phone.replace(/\D/g, "").slice(-4);
  return `${firstName}${last4}-${id}`;
}

export default factories.createCoreController(
  "api::booking.booking",
  ({ strapi }) => ({
    async create(ctx) {
      const { parent_name, phone_number } = ctx.request.body?.data || {};

      // Step 1: Create the record (patient_id will be null initially)
      const response = await super.create(ctx);

      // Step 2: Update patient_id now that we have the record's id
      const createdId = response?.data?.id;
      if (createdId) {
        const patient_id = generatePatientId(
          parent_name || "",
          phone_number || "",
          createdId
        );
        await strapi.entityService.update("api::booking.booking", createdId, {
          data: { patient_id },
        });
        // Patch into the response so it reflects the correct value
        if (response.data?.attributes) {
          response.data.attributes.patient_id = patient_id;
        }
      }

      return response;
    },
  })
);


