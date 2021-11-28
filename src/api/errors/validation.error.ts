import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const handleValidationError = (req: Request, res: Response, next: NextFunction): Response | void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ message: 'Validation error', error: errors.array() });
  next();
};
