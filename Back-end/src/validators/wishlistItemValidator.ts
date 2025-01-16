import {z} from "zod";

export const wishlistItemValidator = z.object({
    wishlistId : z.string(),
    productId : z.string(),    
})