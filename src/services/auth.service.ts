import { ApiError } from '../errors';
import { Token, User } from '../models';
import { ICredentials, ITokenPair, IUser } from '../types';
import { passwordService } from './password.service';
import { tokenService } from './token.service';

class AuthService {
  public async register(data: IUser): Promise<IUser> {
    try {
      const hashPass = await passwordService.hash(data.password);
      return await User.create({ ...data, password: hashPass });
    } catch (e) {
      throw new ApiError(e.message, 201);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      user = await User.findOne({ email: credentials.email });

      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );

      if (!isMatched) {
        throw new ApiError('wrong email or password', 401);
      }
      const tokenPair = await tokenService.generateTokenPair({ _id: user._id });

      await Token.create({ ...tokenPair, _userId: user._id });

      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, 201);
    }
  }
}

export const authService = new AuthService();
