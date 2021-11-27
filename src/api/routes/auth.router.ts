import express, { Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { loginValidator, registerValidator } from '../validators/auth.validators';

const router = express.Router();

router.post('/register', registerValidator, async (req: Request, res: Response) => {
  const authController = new AuthController();
  const result = await authController.register(req.body);
  res.json(result);
});

router.post('/login', loginValidator, async (req: Request, res: Response) => {
  const authController = new AuthController();
  const result = await authController.login(req.body);
  res.json(result);
});

export default router;
