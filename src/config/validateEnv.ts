import { cleanEnv, email, host, num, port, str } from 'envalid';
/**
 * @method  validate a particular env.
 */
function validateEnv() {
  cleanEnv(process.env, {
    ID_PORT: port(),
    ID_ENV: str(),
    ID_DB_CONFIG_HOST: str(),
    ID_DB_CONFIG_USER: str(),
    ID_DB_CONFIG_PASSWORD: str(),
    ID_DB_CONFIG_DB_NAME: str(),
    ID_DB_CONFIG_POOL_MIN: num(),
    ID_DB_CONFIG_POOL_MAX: num(),
    ID_LOG_FORMAT: str(),
    ID_CORS_ORIGIN: str(),
    ID_CORS_CREDENTIALS: str(),
    ID_SUDORY_X_AUTH_TOKEN: str(),
  });
}

export default validateEnv;
