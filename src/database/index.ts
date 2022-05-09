import Sequelize from 'sequelize';
import { logger } from '@/common/utils/logger';
import schedulerModel, { ScheduleModel } from '@/modules/Scheduler/models/scheduler.model';
import config from 'config';
import InitialRecordService from './initialRecord';

const host = config.db.mariadb.host;
const port = config.db.mariadb.port || 3306;
const user = config.db.mariadb.user;
const password = config.db.mariadb.password;
const database = config.db.mariadb.dbName;
const pool = {
  min: config.db.mariadb.poolMin,
  max: config.db.mariadb.poolMax,
};

const sequelize = new Sequelize.Sequelize(database, user, password, {
  host,
  port,
  dialect: 'mariadb',
  timezone: '+00:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: pool.min,
    max: pool.max,
  },
  logQueryParameters: config.nodeEnv === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Scheduler: schedulerModel(sequelize),
  sequelize, // connection instance (RAW queries)
};

DB.sequelize
  .sync({ force: false })
  .then(async () => {
    const initialRecordService = new InitialRecordService();

    initialRecordService.updateScheduler().then(() => {
      console.log('Database connected successfully');
    });
  })
  .catch(console.log);


export default DB;
