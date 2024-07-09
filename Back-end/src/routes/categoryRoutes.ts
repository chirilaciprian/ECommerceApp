import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware";
import { categoryValidator } from "../validators/categoryValidator";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.post("/", validate(categoryValidator), createCategory);
categoryRouter.put("/:id", validate(categoryValidator), updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;
