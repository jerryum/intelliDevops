import { HttpException } from '@/common/exceptions/HttpException';
import DB from '@/database';
//import config from '@/config';
import { isEmpty } from '@/common/utils/util';
import { IAlertCommonLabels } from '@/modules/Alerts/dtos/alerts.dto';
import uuid from 'uuid';

class AlertService {
  public alert = DB.Alert;

  public async processAlertManagerWebhook(
    receiver: string,
    status: string,
    alerts: any,
    groupLabels: object,
    commonLabels: IAlertCommonLabels,
    commonAnnotations: object,
    externalURL: string,
    version: string,
    groupkey: object,
  ): Promise<object> {
    if (isEmpty(alerts)) throw new HttpException(400, 'Missing data of alerts');

    const alertId = uuid.v1();
    const bulkCreateSQL = [];

    for (let i = 0; alerts.length > i; i++) {
      const createSQL = {
        alertId: alertId,
        alertName: commonLabels.alertname,
        clusterName: commonLabels.clusterName || '',
        clusterId: commonLabels.clusterUuid || '',
        container: commonLabels.container || '',
        endpoint: commonLabels.endpoint || '',
        job: commonLabels.job || '',
        namespace: commonLabels.namespace || '',
        service: commonLabels.service || '',
        severity: commonLabels.severity || '',
        externalUrl: externalURL || '',
        status: alerts[i].status || '',
        instance: alerts[i].labels.instance || '',
        node: alerts[i].labels.node || '',
        pod: alerts[i].labels.pod || '',
        description: alerts[i].annotations.description || '',
        summary: alerts[i].annotations.summary || '',
        startsAt: alerts[i].startsAt || null,
        endsAt: alerts[i].endsAt || null,
      };
      bulkCreateSQL[i] = createSQL;
    }
    console.log(bulkCreateSQL);
    const createAlert = await this.alert.bulkCreate(bulkCreateSQL);
    if (!createAlert) throw new HttpException(500, `error to insert the alert data to DB`);

    return;
  }
}

export default AlertService;
