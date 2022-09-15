/*
How to add config:
1. define a config here using the right nested object
2. add the environment variable in .env.sample file
3. define the type of the environment variable in validateEnv, IF the variable is required
*/

// RYAN: we still need to use config to control all the environment variables
// 1. For organization using nested objects
// 2. For value control (default, computed)
// 3. For security
import validateEnv from './validateEnv';
import notificationSchedules from '../../init/notiSchedule.seeding.json';

validateEnv();

export default {
  appPort: process.env.NC_CRON_PORT || 5010,
  nodeEnv: process.env.NC_CRON_ENV || 'development',
  logFormat: process.env.NC_CRON_LOG_FORMAT,
  msWait: process.env.NC_CRON_WAIT_MS_SEC || "300",
  cors: {
    allowAnyOrigin: process.env.NC_CRON_CORS_ORIGIN === 'true' ? Boolean(process.env.NC_CRON_CORS_ORIGIN) : process.env.NC_CRON_CORS_ORIGIN,
    credentials: process.env.NC_CRON_CORS_CREDENTIALS === 'true',
  },
  db: {
    mariadb: {
      host: process.env.NC_CRON_DB_CONFIG_HOST,
      port: Number(process.env.NC_CRON_DB_CONFIG_PORT),
      user: process.env.NC_CRON_DB_CONFIG_USER,
      password: process.env.NC_CRON_DB_CONFIG_PASSWORD,
      dbName: process.env.NC_CRON_DB_CONFIG_DB_NAME,
      poolMin: Number(process.env.NC_CRON_DB_CONFIG_POOL_MIN),
      poolMax: Number(process.env.NC_CRON_DB_CONFIG_POOL_MAX),
    },
  },
  auth: {
    jwtSecretKey: process.env.NC_CRON_JWT_SECRET_KEY,
    sudory_x_auth_token: process.env.NC_CRON_SUDORY_X_AUTH_TOKEN || 'SUDORY',
    x_auth_token: process.env.NC_CRON_X_AUTH_TOKEN || 'CRON',
  },
  initialRecord: {
    notificationUrl: process.env.NC_CRON_NOTI_URL,
    notificationSchedules,
  },
};
