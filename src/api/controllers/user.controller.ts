import { UserService } from '../services/user.service';

export class UserController {
  public async getUsers() {
    const userService = new UserService();
    return userService.getAll();
  }

  public async createUser(body) {
    const userService = new UserService();
    return userService.createUser(body);
  }
}
