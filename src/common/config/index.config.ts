import * as dotenv from 'dotenv';
dotenv.config();

const CONFIG = {
  port: process.env.PORT || 5000,
  environment: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  throttler: {
    ttl: 60000,
    limit: 30,
  },
  token: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'accessSecret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'refreshSecret',
    accessExpiresIn: process.env.EXP_ACCESS || '15m',
    refreshExpiresIn: process.env.EXP_REFRESH || '30d',
  },
};

export default CONFIG;
