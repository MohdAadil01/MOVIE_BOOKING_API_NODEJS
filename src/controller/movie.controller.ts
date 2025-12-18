import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";
import { createMovieSchema } from "../validators/movie.validatior";
import {
  createMovieService,
  deleteMovieService,
  findAllMoviesService,
  findMovieByIdService,
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

export const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const movie = await deleteMovieService(id);

  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Deleted movie successfully",
      data: movie,
    })
  );
});

export const getAllMovies = asyncHandler(
  async (req: Request, res: Response) => {
    const allMovies = await findAllMoviesService();

    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Fetched all movies",
        data: allMovies,
      })
    );
  }
);

export const getSingleMovie = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const movie = await findMovieByIdService(id);

    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Movie fetched",
        data: movie,
      })
    );
  }
);
