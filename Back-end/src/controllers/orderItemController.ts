import { Request,Response,NextFunction } from "express";
import * as orderItemService from "../services/orderItemService";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import logger from "../utils/logger";

export const getAllOrderItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orderItems = await orderItemService.getAllOrderItems();
        logger.info(`OrderItems retrieved`);
        res.status(200).json(orderItems);
    } catch (error) {
        logger.error(`Failed to get orderItems: ${error}`);
        next(new AppError("Failed to get orderItems", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const getOrderItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orderItem = await orderItemService.getOrderItemById(req.params.id);
        if (!orderItem) {
            next(new AppError("OrderItem not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`OrderItem with id ${req.params.id} retrieved`);
        res.status(200).json(orderItem);
    } catch (error) {
        logger.error(`Failed to get orderItem: ${error}`);
        next(new AppError("Failed to get orderItem", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const createOrderItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orderItem = await orderItemService.createOrderItem(req.body);
        logger.info(`OrderItem with id ${orderItem.id} created`);
        res.status(201).json(orderItem);
    } catch (error) {
        logger.error(`Failed to create orderItem: ${error}`);
        next(new AppError("Failed to create orderItem", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateOrderItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orderItem = await orderItemService.updateOrderItem(req.params.id, req.body);
        if (!orderItem) {
            next(new AppError("OrderItem not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`OrderItem with id ${req.params.id} updated`);
        res.status(200).json(orderItem);
    } catch (error) {
        logger.error(`Failed to update orderItem: ${error}`);
        next(new AppError("Failed to update orderItem", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const updateOrderItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orderItem = await orderItemService.updateOrderItemQuantity(req.params.id, req.body.quantity);
        if (!orderItem) {
            next(new AppError("OrderItem not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`OrderItem with id ${req.params.id} updated`);
        res.status(200).json(orderItem);
    } catch (error) {
        logger.error(`Failed to update orderItem: ${error}`);
        next(new AppError("Failed to update orderItem", errorCodes.INTERNAL_SERVER_ERROR));
    }
}


export const deleteOrderItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const orderItem = await orderItemService.deleteOrderItem(req.params.id);
        if (!orderItem) {
            next(new AppError("OrderItem not found", errorCodes.NOT_FOUND));
            return;
        }
        logger.info(`OrderItem with id ${req.params.id} deleted`);
        res.status(204).json(orderItem);
    } catch (error) {
        logger.error(`Failed to delete orderItem: ${error}`);
        next(new AppError("Failed to delete orderItem", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

