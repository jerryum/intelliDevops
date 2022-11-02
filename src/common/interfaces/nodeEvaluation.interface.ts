export interface INodeEvaluation {
  nodeEvaluationKey: number;
  nodeName: string;
  clusterId: string;
  nodeAnomalyEvaluation: boolean;
  nodeMetricKey: number;
  createdAt: Date;
  evaluatedAt: Date;
  updatedAt: Date;
}
