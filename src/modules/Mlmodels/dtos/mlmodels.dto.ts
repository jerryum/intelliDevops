export class INodeTrainingRead {
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

export class IPodTrainingRead {
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

export class IPvcTrainingRead {
  public pvcTrainingKey: number;
  public trainingTimestamp: Date;
  public pvcUtilization: number;
  public pvcStatus: number;
  public kubelet_volume_stats_available_bytes: number;
  public kubelet_volume_stats_capacity_bytes: number;
  public kube_persistentvolumeclaim_status_lost: number;
  public kube_persistentvolumeclaim_status_pending: number;
  public kube_persistentvolumeclaim_status_failed: number;
  public createdAt: Date;
  public updatedAt: Date;
}
