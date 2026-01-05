import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { AppError } from "./appError";

const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) {
  throw new AppError("JWT_SECRET is not defined.", 400);
}
export interface TokenPayload extends JwtPayload {
  userId: string;
}
export const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "10d",
    algorithm: "HS256",
  });
  return token;
};

export const decodeToken = (jwt_token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(jwt_token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as TokenPayload;
    return decoded;
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token expired", 401);
    }
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token", 401);
    }
    throw error;
  }
};
