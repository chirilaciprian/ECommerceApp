import { Router } from "express";
import { login } from "../controllers/authController";
import { createUser } from "../controllers/userController";
import { validate } from "../middlewares/validateMiddleware";
import { userValidator } from "../validators/userValidator";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/signup", validate(userValidator), createUser);

export default authRouter;
