import { check } from 'express-validator';
import { handleValidationError } from '../errors/validation.error';

export const getTransactionByIdValidator = [check('id').isUUID(), handleValidationError];

export const searchTransactionsValidator = [check('searchString').isString(), handleValidationError];

export const createTransactionValidator = [
  check('id_to').notEmpty().isUUID(),
  check('amount').notEmpty().isNumeric(),
  check('label').notEmpty().isString(),
  handleValidationError,
];
