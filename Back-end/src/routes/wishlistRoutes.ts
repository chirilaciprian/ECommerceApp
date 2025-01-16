import { Router } from "express";
import { getAllWhishlists, getWhishlistById, createWihslist, deleteWhishlist,getWhishlistByUserId,updateWishlist } from "../controllers/wishlistController";
import { validate } from "../middlewares/validateMiddleware";
import { wishlistValidator } from "../validators/wishlistValidator";

const whishlistRouter = Router();

whishlistRouter.get("/", getAllWhishlists);
whishlistRouter.get("/:id", getWhishlistById);
whishlistRouter.post("/", validate(wishlistValidator), createWihslist);
whishlistRouter.delete("/:id", deleteWhishlist);
whishlistRouter.put("/:id", validate(wishlistValidator), updateWishlist);
whishlistRouter.get("/user/:userId", getWhishlistByUserId);

export default whishlistRouter;