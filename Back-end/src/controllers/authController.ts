import { Request,Response,NextFunction } from "express";
import * as authServices from "../services/authService";
import logger from "../utils/logger";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const {email,password} = req.body;
        const token = await authServices.login(email,password);
        logger.info(`User with email ${email} logged in`);
        res.status(200).json(token);
    } catch (error) {
        logger.error(`Failed to login: ${error}`);
        next(error);
    }
}