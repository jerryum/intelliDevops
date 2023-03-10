import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IAlert } from '@/common/interfaces/alerts.interface';

export type AlertCreationAttributes = Optional<
  IAlert,
  | 'alertKey'
  | 'alertId'
  | 'alertName'
  | 'status'
  | 'severity'
  | 'container'
  | 'endpoint'
  | 'job'
  | 'namespace'
  | 'prometheus'
  | 'service'
  | 'externalUrl'
  | 'instance'
  | 'node'
  | 'pod'
  | 'persistentVolumeClaim'
  | 'description'
  | 'summary'
  | 'startsAt'
  | 'endsAt'
  | 'createdAt'
  | 'updatedAt'
  | 'clusterId'
  | 'clusterName'
  | 'nodeMetricKey'
  | 'podMetricKey'
  | 'pvcMetricKey'
  | 'feedback'
  | 'feedbackDescription'
  | 'labels'
>;

export class AlertModel extends Model<IAlert, AlertCreationAttributes> implements IAlert {
  public alertKey: number;
  public alertId: string;
  public alertName: string;
  public status: string;
  public severity: string;
  public container: string;
  public endpoint: string;
  public job: string;
  public namespace: string;
  public prometheus: string;
  public service: string;
  public externalUrl: string;
  public instance: string;
  public node: string;
  public pod: string;
  public persistentVolumeClaim: string;
  public description: string;
  public summary: string;
  public startsAt: Date;
  public endsAt: Date;
  public createdAt: Date;
  public updatedAt: Date;
  public clusterId: string;
  public clusterName: string;
  public nodeMetricKey: number;
  public podMetricKey: number;
  public pvcMetricKey: number;
  public feedback: string;
  public feedbackDescription: string;
  public labels: JSON;
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
        allowNull: true,
      },

      status: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      severity: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      container: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      endpoint: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      job: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      namespace: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      prometheus: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      service: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      externalUrl: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      instance: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      node: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      pod: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      persistentVolumeClaim: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },

      description: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },

      summary: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },

      startsAt: {
        type: DataTypes.DATE(),
      },

      endsAt: {
        type: DataTypes.DATE(),
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

      clusterName: {
        type: DataTypes.STRING(50),
      },

      nodeMetricKey: {
        type: DataTypes.INTEGER,
      },

      podMetricKey: {
        type: DataTypes.INTEGER,
      },

      pvcMetricKey: {
        type: DataTypes.INTEGER,
      },

      feedback: {
        type: DataTypes.STRING(50),
      },

      feedbackDescription: {
        type: DataTypes.STRING(500),
      },

      labels: {
        type: DataTypes.JSON,
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
        {
          unique: false,
          fields: ['starts_at'],
        },
      ],
      tableName: 'Alert',
      modelName: 'Alert',
      sequelize,
    },
  );
  return AlertModel;
}
