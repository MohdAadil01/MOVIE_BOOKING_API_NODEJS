// get a show
// get all shows
// update show
// delete a show
// add a show

import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { addShowSchema, updateShowSchema } from "../validators/show.validator";
import {
  addShowService,
  deleteShowService,
  getShowService,
  getShowsService,
  updateShowService,
} from "../services/show.service";
import { ApiResponse } from "../utils/apiResponse";

export const addShow = asyncHandler(async (req: Request, res: Response) => {
  const parsedBody = addShowSchema.parse(req.body);
  const show = await addShowService(parsedBody);

  return res.status(201).json(
    ApiResponse.success({
      statusCode: 201,
      message: "Show added",
      data: show,
    })
  );
});

export const updateShow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedBody = updateShowSchema.parse(req.body);
  const show = await updateShowService(parsedBody, id);

  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Updated show",
      data: show,
    })
  );
});

export const getShow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const show = await getShowService(id);

  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Fetched show",
      data: show,
    })
  );
});

export const getShows = asyncHandler(async (req: Request, res: Response) => {
  const shows = await getShowsService();

  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Fetched all shows",
      data: shows,
    })
  );
});

export const deleteShow = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const show = await deleteShowService(id);

  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Deleted show",
      data: show,
    })
  );
});
