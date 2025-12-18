import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { createMovieSchema } from "../validators/movie.validatior";
import {
  createMovieService,
  findMovieByTitleService,
} from "../services/movie.service";

// !only client should be able to create a movie
export const createMovie = asyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createMovieSchema.parse(req.body);

  const movie = await createMovieService(parsedBody);

  res.status(201).json(
    ApiResponse.success({
      statusCode: 201,
      message: "Movie created Successfully",
      data: movie,
    })
  );
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

export const getSingleMovie = asyncHandler(
  async (req: Request, res: Response) => {
    const { name } = req.params;

    const movie = await findMovieByTitleService(name);

    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Movie fetched",
        data: movie,
      })
    );
  }
);
