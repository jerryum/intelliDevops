import { HttpException } from '@/common/exceptions/HttpException';
import DB from '@/database';
//import config from '@/config';
import { isEmpty } from '@/common/utils/util';
import { IAlertCommonLabels } from '@/modules/Alerts/dtos/alerts.dto';
import { INodeEvaluation } from '@/common/interfaces/nodeEvaluation.interface';

const { Op } = require('sequelize');
class AlertService {
  public alert = DB.Alert;
  public nodeEvaluation = DB.NodeEvaluation;

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

    const uuid = require('uuid');
    const alertId = uuid.v1();
    const bulkCreateSQL = [];

    for (let i = 0; alerts.length > i; i++) {
      const annotations = JSON.parse(JSON.stringify(alerts[i].annotations));
      const labels = JSON.parse(JSON.stringify(alerts[i].labels));
      const currentTime = new Date();
      const node = labels.node;
      const startsAt = alerts[i].startsAt;
      let nodeMetricKey;
      if (status === 'firing') {
        const searchQuery = { where: { evaluatedAt: { [Op.between]: [startsAt, currentTime] }, nodeName: node, nodeAnomalyEvaluation: true } };
        const nodeEvaluations: INodeEvaluation[] = await this.nodeEvaluation.findAll(searchQuery);

        if (nodeEvaluations) {
          if (nodeEvaluations.length === 1) nodeMetricKey = nodeEvaluations[0].nodeMetricKey;
          else {
            //more than 1 evaluation record, pull the most recent data
            const nodeEvaluation = nodeEvaluations.reduce((a, b) => (a.evaluatedAt > b.evaluatedAt ? a : b));
            nodeMetricKey = nodeEvaluation.nodeMetricKey;
          }
        } else {
          nodeMetricKey = '';
        }
      }

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
        status: status || '',
        instance: labels.instance || '',
        node: labels.node || '',
        pod: labels.pod || '',
        description: annotations.description || '',
        summary: annotations.summary || '',
        startsAt: alerts[i].startsAt || null,
        endsAt: alerts[i].endsAt || null,
        nodeMetricKey: nodeMetricKey,
      };
      bulkCreateSQL[i] = createSQL;
    }

    const createAlert = await this.alert.bulkCreate(bulkCreateSQL);
    if (!createAlert) throw new HttpException(500, `error to insert the alert data to DB`);

    return;
  }
}

export default AlertService;
