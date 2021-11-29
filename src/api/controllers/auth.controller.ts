import { Response } from 'express';
import { Request } from 'express-validator/src/base';
import { AuthService } from '../services/auth.service';

export class AuthController {
  public static async login(req: Request, res: Response): Promise<Response | void> {
    const authService = new AuthService();
    const [error, result] = await authService.login(req.body);

    if (error) {
      return res.json(error);
    }

    res.json(result);
  }

  public static async register(req: Request, res: Response): Promise<Response | void> {
    const authService = new AuthService();
    const [error, result] = await authService.registerUser(req.body);

    if (error) {
      return res.json(error);
    }

    res.json(result);
  }

  public static async changePassword(req: Request, res: Response): Promise<Response | void> {
    const authService = new AuthService();

    const id_user = req.user.id;
    const [error, result] = await authService.changePassword(id_user, req.body);

    if (error) {
      return res.json(error);
    }

    res.json(result);
  }
}
