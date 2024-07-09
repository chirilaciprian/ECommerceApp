import { Router } from "express";
import * as cartItemController from "../controllers/cartItemController";
import { validate } from "../middlewares/validateMiddleware";
import { cartItemValidator } from "../validators/cartItemValidator";

const cartItemRouter = Router();

cartItemRouter.get("/", cartItemController.getAllCartItems);
cartItemRouter.get("/:id", cartItemController.getCartItemById);
cartItemRouter.post("/", validate(cartItemValidator), cartItemController.createCartItem);
cartItemRouter.delete("/:id", cartItemController.deleteCartItem);
cartItemRouter.put("/:id/quantity", cartItemController.updateCartItemQuantity);

export default cartItemRouter;