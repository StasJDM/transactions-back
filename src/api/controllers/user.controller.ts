import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  public static async getUsers(req: Request, res: Response): Promise<void> {
    const userService = new UserService();
    const [error, users] = await userService.getAll();

    if (error) {
      res.status(500).json(error);
    }
    if (!users && !users.length) {
      res.status(404).json({ message: 'Users not found' });
    } else {
      res.json(users);
    }
  }

  public static async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const userService = new UserService();
    const [error, user] = await userService.getUserById(id);

    if (error) {
      res.status(500).json(error);
    }
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  }
}
