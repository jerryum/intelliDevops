export interface IPodEvaluation {
  podEvaluationKey: number;
  podName: string;
  podAnomalyEvaluation: boolean;
  podMetricKey: number;
  createdAt: Date;
  evaluatedAt: Date;
  updatedAt: Date;
  clusterId: string;
}
