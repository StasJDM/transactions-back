import { check } from 'express-validator';
import { handleValidationError } from '../errors/validation.error';

export const createUserValidator = [
  check('email').notEmpty().isEmail(),
  check('first_name').notEmpty().isString().isLength({ min: 2 }),
  check('last_name').notEmpty().isString().isLength({ min: 2 }),
  check('password').notEmpty().isString().isLength({ min: 8 }),
  handleValidationError,
];
