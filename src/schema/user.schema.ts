import { z } from "zod";

export const userSchema = z.object({
   username: z.string().min(3, 'Username is required'),
   email: z.string().email("Invalid email"),
   password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"),
   avatar: z.string().optional(), // Defina um campo opcional
});

export const userIdSchema = z.object({
   userId: z.number().int().positive('User ID must be a positive integer')
})