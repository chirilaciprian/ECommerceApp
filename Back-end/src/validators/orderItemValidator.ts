import {z} from 'zod';

export const orderItemValidator = z.object({    
    orderId: z.string(),
    productId: z.string(),
    quantity: z.number().min(0),
});