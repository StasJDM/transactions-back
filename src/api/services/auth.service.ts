import { uuid } from 'uuidv4';
import { UserRepository } from '../repositories/user.repositories';
import * as bcrypt from 'bcrypt';
import { HASH_ROUNDS, JWT_ACCESS_TOKEN_EXPIRE_TIME, JWT_SECRET } from '../constants';
import { Return } from '../types';
import { UserInstance } from '../../db/models/user.model';
import * as jwt from 'jsonwebtoken';
import { LoginRequest, RegisterRequest } from '../requests';

interface AccessToken {
  access_token: string;
}

export class AuthService {
  public async registerUser(user: RegisterRequest): Promise<Return<UserInstance>> {
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

  public async login(loginData: LoginRequest): Promise<Return<AccessToken>> {
    const userRepository = new UserRepository();

    const [error, user] = await userRepository.getByEmail(loginData.email);

    if (error) return [error, null];

    if (!user) return [{ message: 'Wrong login or password' }, null];

    const isPasswordMatch = await bcrypt.compare(loginData.password, user.password);

    if (isPasswordMatch) {
      const userInfo = { id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name };
      const access_token = this._generateAccessToken(userInfo);
      return [null, { access_token }];
    } else {
      return [{ message: 'Wrong login or password' }, null];
    }
  }

  private _generateAccessToken(userInfo): string {
    return jwt.sign(userInfo, JWT_SECRET, { expiresIn: JWT_ACCESS_TOKEN_EXPIRE_TIME });
  }
}
