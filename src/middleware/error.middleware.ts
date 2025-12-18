import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/appError";

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: err.issues.map((issue) => {
        return {
          field: issue.path.join("."),
          message: issue.message,
        };
      }),
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  console.error("Unhandled error:", err);

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
};
