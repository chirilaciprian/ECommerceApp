import { Router } from "express";

import * as emailController from "../controllers/emailController";

const emailRouter = Router();

emailRouter.post("/sendWelcomeEmail", emailController.sendWelcomeEmail);
emailRouter.post("/sendOrderConfirmation", emailController.sendOrderConfirmation);

export default emailRouter;