import { Router } from "express";
import{
    getAllWishlistItems,
    getWishlistItemById,
    createWishlistItem,
    deleteWishlistItem,
    updateWishlistItem
} from "../controllers/wishlistItemController";
import { validate } from "../middlewares/validateMiddleware";
import { wishlistItemValidator } from "../validators/wishlistItemValidator";

const wishlistItemRouter = Router();

wishlistItemRouter.get("/", getAllWishlistItems);
wishlistItemRouter.get("/:id", getWishlistItemById);
wishlistItemRouter.post("/", validate(wishlistItemValidator), createWishlistItem);
wishlistItemRouter.delete("/:id", deleteWishlistItem);
wishlistItemRouter.put("/:id", validate(wishlistItemValidator), updateWishlistItem);

export default wishlistItemRouter;