import { Document } from 'mongoose';

export interface IUser extends Document {
  username?: string;
  age?: number;
  gender?: string;
  email?: string;
  password?: string;
  phone?: string;
  status: string;
  photo?: string;
}

export type IUserWithoutPass = Omit<IUser, 'password'>;
