import { z } from 'zod';

export const userValidator = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").max(255, "Username must be less than 255 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long").max(255, "Password must be less than 255 characters"),

});
