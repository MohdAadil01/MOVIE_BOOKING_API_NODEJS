import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { ApiResponse } from "../utils/apiResponse";

// !only client shouod be able to create a movie
export const createMovie = async (req: Request, res: Response) => {
  const {
    title,
    description,
    genres,
    language,
    duration,
    releaseDate,
    cast,
    urls,
    rating,
    releaseStatus,
  } = req.body;

  res.status(200).json({
    message: "created",
  });
};

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
