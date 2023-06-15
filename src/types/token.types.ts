import { IUser } from './user.types';

export interface ITokenPair {
  accessToken: string;
  refreshToken: string;
}

export type ICredentials = Pick<IUser, 'email' | 'password'>;
export type ITokenPayload = Pick<IUser, '_id' | 'username'>;
