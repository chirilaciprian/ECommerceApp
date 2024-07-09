import {z} from "zod";

export const cartValidator = z.object({
  userId : z.string().nonempty(),
});