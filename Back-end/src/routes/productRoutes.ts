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
  getProductsByCartId
} from "../controllers/productController";
import { getProductsByWishlistId } from "../services/productService";

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