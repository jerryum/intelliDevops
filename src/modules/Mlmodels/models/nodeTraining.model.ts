import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { INodeTraining } from '@/common/interfaces/nodeTraining.interface';

export type NodeTrainingCreationAttributes = Optional<
  INodeTraining,
  | 'nodeTrainingKey'
  | 'trainingTimestamp'
  | 'nodeCpuUsage'
  | 'nodeMemoryUsage'
  | 'nodeFileUsage'
  | 'nodeFileIo'
  | 'nodeNetworkError'
  | 'nodeNetworkPacketDrop'
  | 'nodeContextSwitchesTotal'
  | 'nodeCpuSecondsTotalUser'
  | 'nodeCpuSecondsTotalSystem'
  | 'nodeCpuSecondsTotalSteal'
  | 'nodeCpuSecondsTotalIowait'
  | 'nodeCpuSecondsTotalNice'
  | 'nodeCpuSecondsTotalIrq'
  | 'nodeCpuSecondsTotalSoftirq'
  | 'nodeCpuSecondsTotalIdle'
  | 'nodeVmstatPgmajfault'
  | 'nodeVmstatOomKill'
  | 'nodeMemoryMemavailableBytes'
  | 'nodeMemorySwaptotalBytes'
  | 'nodeNetworkSpeedBytes'
  | 'nodeNetworkReceiveBytesTotal'
  | 'nodeNetworkReceiveErrsTotal'
  | 'nodeNetworkReceivePacketsTotal'
  | 'nodeNetworkTransmitBytesTotal'
  | 'nodeNetworkTransmitPacketsTotal'
  | 'nodeNetworkTransmitErrsTotal'
  | 'nodeDiskReadTimeSecondsTotal'
  | 'nodeDiskReadsCompletedTotal'
  | 'nodeFilesystemAvailBytesExt4'
  | 'nodeFilesystemAvailBytesTmpfs'
  | 'nodeFilesystemSizeBytesExt4'
  | 'nodeFilesystemSizeBytesTmpfs'
  | 'nodeFilesystemFilesFreeExt4'
  | 'nodeFilesystemFilesFreeTmpfs'
  | 'nodeFilesystemFilesExt4'
  | 'nodeFilesystemFilesTmpfs'
  | 'nodeMemoryMemtotalBytes'
  | 'createdAt'
  | 'updatedAt'
>;

export class NodeTrainingModel extends Model<INodeTraining, NodeTrainingCreationAttributes> implements INodeTraining {
  public nodeTrainingKey: number;
  public trainingTimestamp: Date;
  public nodeCpuUsage: number;
  public nodeMemoryUsage: number;
  public nodeFileUsage: number;
  public nodeFileIo: number;
  public nodeNetworkError: number;
  public nodeNetworkPacketDrop: number;
  public nodeContextSwitchesTotal: number;
  public nodeCpuSecondsTotalUser: number;
  public nodeCpuSecondsTotalSystem: number;
  public nodeCpuSecondsTotalSteal: number;
  public nodeCpuSecondsTotalIowait: number;
  public nodeCpuSecondsTotalNice: number;
  public nodeCpuSecondsTotalIrq: number;
  public nodeCpuSecondsTotalSoftirq: number;
  public nodeCpuSecondsTotalIdle: number;
  public nodeVmstatPgmajfault: number;
  public nodeVmstatOomKill: number;
  public nodeMemoryMemavailableBytes: number;
  public nodeMemorySwaptotalBytes: number;
  public nodeNetworkSpeedBytes: number;
  public nodeNetworkReceiveBytesTotal: number;
  public nodeNetworkReceiveErrsTotal: number;
  public nodeNetworkReceivePacketsTotal: number;
  public nodeNetworkTransmitBytesTotal: number;
  public nodeNetworkTransmitPacketsTotal: number;
  public nodeNetworkTransmitErrsTotal: number;
  public nodeDiskReadTimeSecondsTotal: number;
  public nodeDiskReadsCompletedTotal: number;
  public nodeFilesystemAvailBytesExt4: number;
  public nodeFilesystemAvailBytesTmpfs: number;
  public nodeFilesystemSizeBytesExt4: number;
  public nodeFilesystemSizeBytesTmpfs: number;
  public nodeFilesystemFilesFreeExt4: number;
  public nodeFilesystemFilesFreeTmpfs: number;
  public nodeFilesystemFilesExt4: number;
  public nodeFilesystemFilesTmpfs: number;
  public nodeMemoryMemtotalBytes: number;
  public createdAt: Date;
  public updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof NodeTrainingModel {
  NodeTrainingModel.init(
    {
      nodeTrainingKey: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      trainingTimestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      nodeCpuUsage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeMemoryUsage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFileUsage: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFileIo: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkError: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkPacketDrop: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeContextSwitchesTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalUser: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalSystem: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalSteal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalIowait: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalNice: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalIrq: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalSoftirq: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeCpuSecondsTotalIdle: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeVmstatPgmajfault: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeVmstatOomKill: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeMemoryMemavailableBytes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeMemorySwaptotalBytes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeMemoryMemtotalBytes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkSpeedBytes: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkReceiveBytesTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkReceiveErrsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkReceivePacketsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkTransmitBytesTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkTransmitPacketsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeNetworkTransmitErrsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeDiskReadTimeSecondsTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeDiskReadsCompletedTotal: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemAvailBytesExt4: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemAvailBytesTmpfs: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemSizeBytesExt4: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemSizeBytesTmpfs: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemFilesFreeExt4: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemFilesFreeTmpfs: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemFilesExt4: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      nodeFilesystemFilesTmpfs: {
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
      tableName: 'NodeTraining',
      modelName: 'NodeTraining',
      sequelize,
    },
  );
  return NodeTrainingModel;
}
