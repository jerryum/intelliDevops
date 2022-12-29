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

validateEnv();

export default {
  appPort: process.env.ID_PORT || 5055,
  nodeEnv: process.env.ID_ENV || 'development',
  logFormat: process.env.ID_LOG_FORMAT,
  msWait: process.env.ID_WAIT_MS_SEC || '100',
  cors: {
    allowAnyOrigin: process.env.ID_CORS_ORIGIN === 'true' ? Boolean(process.env.ID_CORS_ORIGIN) : process.env.ID_CORS_ORIGIN,
    credentials: process.env.ID_CORS_CREDENTIALS === 'true',
  },
  db: {
    mariadb: {
      host: process.env.ID_DB_CONFIG_HOST,
      port: Number(process.env.ID_DB_CONFIG_PORT),
      user: process.env.ID_DB_CONFIG_USER,
      password: process.env.ID_DB_CONFIG_PASSWORD,
      dbName: process.env.ID_DB_CONFIG_DB_NAME,
      poolMin: Number(process.env.ID_DB_CONFIG_POOL_MIN),
      poolMax: Number(process.env.ID_DB_CONFIG_POOL_MAX),
    },
  },
  logger: {
    silenceResponse: process.env.ID_LOG_SILENCE_RESPONSE ? process.env.ID_LOG_SILENCE_RESPONSE === 'true' : false,
  },
  auth: {
    jwtSecretKey: process.env.ID_JWT_SECRET_KEY,
    sudory_x_auth_token: process.env.ID_SUDORY_X_AUTH_TOKEN || 'SUDORY',
    x_auth_token: process.env.ID_X_AUTH_TOKEN || 'Bearer ID',
  },
  aws: {
    endpoint: process.env.ID_AWS_PRICING_ENDPOINT,
  },
};
