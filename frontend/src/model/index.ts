import { z } from "zod";

export const HotelsSchema = z.object({
    id: z.number(),
    name: z.string(),
    pricePerNightInUSD: z.number()
  })