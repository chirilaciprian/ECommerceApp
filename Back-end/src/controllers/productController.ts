
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

export const getProductsBySkus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { skus } = req.body;  // Assuming SKUs are sent as an array in the request body
  
      if (!Array.isArray(skus) || skus.length === 0) {
        return next(new AppError("Invalid or empty SKUs array", errorCodes.BAD_REQUEST));
      }
  
      const products = await productService.getProductsBySkus(skus);
  
      if (products.length === 0) {
        return next(new AppError("Products not found for the given SKUs", errorCodes.NOT_FOUND));
      }
  
      logger.info(`Products with SKUs ${skus.join(', ')} retrieved`);
      res.status(200).json(products);
    } catch (error) {
      logger.error(`Failed to get products: ${error}`);
      next(new AppError("Failed to get products", errorCodes.INTERNAL_SERVER_ERROR));
    }
  };
  

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

export const getPaginatedProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 24;
        const categoryIds = (req.query.category as string)?.split(","); // Parse category IDs as an array
        const genre = req.query.genre as string;
        const sortBy = req.query.sortBy as "priceAsc" | "priceDesc";

        const filters: { categoryIds?: string[]; genre?: string } = {};

        if (categoryIds && categoryIds.length > 0) {
            filters.categoryIds = categoryIds;
        }
        if (genre) {
            filters.genre = genre;
        }

        const paginationDetails = await productService.getPaginationDetails(page, limit, filters);
        const products = await productService.getPaginatedProducts(page, limit, filters, sortBy);

        logger.info(`Products retrieved`);
        res.status(200).json({
            products,
            paginationDetails,
        });
    } catch (error) {
        logger.error(`Failed to get products: ${error}`);
        next(new AppError("Failed to get products", errorCodes.INTERNAL_SERVER_ERROR));
    }
};

export const getProductsByCartId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await productService.getProductsByCartId(req.params.id);
        logger.info(`Products retrieved`);
        res.status(200).json(products);
    } catch (error) {
        logger.error(`Failed to get products: ${error}`);
        next(new AppError("Failed to get products", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getProductsByWishlistId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await productService.getProductsByWishlistId(req.params.id);
        logger.info(`Products retrieved`);
        res.status(200).json(products);
    } catch (error) {
        logger.error(`Failed to get products: ${error}`);
        next(new AppError("Failed to get products", errorCodes.INTERNAL_SERVER_ERROR));
    }
}