import { Response, Request, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import { userValidator } from "../validators/userValidator";
import * as userServices from "../services/userService";
import { IUser } from "../models/IUser";
import logger from "../utils/logger";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userServices.getAllUsers();
    logger.info(`Users retrieved`);
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Failed to get users: ${error}`);
    next(new AppError("Failed to get users", errorCodes.INTERNAL_SERVER_ERROR));
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userServices.getUserById(req.params.id);
    if (!user) {
      next(new AppError("User not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`User with id ${req.params.id} retrieved`);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Failed to get user: ${error}`);
    next(new AppError("Failed to get user", errorCodes.INTERNAL_SERVER_ERROR));
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    userValidator.parse(req.body);
    const { username, email, password, confirm_password } = req.body;
    if (password !== confirm_password) {
      next(
        new AppError(
          "Password and confirm password do not match",
          errorCodes.BAD_REQUEST
        )
      );
      return;
    }
    const newIUser: Omit<IUser, "id" | "createdAt" | "updatedAt"> = {
      username: username,
      email: email,
      password: password,
    };

    const user = await userServices.createUser(newIUser);
    logger.info(`User with email ${email} created`);
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Failed to create user: ${error}`);
    next(
      new AppError("Failed to create user", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userServices.updateUser(req.params.id, req.body);
    if (!user) {
      next(new AppError("User not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`User with id ${req.params.id} updated`);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Failed to update user: ${error}`);
    next(
      new AppError("Failed to update user", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userServices.deleteUser(req.params.id);
    if (!user) {
      next(new AppError("User not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`User with id ${req.params.id} deleted`);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Failed to delete user: ${error}`);
    next(
      new AppError("Failed to delete user", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};
