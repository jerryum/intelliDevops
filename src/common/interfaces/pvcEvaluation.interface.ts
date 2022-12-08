export interface IPvcEvaluation {
  pvcEvaluationKey: number;
  pvcName: string;
  pvcAnomalyEvaluation: boolean;
  pvcMetricKey: number;
  createdAt: Date;
  evaluatedAt: Date;
  updatedAt: Date;
  clusterId: string;
}
