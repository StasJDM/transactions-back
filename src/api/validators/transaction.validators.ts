import { check } from 'express-validator';
import { handleValidationError } from '../errors/validation.error';

export const getTransactionByIdValidator = [check('id').isUUID(), handleValidationError];

export const createTransactionValidator = [
  check('id_to').notEmpty().isUUID(),
  check('amount').notEmpty().isNumeric(),
  handleValidationError,
];
