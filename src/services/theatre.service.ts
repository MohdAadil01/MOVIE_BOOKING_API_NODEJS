import { Theatre } from "../models/theatre.model";
import { AppError } from "../utils/appError";
import {
  CreateTheatreInput,
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
  return theatre;
};

export const getSingleTheatreService = async (id: string) => {
  if (!id) {
    throw new AppError("Theatre id not provided", 400);
  }
  const existingTheatre = await Theatre.findById(id);
  if (!existingTheatre) {
    throw new AppError("No theatre found", 404);
  }
  return existingTheatre;
};

export const getAllTheatreService = async () => {
  const theatres = await Theatre.find({});
  if (theatres.length === 0) {
    throw new AppError("No theatre found", 404);
  }
  return theatres;
};
