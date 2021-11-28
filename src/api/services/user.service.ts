import { UserInstance } from '../../db/models/user.model';
import { UserRepository } from '../repositories/user.repositories';
import { Return } from '../types';

export class UserService {
  public async getAll(): Promise<Return<UserInstance[]>> {
    const [error, users] = await new UserRepository().getAll();
    return [error, users];
  }

  public async getUserById(id: string): Promise<Return<UserInstance>> {
    const [error, user] = await new UserRepository().getById(id);
    return [error, user];
  }
}
