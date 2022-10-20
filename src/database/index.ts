import Sequelize from 'sequelize';
import { logger } from '@/common/utils/logger';
import AlertModel from '@/modules/Alerts/models/alerts.model';
import NodeEvaluationModel from '@/modules/Alerts/models/nodeEvaluation.model';
import NodeTrainingModel from '@/modules/Mlmodels/models/nodeTraining.model';
import config from 'config';
import InitialRecordService from './initialRecord';
import nodeEvaluationModel from '@/modules/Alerts/models/nodeEvaluation.model';

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
    acquire: 60000,
    idle: 10000,
  },
  logQueryParameters: config.nodeEnv === 'development',
  //  logging: console.log,
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Alert: AlertModel(sequelize),
  NodeEvaluation: NodeEvaluationModel(sequelize),
  NodeTraining: NodeTrainingModel(sequelize),

  sequelize, // connection instance (RAW queries)
};

DB.sequelize
  .sync({ force: false })
  .then(async () => {
    /*
    const event1pre = 'DROP EVENT IF EXISTS nc_cron.ev_delete_cancalled_schedule';
    const event1 = `CREATE EVENT nc_cron.ev_delete_cancalled_schedule ON SCHEDULE EVERY '1' DAY
                    STARTS (TIMESTAMP(CURRENT_DATE) + INTERVAL 1 DAY)
                    DO DELETE FROM nc_cron.Scheduler where cancelled_at < now() - interval 7 DAY;`;
    sequelize.query(event1pre);
    sequelize.query(event1);
    */
    const initialRecordService = new InitialRecordService();
    try {
      await initialRecordService.insertInitialRecords();
      await initialRecordService.updateScheduler();
      console.log('initialization success');
    } catch (e) {
      console.log(e);
    }
  })
  .catch(console.log);

export default DB;
