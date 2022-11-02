import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { IPodTraining } from '@/common/interfaces/podTraining.interface';

export type PodTrainingCreationAttributes = Optional<
  IPodTraining,
  | 'podTrainingKey'
  | 'trainingTimestamp'
  | 'podCpuUsage'
  | 'podMemoryUsage'
  | 'podFileUsage'
  | 'podFileIo'
  | 'podNetworkError'
  | 'podNetworkPacketDrop'
  | 'containerCpuCfsThrottledSecondsTotal'
  | 'containerCpuSystemSecondsTotal'
  | 'containerCpuUsageSecondsTotal'
  | 'containerCpuUserSecondsTotal'
  | 'containerMemoryUsageBytes'
  | 'containerMemoryWorkingSetBytes'
  | 'containerNetworkTransmitBytesTotal'
  | 'kubePodContainerInfo'
  | 'kubePodContainerResourceLimits'
  | 'kubePodContainerResourceRequests'
  | 'kubePodContainerStatusReady'
  | 'kubePodContainerStatusRunning'
  | 'createdAt'
  | 'updatedAt'
>;

export class PodTrainingModel extends Model<IPodTraining, PodTrainingCreationAttributes> implements IPodTraining {
  public podTrainingKey: number;
  public trainingTimestamp: Date;
  public podCpuUsage: number;
  public podMemoryUsage: number;
  public podFileUsage: number;
  public podFileIo: number;
  public podNetworkError: number;
  public podNetworkPacketDrop: number;
  public containerCpuCfsThrottledSecondsTotal: number;
  public containerCpuSystemSecondsTotal: number;
  public containerCpuUsageSecondsTotal: number;
  public containerCpuUserSecondsTotal: number;
  public containerMemoryUsageBytes: number;
  public containerMemoryWorkingSetBytes: number;
  public containerNetworkTransmitBytesTotal: number;
  public kubePodContainerInfo: number;
  public kubePodContainerResourceLimits: number;
  public kubePodContainerResourceRequests: number;
  public kubePodContainerStatusReady: number;
  public kubePodContainerStatusRunning: number;
  public createdAt: Date;
  public updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof PodTrainingModel {
  PodTrainingModel.init(
    {
      podTrainingKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      trainingTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      podCpuUsage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      podMemoryUsage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      podFileUsage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      podFileIo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      podNetworkError: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      podNetworkPacketDrop: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      containerCpuCfsThrottledSecondsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      containerCpuSystemSecondsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      containerCpuUsageSecondsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      containerCpuUserSecondsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      containerMemoryUsageBytes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      containerMemoryWorkingSetBytes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      containerNetworkTransmitBytesTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      kubePodContainerInfo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      kubePodContainerResourceLimits: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      kubePodContainerResourceRequests: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      kubePodContainerStatusReady: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      kubePodContainerStatusRunning: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },

      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['training_timestamp'],
        },
      ],
      tableName: 'PodTraining',
      modelName: 'PodTraining',
      sequelize,
    },
  );
  return PodTrainingModel;
}
