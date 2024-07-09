import { Router } from "express";
import * as cartController from "../controllers/cartController";
import { cartValidator } from "../validators/cartValidator";
import { validate } from "../middlewares/validateMiddleware";

const cartRouter = Router();

cartRouter.get("/", cartController.getAllCarts);
cartRouter.get("/:id", cartController.getCartById);
cartRouter.post("/", validate(cartValidator), cartController.createCart);
cartRouter.delete("/:id", cartController.deleteCart);
cartRouter.put("/:id", validate(cartValidator), cartController.updateCart);

export default cartRouter;