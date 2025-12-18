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

  return movie;
};

export const findMovieByTitleService = async (title: string) => {
  if (!title) {
    throw new AppError("Name is not provided", 400);
  }
  const movie = await Movie.findOne({ title });

  if (!movie) {
    throw new AppError("Movie is not available", 404);
  }
  return movie;
};

export const findAllMoviesService = async () => {
  const allMovies = await Movie.find({});
  if (allMovies.length === 0) {
    throw new AppError("Nothing available here", 404);
  }
  return allMovies;
};
