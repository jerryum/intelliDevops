import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ISchedule } from '@/common/interfaces/schedule.interface';

export type ScheduleCreationAttributes = Optional<
  ISchedule,
  | 'scheduleKey'
  | 'scheduleName'
  | 'scheduleSummary'
  | 'scheduleApiUrl'
  | 'scheduleCronTab'
  | 'scheduleApiBody'
  | 'scheduleFrom'
  | 'scheduleTo'
  | 'createdAt'
  | 'updatedAt'
  | 'cancelledAt'
>;

export class ScheduleModel extends Model<ISchedule, ScheduleCreationAttributes> implements ISchedule {
    public scheduleKey: number;
    public scheduleName: string;
    public scheduleSummary: string;
    public createdAt: Date;
    public updatedAt: Date;
    public cancelledAt: Date;
    public scheduleApiUrl: string;
    public scheduleCronTab: string;
    public scheduleApiBody: JSON;
    public scheduleFrom: Date;
    public scheduleTo: Date;
}

export default function (sequelize: Sequelize): typeof ScheduleModel {
  ScheduleModel.init(
    {
      scheduleKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      scheduleName: {
        type: DataTypes.STRING(100),
        allowNull: false
      },

      scheduleSummary: {
        type: DataTypes.STRING(500),
        allowNull: true
      },

      createdAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE(),
      },

      cancelledAt: {
        type: DataTypes.DATE(),
      },

      scheduleApiUrl: {
        type: DataTypes.STRING(500),
      },

      scheduleCronTab: {
        type: DataTypes.STRING(50),
      },

      scheduleApiBody: {
        type: DataTypes.JSON,
      },

      scheduleFrom: {
        type: DataTypes.DATE(),
      },
      
      scheduleTo: {
        type: DataTypes.DATE(),
      },
    },
    {
      tableName: 'Scheduler',
      modelName: 'Scheduler',
      sequelize,
    },

  );
  return ScheduleModel;
}