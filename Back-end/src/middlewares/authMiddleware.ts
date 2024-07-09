import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import * as env from "../config/env";

interface JwtPayload {
  id: string;
}

interface AuthRequest extends Request {
    userId?: string;
}


export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next(new AppError("Auth header missing", errorCodes.UNAUTHORIZED));
    return;
  }
  const token = authHeader.split(" ")[1];

  if (!token) {
    next(new AppError("Token Missing", errorCodes.UNAUTHORIZED));
    return;
  }
  try {
    const payload = jwt.verify(
      token,
      env.JWT_SECRET as string
    ) as JwtPayload;
    req.userId = payload.id;
    next();
  } catch (error) {
    next(new AppError("Invalid or expired token", errorCodes.UNAUTHORIZED));
  }
};
