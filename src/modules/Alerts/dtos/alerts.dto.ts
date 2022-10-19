//import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
//import { json } from 'sequelize';
export interface IAlertCommonLabels {
  alertname: string;
  clusterName: string;
  clusterUuid: string;
  container: string;
  endpoint: string;
  job: string;
  namespace: string;
  service: string;
  severity: string;
}
