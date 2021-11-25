import { uuid } from 'uuidv4';
import { UserCreationAttributes } from '../../db/models/user.model';
import { UserRepository } from '../repositories/user.repositories';

export class UserService {
  public async getAll() {
    const [error, users] = await new UserRepository().getAll();
    return [error, users];
  }

  public async getUserById(id: string) {
    const [error, user] = await new UserRepository().getById(id);
    return [error, user];
  }

  public async createUser(user: UserCreationAttributes) {
    const [error, result] = await new UserRepository().create({
      id: uuid(),
      ...user,
    });
    return [error, result];
  }
}
