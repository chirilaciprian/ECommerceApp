import { Router } from "express";
import { getAllUsers , getUserById, updateUser, deleteUser, createUser, changePassword} from "../controllers/userController";
import { validate } from "../middlewares/validateMiddleware";
import { userValidator } from "../validators/userValidator";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", validate(userValidator), createUser);
userRouter.put("/:id", validate(userValidator), updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/:id/change-password", changePassword);

export default userRouter;