import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginValidator, registerValidator } from '../validators/';

const router = express.Router();

router.post('/register', registerValidator, AuthController.register);

router.post('/login', loginValidator, AuthController.login);

export default router;
