import { Response, Request, NextFunction } from "express";
import * as wishlistItemServices from '../services/wishlistItemService';
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import logger from "../utils/logger";

export const getAllWishlistItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlistItems = await wishlistItemServices.getAllWishlistItems();
        logger.info(`Wishlist items retrieved`);
        res.status(200).json(wishlistItems);
    } catch (error) {
        logger.error(`Failed to get wishlist items: ${error}`);
        next(
            new AppError("Failed to get wishlist items", errorCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getWishlistItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlistItem = await wishlistItemServices.getWishlistItemById(req.params.id);
        if (!wishlistItem) {
            next(new AppError("Wishlist item not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Wishlist item with id ${req.params.id} retrieved`);
        res.status(200).json(wishlistItem);
    } catch (error) {
        logger.error(`Failed to get wishlist item: ${error}`);
        next(new AppError("Failed to get wishlist item", errorCodes.INTERNAL_SERVER_ERROR));
    }
};

export const createWishlistItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlistItem = await wishlistItemServices.createWishlistItem(req.body);
        logger.info(`Wishlist item with id ${wishlistItem.id} created`);
        res.status(201).json(wishlistItem);
    } catch (error) {
        logger.error(`Failed to create wishlist item: ${error}`);
        next(
            new AppError("Failed to create wishlist item", errorCodes.INTERNAL_SERVER_ERROR)
        );
    }
}

export const deleteWishlistItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlistItem = await wishlistItemServices.deleteWhishlistItem(req.params.id);
        if (!wishlistItem) {
            next(new AppError("Wishlist item not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Wishlist item with id ${req.params.id} deleted`);
        res.status(200).json(wishlistItem);
    } catch (error) {
        logger.error(`Failed to delete wishlist item: ${error}`);
        next(new AppError("Failed to delete wishlist item", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateWishlistItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const wishlistItem = await wishlistItemServices.updateWishlistItem(req.params.id, req.body);
        if (!wishlistItem) {
            next(new AppError("Wishlist item not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Wishlist item with id ${req.params.id} updated`);
        res.status(200).json(wishlistItem);
    }
    catch (error) {
        logger.error(`Failed to update wishlist item: ${error}`);
        next(new AppError("Failed to update wishlist item", errorCodes.INTERNAL_SERVER_ERROR));
    }
};