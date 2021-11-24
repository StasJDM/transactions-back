import express, { NextFunction, Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const controller = new UserController();
  const users = await controller.getUsers();
  res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
  const controller = new UserController();
  const createdUser = await controller.createUser(req.body);
  res.json(createdUser);
});

export default router;
