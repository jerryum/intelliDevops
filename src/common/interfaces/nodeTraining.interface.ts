//import { DoubleDataType } from 'sequelize/types';
//import { TextChange } from 'typescript';

export interface INodeTraining {
  nodeTrainingKey: number;
  trainingTimestamp: Date;
  nodeCpuUsage: number;
  nodeMemoryUsage: number;
  nodeFileUsage: number;
  nodeFileIo: number;
  nodeNetworkError: number;
  nodeNetworkPacketDrop: number;
  nodeContextSwitchesTotal: number;
  nodeCpuSecondsTotalUser: number;
  nodeCpuSecondsTotalSystem: number;
  nodeCpuSecondsTotalSteal: number;
  nodeCpuSecondsTotalIowait: number;
  nodeCpuSecondsTotalNice: number;
  nodeCpuSecondsTotalIrq: number;
  nodeCpuSecondsTotalSoftirq: number;
  nodeCpuSecondsTotalIdle: number;
  nodeVmstatPgmajfault: number;
  nodeVmstatOomKill: number;
  nodeMemoryMemavailableBytes: number;
  nodeMemorySwaptotalBytes: number;
  nodeNetworkSpeedBytes: number;
  nodeNetworkReceiveBytesTotal: number;
  nodeNetworkReceiveErrsTotal: number;
  nodeNetworkReceivePacketsTotal: number;
  nodeNetworkTransmitBytesTotal: number;
  nodeNetworkTransmitPacketsTotal: number;
  nodeNetworkTransmitErrsTotal: number;
  nodeDiskReadTimeSecondsTotal: number;
  nodeDiskReadsCompletedTotal: number;
  nodeFilesystemAvailBytesExt4: number;
  nodeFilesystemAvailBytesTmpfs: number;
  nodeFilesystemSizeBytesExt4: number;
  nodeFilesystemSizeBytesTmpfs: number;
  nodeFilesystemFilesFreeExt4: number;
  nodeFilesystemFilesFreeTmpfs: number;
  nodeFilesystemFilesExt4: number;
  nodeFilesystemFilesTmpfs: number;
  nodeMemoryMemtotalBytes: number;
  createdAt: Date;
  updatedAt: Date;
}
