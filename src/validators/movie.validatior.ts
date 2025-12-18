import z from "zod";

export const createMovieSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().min(10),
  genres: z
    .array(
      z.enum([
        "Action",
        "Comedy",
        "Drama",
        "Romance",
        "Thriller",
        "Horror",
        "Sci-Fi",
        "Fantasy",
        "Animation",
        "Documentary",
      ])
    )
    .min(1),
  language: z.string().optional().default("English"),
  duration: z.number().int().positive(),
  releaseDate: z.coerce.date(),
  cast: z.array(
    z.object({
      name: z.string().min(1),
      role: z.string().optional(),
    })
  ),
  urls: z.object({
    posterUrl: z.string().url(),
    trailerUrl: z.string().url().optional(),
  }),
  rating: z.object({
    average: z.number().min(0).max(10).optional(),
    votes: z.number().int().min(0).optional(),
  }),
  releaseStatus: z.enum(["Upcoming", "Now Showing"]).optional(),
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
