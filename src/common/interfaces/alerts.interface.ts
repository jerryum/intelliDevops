export interface IAlert {
  alertKey: number;
  alertId: string;
  alertName: string;
  alertStatus: string;
  alertLabels: object;
  alertAnnotations: object;
  createdAt: Date;
  updatedAt: Date;
  clusterId: string;
}
