import { Response, Request, NextFunction } from "express";
import * as ratingServices from "../services/ratingService";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import logger from "../utils/logger";

export const getAllRatings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const ratings = await ratingServices.getAllRatings();
        logger.info(`Ratings retrieved`);
        res.status(200).json(ratings);
    } catch (error) {
        logger.error(`Failed to get ratings: ${error}`);
        next(
            new AppError("Failed to get ratings", errorCodes.INTERNAL_SERVER_ERROR)
        );
    }
}

export const getRatingById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rating = await ratingServices.getRatingById(req.params.id);
        if (!rating) {
            next(new AppError("Rating not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Rating with id ${req.params.id} retrieved`);
        res.status(200).json(rating);
    } catch (error) {
        logger.error(`Failed to get rating: ${error}`);
        next(new AppError("Failed to get rating", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getRatingsByProductId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const ratings = await ratingServices.getRatingsByProductId(req.params.productId);
        logger.info(`Ratings with product id ${req.params.productId} retrieved`);
        res.status(200).json(ratings);
    }
    catch (error) {
        logger.error(`Failed to get ratings: ${error}`);
        next(
            new AppError("Failed to get ratings", errorCodes.INTERNAL_SERVER_ERROR)
        );
    }
}

export const createRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rating = await ratingServices.createRating(req.body);
        logger.info(`Rating with id ${rating.id} created`);
        res.status(201).json(rating);
    } catch (error) {
        logger.error(`Failed to create rating: ${error}`);
        next(
            new AppError("Failed to create rating", errorCodes.INTERNAL_SERVER_ERROR)
        );
    }
}

export const deleteRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rating = await ratingServices.deleteRating(req.params.id);
        if (!rating) {
            next(new AppError("Rating not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Rating with id ${req.params.id} deleted`);
        res.status(200).json(rating);
    } catch (error) {
        logger.error(`Failed to delete rating: ${error}`);
        next(new AppError("Failed to delete rating", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateRating = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const rating = await ratingServices.updateRating(req.params.id, req.body);
        if (!rating) {
            next(new AppError("Rating not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Rating with id ${req.params.id} updated`);
        res.status(200).json(rating);
    } catch (error) {
        logger.error(`Failed to update rating: ${error}`);
        next(new AppError("Failed to update rating", errorCodes.INTERNAL_SERVER_ERROR));
    }
}