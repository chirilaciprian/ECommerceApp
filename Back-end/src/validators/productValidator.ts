import {z} from "zod";

export const productValidator = z.object({
  name: z.string().min(3).max(255),
  price: z.number().min(0), 
  image: z.string().url(),
  description: z.string().min(3).max(255),
  onSale : z.boolean(),
  manufacturer : z.string().min(3).max(255),
});