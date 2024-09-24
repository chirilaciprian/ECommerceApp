import {z} from "zod";

export const productValidator = z.object({
  name: z.string().min(3).max(255),
  price: z.number().min(0), 
  images: z.array(z.string().url()),
  description: z.string().min(3).max(255),
  onSale : z.boolean(),
  manufacturer : z.string().min(3).max(255),
  rating : z.number().min(0).max(5),
  genre: z.string().min(3).max(255),
});