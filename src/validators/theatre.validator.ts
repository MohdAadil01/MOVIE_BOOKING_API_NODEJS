import z from "zod";

export const createTheatreSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  city: z.string(),
  pincode: z.string(),
  address: z.string(),
});

export const updateTheatreSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  address: z.string().optional(),
});

export type CreateTheatreInput = z.infer<typeof createTheatreSchema>;
export type UpdateTheatreInput = z.infer<typeof updateTheatreSchema>;
