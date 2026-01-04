import mongoose from "mongoose";
import { Movie } from "../models/movie.model";
import { Show } from "../models/show.model";
import { Theatre } from "../models/theatre.model";
import { AppError } from "../utils/appError";
import { deleteCache, getCache, setCache } from "../utils/cache";
import {
  AddShowInputType,
  UpdateShowInputType,
} from "../validators/show.validator";

export const addShowService = async (inputData: AddShowInputType) => {
  if (
    !mongoose.Types.ObjectId.isValid(inputData.movieId) ||
    !mongoose.Types.ObjectId.isValid(inputData.theatreId)
  ) {
    throw new AppError("Invalid id", 400);
  }
  const movieExists = await Movie.findById(inputData.movieId);
  if (!movieExists) throw new AppError("Movie doesn't exists", 404);
  const theatreExists = await Theatre.findById(inputData.theatreId);
  if (!theatreExists) throw new AppError("Theatre doesn't exists", 404);

  const existingShow = await Show.findOne({
    movieId: inputData.movieId,
    theatreId: inputData.theatreId,
    startTime: inputData.startTime,
  });
  if (existingShow) throw new AppError("Show already present", 400);
  const show = await Show.create(inputData);
  await deleteCache(`shows:all`);
  return show;
};

export const updateShowService = async (
  inputData: UpdateShowInputType,
  id: string
) => {
  if (!id) {
    throw new AppError("ID not provided", 404);
  }

  const show = await Show.findById(id);
  if (!show) {
    throw new AppError("Show not found.", 404);
  }
  if (inputData.totalSeats && inputData.totalSeats < show?.bookedSeats.length) {
    throw new AppError(
      "Cannot reduce total seats below the number of booked seats.",
      400
    );
  }

  const updatedShow = await Show.findByIdAndUpdate(id, inputData, {
    new: true,
  });

  await deleteCache(`shows:id:${id}`);
  await deleteCache(`shows:all`);
  return updatedShow;
};

export const deleteShowService = async (id: string) => {
  if (!id) {
    throw new AppError("ID not provided", 404);
  }

  const show = await Show.findByIdAndDelete(id);
  if (!show) {
    throw new AppError("No show found with this id", 404);
  }

  await deleteCache(`shows:id:${id}`);
  await deleteCache(`shows:all`);
  return show;
};

export const getShowService = async (id: string) => {
  if (!id) {
    throw new AppError("ID not provided", 404);
  }
  const cacheKey = `shows:id:${id}`;
  const cachedShow = await getCache(cacheKey);
  if (cachedShow) return cachedShow;

  const show = await Show.findById(id);
  if (!show) {
    throw new AppError("Show doesn't exists.", 404);
  }

  await setCache(cacheKey, show, 900);
  return show;
};

export const getShowsService = async () => {
  const cacheKey = `shows:all`;
  const cachedShows = await getCache(cacheKey);
  if (cachedShows) return cachedShows;

  const shows = await Show.find({});
  if (shows.length === 0) {
    throw new AppError("No show found", 404);
  }

  await setCache(cacheKey, shows, 900);
  return shows;
};
