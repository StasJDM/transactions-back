import User, { UserCreationAttributes } from '../../db/models/user.model';

export class UserRepository {
  public async getAll() {
    try {
      const users = await User.findAll();
      return [null, users];
    } catch (error) {
      return [error, null];
    }
  }

  public async getById(id: string) {
    try {
      const user = await User.findByPk(id);
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  public async getByEmail(email: string) {
    try {
      const user = await User.findOne({ where: { email } });
      return [null, user];
    } catch (error) {
      return [error, null];
    }
  }

  public async create(user: UserCreationAttributes) {
    try {
      const result = await User.create(user);
      return [null, result];
    } catch (error) {
      return [error, null];
    }
  }
}
