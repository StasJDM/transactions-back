import { uuid } from 'uuidv4';
import { UserRepository } from '../repositories/user.repositories';
import * as bcrypt from 'bcrypt';
import { HASH_ROUNDS } from '../constants';

export class AuthService {
  public async registerUser(user: { email: string; password: string; first_name: string; last_name: string }) {
    const userRepository = new UserRepository();

    const [checkUserError, existingUser] = await userRepository.getByEmail(user.email);

    if (checkUserError) return [checkUserError, null];

    if (existingUser) return [{ message: 'User with this email already exists' }, null];

    const id = uuid();
    const salt = await bcrypt.genSalt(HASH_ROUNDS);
    const password = await bcrypt.hash(user.password, salt);

    const [error, result] = await userRepository.create({
      ...user,
      id,
      password,
      salt,
    });
    return [error, result];
  }

  public async login(loginData: { email: string; password: string }) {
    const userRepository = new UserRepository();

    const [error, user] = await userRepository.getByEmail(loginData.email);

    if (error) return [error, user];

    if (!user) return [{ message: 'Wrong login or password' }, null];

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);

    if (isPasswordMatch) {
      return [null, user];
    } else {
      return [{ message: 'Wrong login or password' }, null];
    }
  }
}
