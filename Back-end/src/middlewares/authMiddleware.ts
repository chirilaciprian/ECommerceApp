import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import * as env from "../config/env";
import prisma from "../config/database";
import { IUser } from "../models/IUser";

export interface AuthRequest extends Request {
  user?: IUser;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    next(new AppError("Unauthorized", errorCodes.UNAUTHORIZED));
    return
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET as string) as any;
    
    const userId = payload.id;
    
    const user = await prisma.user.findFirst({
      where: { id: userId },
    });
    
    if (!user) {
      next(new AppError("User not found", errorCodes.NOT_FOUND));
      return
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError("Unauthorized", errorCodes.UNAUTHORIZED));
  }
};
