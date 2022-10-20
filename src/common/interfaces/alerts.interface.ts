export interface IAlert {
  alertKey: number;
  alertId: string;
  alertName: string;
  status: string;
  severity: string;
  container: string;
  endpoint: string;
  job: string;
  namespace: string;
  prometheus: string;
  service: string;
  externalUrl: string;
  instance: string;
  node: string;
  pod: string;
  description: string;
  summary: string;
  startsAt: Date;
  endsAt: Date;
  createdAt: Date;
  updatedAt: Date;
  clusterId: string;
  clusterName: string;
  nodeMetricKey: number;
}
