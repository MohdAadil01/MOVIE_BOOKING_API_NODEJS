import { z } from "zod";

export const createUserSchemaInput = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "client", "customer"]).optional(),
  status: z.enum(["approved", "rejected", "pending"]).optional(),
});

export const updateUserSchemaInput = z
  .object({
    name: z.string().min(2).optional(),
    email: z.string().trim().toLowerCase().email().optional(),
    password: z.string().min(6).optional(),
    role: z.enum(["admin", "client", "customer"]).optional(),
    status: z.enum(["approved", "rejected", "pending"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  });

export type TypeCreateUserSchemaInput = z.infer<typeof createUserSchemaInput>;
export type TypeUpdateUserSchemaInput = z.infer<typeof updateUserSchemaInput>;
