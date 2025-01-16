import {z} from "zod";

export const ratingValidator = z.object({ 
    rating: z.number().min(0).max(5),
    message: z.string().min(3).max(255),
    productId: z.string(),
    userId: z.string(),
})