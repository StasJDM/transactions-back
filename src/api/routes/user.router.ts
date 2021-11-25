import express, { Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { createUserValidator } from '../validators';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const controller = new UserController();
  const users = await controller.getUsers();
  res.json(users);
});

router.get('/:id', async (req: Request, res: Response) => {
  const controller = new UserController();
  const user = await controller.getUserById(req.params.id);
  res.json(user);
});

router.post('/', createUserValidator, async (req: Request, res: Response) => {
  const controller = new UserController();
  const createdUser = await controller.createUser(req.body);
  res.json(createdUser);
});

export default router;
