import User, { UserCreationAttributes, UserInstance } from '../../db/models/user.model';
import { Return } from '../types';

export class UserRepository {
  public async getAll(): Promise<Return<UserInstance[]>> {
    try {
      const users = await User.findAll();
      return [null, users];
    } catch (error) {
      return [error, null];
    }
  }

  public async getById(id: string): Promise<Return<UserInstance>> {
    try {
      const user = await User.findByPk(id);
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  public async getByEmail(email: string): Promise<Return<UserInstance>> {
    try {
      const user = await User.findOne({ where: { email } });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  public async create(user: UserCreationAttributes): Promise<Return<UserInstance>> {
    try {
      const result = await User.create(user);
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }
}
