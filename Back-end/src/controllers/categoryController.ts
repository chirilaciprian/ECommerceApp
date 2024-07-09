import {Response, Request,NextFunction} from 'express';
import { AppError } from '../errors/AppError';
import * as categoryService from '../services/categoryService';
import { errorCodes } from '../errors/errorCodes';
import logger from '../utils/logger';


export const getAllCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const categories = await categoryService.getAllCategories();
        logger.info(`Categories retrieved`);
        res.status(200).json(categories);
    } catch (error) {
        logger.error(`Failed to get categories: ${error}`);
        next(new AppError("Failed to get categories", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            next(new AppError("Category not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Category with id ${req.params.id} retrieved`);
        res.status(200).json(category);
    } catch (error) {
        logger.error(`Failed to get category: ${error}`);
        next(new AppError("Failed to get category", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const category = await categoryService.createCategory(req.body);
        logger.info(`Category with name ${category.name} created`);
        res.status(201).json(category);
    } catch (error) {
        logger.error(`Failed to create category: ${error}`);
        next(new AppError("Failed to create category", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const category = await categoryService.deleteCategory(req.params.id);
        if (!category) {
            next(new AppError("Category not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Category with id ${req.params.id} deleted`);
        res.status(200).json(category);
    } catch (error) {
        logger.error(`Failed to delete category: ${error}`);
        next(new AppError("Failed to delete category", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.body);
        if (!category) {
            next(new AppError("Category not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Category with id ${req.params.id} updated`);
        res.status(200).json(category);
    } catch (error) {
        logger.error(`Failed to update category: ${error}`);
        next(new AppError("Failed to update category", errorCodes.INTERNAL_SERVER_ERROR));
    }
}