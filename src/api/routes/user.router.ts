import express from 'express';
import { UserController } from '../controllers/user.controller';
import { getUserByIdValidator } from '../validators';

const router = express.Router();

router.get('/', UserController.getUsers);

router.get('/:id', getUserByIdValidator, UserController.getUserById);

export default router;
