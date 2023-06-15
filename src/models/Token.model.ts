import { model, Schema, Types } from 'mongoose';

import { User } from './User.model';

export const TokenSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
  },
  _userId: {
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});

export const Token = model('token', TokenSchema);
