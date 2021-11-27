import { AuthService } from '../services/auth.service';

export class AuthController {
  public async login(body: { email: string; password: string }) {
    const authService = new AuthService();
    return await authService.login(body);
  }

  public async register(body: { email: string; password: string; first_name: string; last_name: string }) {
    const authService = new AuthService();
    return await authService.registerUser(body);
  }
}
