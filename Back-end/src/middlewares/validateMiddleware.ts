import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../errors/AppError';
import { errorCodes } from '../errors/errorCodes';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (e) {
    next(new AppError('Validation error', errorCodes.VALIDATION_ERROR));
  }
};
