import { Request,Response,NextFunction } from "express";
import * as cartItemServices from "../services/cartItemService";
import logger from "../utils/logger";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";

export const getAllCartItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cartItems = await cartItemServices.getAllCartItems();
        logger.info(`Cart items retrieved`);
        res.status(200).json(cartItems);
    } catch (error) {
        logger.error(`Failed to get cart items: ${error}`);
        next(new AppError("Failed to get cart items", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getCartItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cartItem = await cartItemServices.getCartItemById(req.params.id);
        if (!cartItem) {
            next(new AppError("Cart item not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Cart item with id ${req.params.id} retrieved`);
        res.status(200).json(cartItem);
    } catch (error) {
        logger.error(`Failed to get cart item: ${error}`);
        next(new AppError("Failed to get cart item", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const createCartItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cartItem = await cartItemServices.createCartItem(req.body);
        logger.info(`Cart item with id ${cartItem.id} created`);
        res.status(201).json(cartItem);
    } catch (error) {
        logger.error(`Failed to create cart item: ${error}`);
        next(new AppError("Failed to create cart item", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const deleteCartItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cartItem = await cartItemServices.deleteCartItem(req.params.id);
        if (!cartItem) {
            next(new AppError("Cart item not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Cart item with id ${req.params.id} deleted`);
        res.status(200).json(cartItem);
    } catch (error) {
        logger.error(`Failed to delete cart item: ${error}`);
        next(new AppError("Failed to delete cart item", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateCartItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cartItem = await cartItemServices.updateCartItemQuantity(req.params.id, req.body.quantity);
        if (!cartItem) {
            next(new AppError("Cart item not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Cart item with id ${req.params.id} updated`);
        res.status(200).json(cartItem);
    } catch (error) {
        logger.error(`Failed to update cart item: ${error}`);
        next(new AppError("Failed to update cart item", errorCodes.INTERNAL_SERVER_ERROR));
    }
}