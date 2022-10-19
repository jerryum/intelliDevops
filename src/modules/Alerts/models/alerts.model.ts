import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IAlert } from '@/common/interfaces/alerts.interface';

export type AlertCreationAttributes = Optional<
  IAlert,
  'alertKey' | 'alertId' | 'alertName' | 'alertStatus' | 'alertLabels' | 'alertAnnotations' | 'createdAt' | 'updatedAt' | 'clusterId'
>;

export class AlertModel extends Model<IAlert, AlertCreationAttributes> implements IAlert {
  public alertKey: number;
  public alertId: string;
  public alertName: string;
  public alertStatus: string;
  public alertLabels: object;
  public alertAnnotations: object;
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

      alertStatus: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      alertAnnotations: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      alertLabels: {
        type: DataTypes.JSON,
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
          fields: ['alert_Id'],
        },
        {
          unique: false,
          fields: ['cluster_Id'],
        },
      ],
      tableName: 'Alert',
      modelName: 'Alert',
      sequelize,
    },
  );
  return AlertModel;
}
