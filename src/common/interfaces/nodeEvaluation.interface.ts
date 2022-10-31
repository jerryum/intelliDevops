export interface INodeEvaluation {
  nodeEvaluationKey: number;
  nodeName: string;
  nodeAnomalyEvaluaton: boolean;
  nodeMetricKey: number;
  createdAt: Date;
  evaluatedAt: Date;
}
