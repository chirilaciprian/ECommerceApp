import { Request, Response, NextFunction } from "express";
import emailService from "../services/emailService";
import { AppError } from "../errors/AppError";
import { errorCodes } from "../errors/errorCodes";
import logger from "../utils/logger";

export const sendWelcomeEmail = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try{
        const {to , username} = req.body;
        await emailService.sendWelcomeEmail(to, username);
        logger.info(`Email sent to ${to}`);
        res.status(200).json(`Welcome email sent to ${to}`);
    }
    catch(error){
        logger.error(`Failed to send email: ${error}`);
        next(new AppError("Failed to send email", errorCodes.INTERNAL_SERVER_ERROR));
    }
}

export const sendOrderConfirmation = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try{
        const {to , orderId} = req.body;
        await emailService.sendOrderConfirmation(to, orderId);
        logger.info(`Email sent to ${to}`);
        res.status(200).json(`Order confirmation email sent to ${to}`);
    }
    catch(error){
        logger.error(`Failed to send email: ${error}`);
        next(new AppError("Failed to send email", errorCodes.INTERNAL_SERVER_ERROR));
    }
}