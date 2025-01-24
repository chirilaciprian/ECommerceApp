import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware";
import { productValidator } from "../validators/productValidator";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsBySkus,
  getPaginatedProducts,
  getProductsByCartId,
  getProductsByWishlistId
} from "../controllers/productController";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/paginated",getPaginatedProducts);
productRouter.get("/cart/:id",getProductsByCartId);
productRouter.get("/wishlist/:id",getProductsByWishlistId);
productRouter.get("/:id", getProductById);
productRouter.post('/get-products-by-skus', getProductsBySkus);
productRouter.post("/", validate(productValidator), createProduct);
productRouter.put("/:id", validate(productValidator), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;