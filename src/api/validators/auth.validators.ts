import { check } from 'express-validator';
import { handleValidationError } from '../errors/validation.error';

export const registerValidator = [
  check('email').notEmpty().isEmail(),
  check('first_name').notEmpty().isString().isLength({ min: 2 }),
  check('last_name').notEmpty().isString().isLength({ min: 2 }),
  check('password').notEmpty().isString().isLength({ min: 8 }),
  handleValidationError,
];

export const loginValidator = [
  check('email').notEmpty().isEmail(),
  check('password').notEmpty().isString().isLength({ min: 8 }),
  handleValidationError,
];

export const changePasswordValidator = [
  check('old_password').notEmpty().isString().isLength({ min: 8 }),
  check('new_password').notEmpty().isString().isLength({ min: 8 }),
  handleValidationError,
];
