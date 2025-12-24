import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getSingleUserService,
  updateUserService,
} from "../services/user.service";
import {
  createUserSchemaInput,
  updateUserSchemaInput,
} from "../validators/user.validator";
import { ApiResponse } from "../utils/apiResponse";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const parsedBody = createUserSchemaInput.parse(req.body);
  const user = await createUserService(parsedBody);
  return res.status(201).json(
    ApiResponse.success({
      statusCode: 201,
      message: "Signup",
      data: user,
    })
  );
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsedBody = updateUserSchemaInput.parse(req.body);
  const user = await updateUserService(parsedBody, id);
  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Updated User",
      data: user,
    })
  );
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await deleteUserService(id);
  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Successfully deleted",
      data: user,
    })
  );
});

export const getSingleUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getSingleUserService(id);
    return res.status(200).json(
      ApiResponse.success({
        statusCode: 200,
        message: "Fetched Successfully.",
        data: user,
      })
    );
  }
);

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await getAllUserService();

  return res.status(200).json(
    ApiResponse.success({
      statusCode: 200,
      message: "Fetched Successfully.",
      data: users,
    })
  );
});
