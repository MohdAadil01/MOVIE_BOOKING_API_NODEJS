import { Movie } from "../models/movie.model";
import { AppError } from "../utils/appError";
import { deleteCache, getCache, setCache } from "../utils/cache";
import {
  CreateMovieInput,
  UpdateMovieInput,
} from "../validators/movie.validator";

export const createMovieService = async (data: CreateMovieInput) => {
  const existingMovie = await Movie.findOne({ title: data.title });

  if (existingMovie) {
    throw new AppError("Movie already present", 400);
  }

  const movie = await Movie.create(data);
  await deleteCache(`movie:all`);
  return movie;
};

export const findMovieByIdService = async (id: string) => {
  if (!id) {
    throw new AppError("Id not provided", 400);
  }
  const cacheKey = `movie:id:${id}`;
  const cachedMovie = await getCache(cacheKey);
  if (cachedMovie) {
    return cachedMovie;
  }

  const movie = await Movie.findById(id);

  if (!movie) {
    throw new AppError("Movie is not available", 404);
  }

  await setCache(cacheKey, movie, 900);
  return movie;
};

export const findAllMoviesService = async () => {
  const cacheKey = `movie:all`;
  const cachedMovies = await getCache(cacheKey);
  if (cachedMovies) {
    return cachedMovies;
  }

  const allMovies = await Movie.find({});
  if (allMovies.length === 0) {
    throw new AppError("Nothing available here", 404);
  }

  await setCache(cacheKey, allMovies, 900);
  return allMovies;
};

export const deleteMovieService = async (id: string) => {
  if (!id) {
    throw new AppError("Id not provided", 400);
  }
  const movie = await Movie.findById(id);
  if (!movie) {
    throw new AppError("Movie not found", 404);
  }
  await movie.deleteOne();
  await deleteCache(`movie:id:${id}`);
  await deleteCache(`movie:all`);
  return movie;
};

export const updateMovieService = async (
  id: string,
  data: UpdateMovieInput
) => {
  const movie = await Movie.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!movie) {
    throw new AppError("Movie not found", 404);
  }

  await deleteCache(`movie:id:${id}`);
  await deleteCache(`movie:all`);

  return movie;
};
