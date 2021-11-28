import express from 'express';
import { UserController } from '../controllers/user.controller';
import { checkJwtToken } from '../middlewares';
import { getUserByIdValidator } from '../validators';

const router = express.Router();

router.get('/', checkJwtToken, UserController.getUsers);

router.get('/:id', checkJwtToken, getUserByIdValidator, UserController.getUserById);

export default router;
