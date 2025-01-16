import { Response, Request, NextFunction } from "express";
import * as whishlistServices from "../services/wishlistService";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import logger from "../utils/logger";

export const getAllWhishlists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const whishlists = await whishlistServices.getAllWhishlists();
        logger.info(`Whishlists retrieved`);
        res.status(200).json(whishlists);
    } catch (error) {
        logger.error(`Failed to get whishlists: ${error}`);
        next(
            new AppError("Failed to get whishlists", errorCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const getWhishlistById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const whishlist = await whishlistServices.getWhishlistById(req.params.id);
        if (!whishlist) {
            next(new AppError("Whishlist not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Whishlist with id ${req.params.id} retrieved`);
        res.status(200).json(whishlist);
    } catch (error) {
        logger.error(`Failed to get whishlist: ${error}`);
        next(new AppError("Failed to get whishlist", errorCodes.INTERNAL_SERVER_ERROR));
    }
};

export const createWihslist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const whishlist = await whishlistServices.createWihslist(req.body);
        logger.info(`Whishlist with id ${whishlist.id} created`);
        res.status(201).json(whishlist);
    } catch (error) {
        logger.error(`Failed to create whishlist: ${error}`);
        next(
            new AppError("Failed to create whishlist", errorCodes.INTERNAL_SERVER_ERROR)
        );
    }
};

export const deleteWhishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const whishlist = await whishlistServices.deleteWhishlist(req.params.id);
        if (!whishlist) {
            next(new AppError("Whishlist not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Whishlist with id ${req.params.id} deleted`);
        res.status(200).json(whishlist);
    } catch (error) {
        logger.error(`Failed to delete whishlist: ${error}`);
        next(new AppError("Failed to delete whishlist", errorCodes.INTERNAL_SERVER_ERROR));
    }
};

export const updateWishlist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const whishlist = await whishlistServices.updateWishlist(req.params.id, req.body);
        if (!whishlist) {
            next(new AppError("Whishlist not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Whishlist with id ${req.params.id} updated`);
        res.status(200).json(whishlist);
    } catch (error) {
        logger.error(`Failed to update whishlist: ${error}`);
        next(new AppError("Failed to update whishlist", errorCodes.INTERNAL_SERVER_ERROR));
    }
};

export const getWhishlistByUserId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const whishlist = await whishlistServices.getWhishlistByUserId(req.params.userId);
        if (!whishlist) {
            next(new AppError("Whishlist not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Whishlist with userId ${req.params.userId} retrieved`);
        res.status(200).json(whishlist);
    } catch (error) {
        logger.error(`Failed to get whishlist: ${error}`);
        next(new AppError("Failed to get whishlist", errorCodes.INTERNAL_SERVER_ERROR));
    }
};