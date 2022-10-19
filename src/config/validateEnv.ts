import { cleanEnv, email, host, num, port, str } from 'envalid';
/**
 * @method  validate a particular env.
 */
function validateEnv() {
  cleanEnv(process.env, {
    NC_AH_PORT: port(),
    NC_AH_ENV: str(),
    NC_AH_DB_CONFIG_HOST: str(),
    NC_AH_DB_CONFIG_USER: str(),
    NC_AH_DB_CONFIG_PASSWORD: str(),
    NC_AH_DB_CONFIG_DB_NAME: str(),
    NC_AH_DB_CONFIG_POOL_MIN: num(),
    NC_AH_DB_CONFIG_POOL_MAX: num(),
    NC_AH_LOG_FORMAT: str(),
    NC_AH_CORS_ORIGIN: str(),
    NC_AH_CORS_CREDENTIALS: str(),
    NC_AH_SUDORY_X_AUTH_TOKEN: str(),
  });
}

export default validateEnv;
