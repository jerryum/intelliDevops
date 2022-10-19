import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IAlert } from '@/common/interfaces/alerts.interface';

export type AlertCreationAttributes = Optional<
  IAlert,
  'alertKey' | 'alertId' | 'alertName' | 'alertSummary' | 'createdAt' | 'updatedAt' | 'clusterId'
>;

export class AlertModel extends Model<IAlert, AlertCreationAttributes> implements IAlert {
  public alertKey: number;
  public alertId: string;
  public alertName: string;
  public alertSummary: string;
  public createdAt: Date;
  public updatedAt: Date;
  public clusterId: string;
}

export default function (sequelize: Sequelize): typeof AlertModel {
  AlertModel.init(
    {
      alertKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      alertId: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      alertName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      alertSummary: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },

      createdAt: {
        type: DataTypes.DATE(),
        allowNull: false,
      },

      updatedAt: {
        type: DataTypes.DATE(),
      },

      clusterId: {
        type: DataTypes.STRING(50),
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['alertId'],
        },
        {
          unique: false,
          fields: ['clusterId'],
        },
      ],
      tableName: 'Alert',
      modelName: 'Alert',
      sequelize,
    },
  );
  return AlertModel;
}
