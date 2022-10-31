export interface INodeEvaluation {
  nodeEvaluationKey: number;
  nodeName: string;
  nodeAnomalyEvaluation: boolean;
  nodeMetricKey: number;
  createdAt: Date;
  evaluatedAt: Date;
}
