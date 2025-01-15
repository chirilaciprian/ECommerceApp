
import { Response,Request,NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import * as productService from "../services/productService";
import logger from "../utils/logger";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await productService.getAllProducts();
        logger.info(`Products retrieved`);
        res.status(200).json(products);
    } catch (error) {
        logger.error(`Failed to get products: ${error}`);
        next(new AppError("Failed to get products", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            next(new AppError("Product not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Product with id ${req.params.id} retrieved`);
        res.status(200).json(product);
    } catch (error) {
        logger.error(`Failed to get product: ${error}`);
        next(new AppError("Failed to get product", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getProductBySku = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.getProductBySku(req.params.sku);
        if (!product) {
            next(new AppError("Product not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Product with sku ${req.params.sku} retrieved`);
        res.status(200).json(product);
    } catch (error) {
        logger.error(`Failed to get product: ${error}`);
        next(new AppError("Failed to get product", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.createProduct(req.body);
        logger.info(`Product with name ${product.name} created`);
        res.status(201).json(product);
    } catch (error) {
        logger.error(`Failed to create product: ${error}`);
        next(new AppError("Failed to create product", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        if (!product) {
            next(new AppError("Product not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Product with id ${req.params.id} updated`);
        res.status(200).json(product);
    } catch (error) {
        logger.error(`Failed to update product: ${error}`);
        next(new AppError("Failed to update product", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const product = await productService.deleteProduct(req.params.id);
        if (!product) {
            next(new AppError("Product not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`Product with id ${req.params.id} deleted`);
        res.status(200).json(product);
    } catch (error) {
        logger.error(`Failed to delete product: ${error}`);
        next(new AppError("Failed to delete product", errorCodes.INTERNAL_SERVER_ERROR));
    }
}
