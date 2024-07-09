import { Router } from "express";
import * as orderItemController from "../controllers/orderItemController";
import { validate } from "../middlewares/validateMiddleware";
import { orderItemValidator } from "../validators/orderItemValidator";


const orderItemRouter = Router();

orderItemRouter.get("/", orderItemController.getAllOrderItems);
orderItemRouter.get("/:id", orderItemController.getOrderItemById);
orderItemRouter.post("/", validate(orderItemValidator), orderItemController.createOrderItem);
orderItemRouter.put("/:id", validate(orderItemValidator), orderItemController.updateOrderItem);
orderItemRouter.put("/:id/quantity", orderItemController.updateOrderItemQuantity);
orderItemRouter.delete("/:id", orderItemController.deleteOrderItem);

export default orderItemRouter;