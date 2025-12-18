import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import z from "zod";
import { createMovieSchema } from "../validators/movie.validatior";
import { createMovieService } from "../services/movie.service";

// !only client should be able to create a movie
export const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createMovieSchema.parse(req.body);

  const response = await createMovieService(parsedBody);

  res.status(response.statusCode).json(response);
});

export const updateMovie = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "created",
  });
};

export const deleteMovie = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "created",
  });
};

export const getAllMovies = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "created",
  });
};

export const getSingleMovie = async (req: Request, res: Response) => {
  res.status(200).json({
    message: "created",
  });
};
