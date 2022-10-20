import { IsString, IsNotEmpty, IsNumber, IsDate } from 'class-validator';
import { feedbackType } from 'common/types';

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

export class IAlertFeedback {
  @IsString()
  @IsNotEmpty()
  public alertId: string;
  @IsString()
  @IsNotEmpty()
  public feedback: feedbackType;
  @IsString()
  @IsNotEmpty()
  public feedbackDescription: string;
}
