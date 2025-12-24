import { User } from "../models/user.model";
import { AppError } from "../utils/appError";
import {
  TypeCreateUserSchemaInput,
  TypeUpdateUserSchemaInput,
} from "../validators/user.validator";

export const createUserService = async (data: TypeCreateUserSchemaInput) => {
  const existingUser = await User.findById(data.email);
  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }
  const user = await User.create(data);
  return user;
};

export const updateUserService = async (
  data: TypeUpdateUserSchemaInput,
  id: string
) => {
  if (!id) {
    throw new AppError("Provide Id please", 400);
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true });
  if (!user) {
    throw new AppError("User doesn't exist.", 404);
  }
  return user;
};

export const deleteUserService = async (id: string) => {
  if (!id) {
    throw new AppError("Provide Id please", 400);
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError("User doesn't exist.", 404);
  }
  return user;
};

export const getSingleUserService = async (id: string) => {
  if (!id) {
    throw new AppError("Provide Id please", 400);
  }
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User doesn't exist.", 404);
  }
  return user;
};
export const getAllUserService = async () => {
  const users = await User.find({});
  if (users.length === 0) {
    throw new AppError("No user available", 404);
  }
  return users;
};
