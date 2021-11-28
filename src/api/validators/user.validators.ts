import { check } from 'express-validator';
import { handleValidationError } from '../errors/validation.error';

export const getUserByIdValidator = [check('id').isUUID(), handleValidationError];
