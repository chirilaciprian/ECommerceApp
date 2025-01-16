import { Router } from "express";
import { validate } from "../middlewares/validateMiddleware";
import { ratingValidator } from "../validators/ratingValidator";

import {
    getAllRatings,
    getRatingById,
    createRating,
    deleteRating,
    updateRating,
} from "../controllers/ratingController";

const ratingRouter = Router();

ratingRouter.get("/", getAllRatings);
ratingRouter.get("/:id", getRatingById);
ratingRouter.post("/", validate(ratingValidator), createRating);
ratingRouter.delete("/:id", deleteRating);
ratingRouter.put("/:id", validate(ratingValidator), updateRating);

export default ratingRouter;