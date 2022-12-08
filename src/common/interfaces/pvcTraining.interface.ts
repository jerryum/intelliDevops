export interface IPvcTraining {
  pvcTrainingKey: number;
  trainingTimestamp: Date;
  pvcUtilization: number;
  pvcStatus: number;
  kubelet_volume_stats_available_bytes: number;
  kubelet_volume_stats_capacity_bytes: number;
  kube_persistentvolumeclaim_status_lost: number;
  kube_persistentvolumeclaim_status_pending: number;
  kube_persistentvolumeclaim_status_failed: number;
  createdAt: Date;
  updatedAt: Date;
}
