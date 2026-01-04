import z from "zod";

export const addShowSchema = z.object({
  movieId: z.string().min(1, "Movie ID is required"),
  theatreId: z.string().min(1, "Theatre ID is required"),
  startTime: z.coerce.date(),
  price: z.number().int().positive("Price must be a positive integer"),
  totalSeats: z
    .number()
    .int()
    .positive("Total Seats must be a positive integer"),
});

export const updateShowSchema = z.object({
  startTime: z.coerce.date().optional(),
  price: z.number().int().positive().optional(),
  totalSeats: z.number().int().positive().optional(),
});

export type AddShowInputType = z.infer<typeof addShowSchema>;
export type UpdateShowInputType = z.infer<typeof updateShowSchema>;
