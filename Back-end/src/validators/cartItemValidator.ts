import { z } from "zod";

export const cartItemValidator = z.object({
  productId: z.string().nonempty(),
  cartId: z.string().nonempty(),
  quantity: z.number().min(0),
});
