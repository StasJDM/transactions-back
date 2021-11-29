import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { checkJwtToken } from '../middlewares';
import { changePasswordValidator, loginValidator, registerValidator } from '../validators/';

const router = express.Router();

router.post('/register', registerValidator, AuthController.register);

router.post('/login', loginValidator, AuthController.login);

router.post('/change-password', checkJwtToken, changePasswordValidator, AuthController.changePassword);

export default router;
