import { Request, Response, NextFunction } from "express";
import * as orderServices from "../services/orderService";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import logger from "../utils/logger";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const orders = await orderServices.getAllOrders();
    logger.info(`Orders retrieved`);
    res.status(200).json(orders);
  } catch (error) {
    logger.error(`Failed to get orders: ${error}`);
    next(
      new AppError("Failed to get orders", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const getOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderServices.getOrderById(req.params.id);
    if (!order) {
      next(new AppError("Order not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Order with id ${req.params.id} retrieved`);
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Failed to get order: ${error}`);
    next(new AppError("Failed to get order", errorCodes.INTERNAL_SERVER_ERROR));
  }
};

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderServices.createOrder(req.body);
    logger.info(`Order with id ${order.id} created`);
    res.status(201).json(order);
  } catch (error) {
    logger.error(`Failed to create order: ${error}`);
    next(
      new AppError("Failed to create order", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderServices.deleteOrder(req.params.id);

    if (!order) {
      next(new AppError("Order not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Order with id ${req.params.id} deleted`);
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Failed to delete order: ${error}`);
    next(
      new AppError("Failed to delete order", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderServices.updateOrder(req.params.id, req.body);
    if (!order) {
      next(new AppError("Order not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Order with id ${req.params.id} updated`);
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Failed to update order: ${error}`);
    next(
      new AppError("Failed to update order", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
};

export const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const order = await orderServices.updateOrderStatus(
      req.params.id,
      req.body.status
    );
    if (!order) {
      next(new AppError("Order not found", errorCodes.NOT_FOUND));
      return;
    }
    logger.info(`Order with id ${req.params.id} status updated`);
    res.status(200).json(order);
  } catch (error) {
    logger.error(`Failed to update order status: ${error}`);
    next(
      new AppError("Failed to update order status", errorCodes.INTERNAL_SERVER_ERROR)
    );
  }
}
