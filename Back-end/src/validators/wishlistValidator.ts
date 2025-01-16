import {z} from "zod";

export const wishlistValidator = z.object({
    userId : z.string(),
})