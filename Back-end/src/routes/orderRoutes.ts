import { Router } from "express";
import {
  getAllOrders,
  getOrderById,
  createOrder,
  deleteOrder,
  updateOrder,
  updateOrderStatus,
} from "../controllers/orderController";
import { validate } from "../middlewares/validateMiddleware";
import { orderValidator } from "../validators/orderValidator";

const orderRouter = Router();

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrderById);
orderRouter.post("/", validate(orderValidator), createOrder);
orderRouter.delete("/:id", deleteOrder);
orderRouter.put("/:id", validate(orderValidator), updateOrder);
orderRouter.put("/:id/status", updateOrderStatus)

export default orderRouter;