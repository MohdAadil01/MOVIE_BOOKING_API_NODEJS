import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { decodeToken } from "../utils/jwt";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role?: string;
  };
}
export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    throw new AppError("Not authorized", 401);
  }

  const token = authHeader.split(" ")[1];

  const docodedData = decodeToken(token);
  req.user = { id: docodedData.userId };

  next();
};
