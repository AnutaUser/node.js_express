import { config } from 'dotenv';

config();

export const configs = {
  PORT: process.env.PORT || 5005,
  DB_URL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/db-nodejs',

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'very_secret_access_key',
  JWT_REFRESH_SECRET:
    process.env.JWT_REFRESH_SECRET || 'very_secret_refresh_key',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '5m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',

  BCRYPT_SALT: process.env.BCRYPT_SALT || 7,
};
