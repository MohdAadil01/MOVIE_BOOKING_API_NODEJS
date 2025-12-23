import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  createTheatreSchema,
  updateTheatreSchema,
} from "../validators/theatre.validator";
import {
  createTheatreService,
  deleteTheatreService,
  getAllTheatreService,
  getSingleTheatreService,
  updateTheatreMoviesService,
  updateTheatreService,
} from "../services/theatre.service";
import { ApiResponse } from "../utils/apiResponse";
import { Theatre } from "../models/theatre.model";
import { AppError } from "../utils/appError";

export const createTheatre = asyncHandler(
  async (req: Request, res: Response) => {
    const parsedBody = createTheatreSchema.parse(req.body);
    const theatre = await createTheatreService(parsedBody);

    res.status(201).json(
      ApiResponse.success({
        statusCode: 201,
        message: "Theatre created",
        data: theatre,
      })
    );
  }
);

export const updateTheatre = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const parsedBody = updateTheatreSchema.parse(req.body);
    const theatre = await updateTheatreService(id, parsedBody);

    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Updated",
        data: theatre,
      })
    );
  }
);

export const deleteTheatre = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const theatre = await deleteTheatreService(id);

    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Deleted successfully",
        data: theatre,
      })
    );
  }
);

export const getSingleTheatre = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const theatre = await getSingleTheatreService(id);

    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Fetched successfully",
        data: theatre,
      })
    );
  }
);

export const getAllTheatre = asyncHandler(
  async (req: Request, res: Response) => {
    const theatres = await getAllTheatreService();
    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Fetched successfully",
        data: theatres,
      })
    );
  }
);

export const updateTheatreMovies = asyncHandler(
  async (req: Request, res: Response) => {
    const { movies, theatreId, insert } = req.body;
    const data = await updateTheatreMoviesService({
      movies,
      theatreId,
      insert,
    });
    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Updated movies in theatre",
        data: data,
      })
    );
  }
);
