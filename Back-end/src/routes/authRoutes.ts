import { Router } from "express";
import { login, me } from "../controllers/authController";
import { createUser } from "../controllers/userController";
import { validate } from "../middlewares/validateMiddleware";
import { userValidator } from "../validators/userValidator";
import { authenticate } from "../middlewares/authMiddleware";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", validate(userValidator), createUser);
authRouter.get("/me", authenticate, me);

export default authRouter;
