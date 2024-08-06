import { Request, Response, NextFunction } from "express";
import * as cartServices from "../services/cartService";
import logger from "../utils/logger";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";

export const getAllCarts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const carts = await cartServices.getAllCarts();
    logger.info(`Carts retrieved`);
    res.status(200).json(carts);
  } catch (error) {
    logger.error(`Failed to get carts: ${error}`);
    next(new AppError("Failed to get carts", errorCodes.INTERNAL_SERVER_ERROR));
  }
};

export const getCartById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await cartServices.getCartById(req.params.id);
    if (!cart) {
      next(new AppError("Cart not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Cart with id ${req.params.id} retrieved`);
    res.status(200).json(cart);
  } catch (error) {
    logger.error(`Failed to get cart: ${error}`);
    next(new AppError("Failed to get cart", errorCodes.INTERNAL_SERVER_ERROR));
  }
};

export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await cartServices.createCart(req.body);
    logger.info(`Cart with id ${cart.id} created`);
    res.status(201).json(cart);
  } catch (error) {
    logger.error(`Failed to create cart: ${error}`);
    next(
      new AppError("Failed to create cart", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await cartServices.deleteCart(req.params.id);
    if (!cart) {
      next(new AppError("Cart not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Cart with id ${req.params.id} deleted`);
    res.status(200).json(cart);
  } catch (error) {
    logger.error(`Failed to delete cart: ${error}`);
    next(
      new AppError("Failed to delete cart", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await cartServices.updateCart(req.params.id, req.body);
    if (!cart) {
      next(new AppError("Cart not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Cart with id ${req.params.id} updated`);
    res.status(200).json(cart);
  } catch (error) {
    logger.error(`Failed to update cart: ${error}`);
    next(
      new AppError("Failed to update cart", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const getCartByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cart = await cartServices.getCartByUserId(req.params.userId);
    if (!cart) {
      next(new AppError("Cart not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Cart with user id ${req.params.userId} retrieved`);
    res.status(200).json(cart);
  } catch (error) {
    logger.error(`Failed to get cart: ${error}`);
    next(new AppError("Failed to get cart", errorCodes.INTERNAL_SERVER_ERROR));
  }
};
