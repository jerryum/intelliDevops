//import { DoubleDataType } from 'sequelize/types';
//import { TextChange } from 'typescript';

export interface IPodTraining {
  podTrainingKey: number;
  trainingTimestamp: Date;
  podCpuUsage: number;
  podMemoryUsage: number;
  podFileUsage: number;
  podFileIo: number;
  podNetworkError: number;
  podNetworkPacketDrop: number;
  containerCpuCfsThrottledSecondsTotal: number;
  containerCpuSystemSecondsTotal: number;
  containerCpuUsageSecondsTotal: number;
  containerCpuUserSecondsTotal: number;
  containerMemoryUsageBytes: number;
  containerMemoryWorkingSetBytes: number;
  containerNetworkTransmitBytesTotal: number;
  kubePodContainerInfo: number;
  kubePodContainerResourceLimits: number;
  kubePodContainerResourceRequests: number;
  kubePodContainerStatusReady: number;
  kubePodContainerStatusRunning: number;
  createdAt: Date;
  updatedAt: Date;
}
