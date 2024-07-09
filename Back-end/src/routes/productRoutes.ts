import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware";
import { productValidator } from "../validators/productValidator";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);
productRouter.post("/", validate(productValidator), createProduct);
productRouter.put("/:id", validate(productValidator), updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;