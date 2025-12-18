import { Movie } from "../models/movie.model";
import { ApiResponse } from "../utils/apiResponse";
import { AppError } from "../utils/appError";
import { CreateMovieInput } from "../validators/movie.validatior";

export const createMovieService = async (data: CreateMovieInput) => {
  const existingMovie = await Movie.findOne({ title: data.title });

  if (existingMovie) {
    throw new AppError("Movie already present", 400);
  }

  const movie = await Movie.create(data);

  return ApiResponse.success({
    statusCode: 201,
    message: "Movie created Successfully",
    data: movie,
  });
};
