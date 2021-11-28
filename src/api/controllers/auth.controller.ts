import { Response } from 'express';
import { Request } from 'express-validator/src/base';
import { AuthService } from '../services/auth.service';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<void> {
    const authService = new AuthService();
    const [error, result] = await authService.login(req.body);

    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  }

  public static async register(req: Request, res: Response): Promise<void> {
    const authService = new AuthService();
    const [error, result] = await authService.registerUser(req.body);

    if (error) {
      res.json(error);
    } else {
      res.json(result);
    }
  }
}
