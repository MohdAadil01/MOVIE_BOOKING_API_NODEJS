import { User } from "../models/user.model";
import { AppError } from "../utils/appError";
import { deleteCache, getCache, setCache } from "../utils/cache";
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

  await deleteCache(`users:id:all`);

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

  await deleteCache(`users:id:${id}`);
  await deleteCache(`users:id:all`);

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
  await deleteCache(`users:id:${id}`);
  await deleteCache(`users:id:all`);
  return user;
};

export const getSingleUserService = async (id: string) => {
  if (!id) {
    throw new AppError("Provide Id please", 400);
  }
  const cacheKey = `users:id:${id}`;
  const cachedUser = await getCache(cacheKey);
  if (cachedUser) {
    return cachedUser;
  }
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User doesn't exist.", 404);
  }
  setCache(cachedUser, user, 900);
  return user;
};

export const getAllUserService = async () => {
  const cachedKey = `users:id:all`;
  const cachedUsers = await getCache(cachedKey);
  if (cachedUsers) {
    return cachedUsers;
  }
  const users = await User.find({});
  if (users.length === 0) {
    throw new AppError("No user available", 404);
  }

  await setCache(cachedKey, users, 900);
  return users;
};
