import { cleanEnv, email, host, num, port, str } from 'envalid';
/**
 * @method  validate a particular env.
 */
function validateEnv() {
  cleanEnv(process.env, {
    NC_CRON_PORT: port(),
    NC_CRON_ENV: str(),
    NC_CRON_DB_CONFIG_HOST: str(),
    NC_CRON_DB_CONFIG_USER: str(),
    NC_CRON_DB_CONFIG_PASSWORD: str(),
    NC_CRON_DB_CONFIG_DB_NAME: str(),
    NC_CRON_DB_CONFIG_POOL_MIN: num(),
    NC_CRON_DB_CONFIG_POOL_MAX: num(),
    NC_CRON_LOG_FORMAT: str(),
    NC_CRON_CORS_ORIGIN: str(),
    NC_CRON_CORS_CREDENTIALS: str(),
  });
}

export default validateEnv;
