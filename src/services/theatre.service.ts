import { Types } from "mongoose";
import { Theatre, TypeTheatre } from "../models/theatre.model";
import { AppError } from "../utils/appError";
import { deleteCache, getCache, setCache } from "../utils/cache";
import {
  CreateTheatreInput,
  createTheatreSchema,
  UpdateTheatreInput,
} from "../validators/theatre.validator";

export const createTheatreService = async (data: CreateTheatreInput) => {
  const existingTheatre = await Theatre.findOne({
    name: data.name,
    pincode: data.pincode,
  });

  if (existingTheatre) {
    throw new AppError("Theatre already exists", 400);
  }

  const theatre = await Theatre.create(data);
  await deleteCache(`theatres:all`);
  return theatre;
};

export const updateTheatreService = async (
  id: String,
  data: UpdateTheatreInput
) => {
  if (!id) {
    throw new AppError("Theatre id not provided", 400);
  }
  const existingTheatre = await Theatre.findById(id);
  if (!existingTheatre) {
    throw new AppError("No theatre found", 404);
  }

  const theatre = await Theatre.findByIdAndUpdate(id, data);
  await deleteCache(`theatres:id:${id}`);
  await deleteCache(`theatres:all`);
  return theatre;
};

export const deleteTheatreService = async (id: string) => {
  if (!id) {
    throw new AppError("Theatre id not provided", 400);
  }
  const existingTheatre = await Theatre.findById(id);
  if (!existingTheatre) {
    throw new AppError("No theatre found", 404);
  }

  const theatre = await Theatre.findByIdAndDelete(id);

  await deleteCache(`theatres:id:${id}`);
  await deleteCache(`theatres:all`);

  return theatre;
};

export const getSingleTheatreService = async (id: string) => {
  if (!id) {
    throw new AppError("Theatre id not provided", 400);
  }

  const cacheKey = `theatres:id:${id}`;
  const cachedTheatre = await getCache(cacheKey);
  if (cachedTheatre) {
    return cachedTheatre;
  }

  const existingTheatre = await Theatre.findById(id);
  if (!existingTheatre) {
    throw new AppError("No theatre found", 404);
  }

  await setCache(cacheKey, existingTheatre, 900);
  return existingTheatre;
};

export const getAllTheatreService = async () => {
  const cacheKey = `theatres:all`;
  const cachedTheatres = await getCache(cacheKey);
  if (cachedTheatres) {
    return cachedTheatres;
  }

  const theatres = await Theatre.find({});
  if (theatres.length === 0) {
    throw new AppError("No theatre found", 404);
  }

  await setCache(cacheKey, theatres, 900);
  return theatres;
};

export const updateTheatreMoviesService = async ({
  movies,
  theatreId,
  insert,
}: {
  movies: string[];
  theatreId: string;
  insert: boolean;
}) => {
  if (
    movies.length == 0 ||
    !theatreId ||
    insert == null ||
    !Array.isArray(movies)
  ) {
    throw new AppError("Pleave provide all the required fields", 400);
  }

  if (!Types.ObjectId.isValid(theatreId)) {
    throw new AppError("Invalid theatre id", 400);
  }

  const moviesId = movies.map((movie_id) => {
    if (!Types.ObjectId.isValid(movie_id)) {
      throw new AppError(`Invalid movie id: ${movie_id}`, 400);
    }
    return new Types.ObjectId(movie_id);
  });

  const updatedQuery = insert
    ? { $addToSet: { nowShowing: { $each: moviesId } } }
    : { $pull: { nowShowing: { $in: moviesId } } };

  const theatre = await Theatre.findByIdAndUpdate(theatreId, updatedQuery, {
    new: true,
  }).populate("nowShowing");
  if (!theatre) {
    throw new AppError("Theatre not found", 404);
  }
  await Promise.all([
    deleteCache(`theatres:id:${theatreId}`),
    deleteCache(`theatres:all`),
  ]);

  return theatre;
};
