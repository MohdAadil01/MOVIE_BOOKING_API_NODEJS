import { NextFunction, Request, Response } from "express";
import { redisClient } from "../utils/redis";
import { AppError } from "../utils/appError";

interface RateLimitOptions {
  windowSeconds: number;
  maxRequests: number;
}

export const rateLimiter =
  ({ windowSeconds, maxRequests }: RateLimitOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress;
    const route = req.originalUrl;

    const key = `rate:${ip}:${route}`;
    const current = await redisClient.incr(key);

    if (current == 1) {
      await redisClient.expire(key, windowSeconds);
    }

    if (current > maxRequests) {
      throw new AppError("Too many requests. Please try again later.", 459);
    }
    next();
  };
