import { z } from "zod";

export const pricingSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  price: z.number(),
  type: z.string().nullable(),
  details: z.array(z.any()), // Json[] type
  created_at: z.string().datetime(),
});

export const shortPricingSchema = pricingSchema.omit({
  details: true,
})

export const pricingInsertSchema = pricingSchema.omit({
  id: true,
  created_at: true,
}).partial({
  name: true,
  description: true,
  type: true,
  details: true,
});

export const pricingUpdateSchema = pricingSchema.partial().omit({
  id: true,
});

export const pricingArraySchema = z.array(pricingSchema);

export const shortPricingArraySchema = z.array(shortPricingSchema);

export type Pricing = z.infer<typeof pricingSchema>;
export type PricingInsert = z.infer<typeof pricingInsertSchema>;
export type PricingUpdate = z.infer<typeof pricingUpdateSchema>;
export type ShortPricing = z.infer<typeof shortPricingSchema>;
