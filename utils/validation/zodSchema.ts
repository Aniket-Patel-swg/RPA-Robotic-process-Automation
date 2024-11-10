import { z } from 'zod';

export const testZodSchema = z.object({
    name: z.string().min(3).max(20),
    age: z.number().min(18).max(100),
    email: z.string().email(),
    address: z.object({
        city: z.string(),
        postalCode: z.string().regex(/^\d{5}$/),
    }),
});
