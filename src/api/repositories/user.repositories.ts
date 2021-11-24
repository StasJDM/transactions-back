import User, { UserCreationAttributes } from '../../db/models/user.model';

export class UserRepository {
  public async getAll() {
    try {
      const users = await User.findAll();
      return [null, users];
    } catch (err) {
      return [err, null];
    }
  }

  public async create(user: UserCreationAttributes) {
    try {
      const result = await User.create(user);
      return [null, result];
    } catch (err) {
      return [err, null];
    }
  }
}
