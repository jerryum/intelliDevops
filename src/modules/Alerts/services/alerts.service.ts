import { HttpException } from '@/common/exceptions/HttpException';
import DB from '@/database';
//import config from '@/config';
import { isEmpty } from '@/common/utils/util';
import { IAlertCommonLabels } from '@/modules/Alerts/dtos/alerts.dto';
import { IAlert } from '@/common/interfaces/alerts.interface';
import { INodeEvaluation } from '@/common/interfaces/nodeEvaluation.interface';
//import alertsModel from '../models/alerts.model';

const { Op } = require('sequelize');
class AlertService {
  public alert = DB.Alert;
  public nodeEvaluation = DB.NodeEvaluation;
  public podEvaluation = DB.PodEvaluation;

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
    const bulkCreateSQL = [];

    for (let i = 0; alerts.length > i; i++) {
      const annotations = JSON.parse(JSON.stringify(alerts[i].annotations));
      const labels = JSON.parse(JSON.stringify(alerts[i].labels));
      const currentTime = new Date();
      const node = labels.node || '';
      const pod = labels.pod || '';
      const alertId = uuid.v1();

      let nodeMetricKey = null;
      let podMetricKey = null;
      let createSQL = {};

      if (node != '') {
        if (status === 'firing') {
          const searchQuery = {
            where: { evaluatedAt: { [Op.between]: [alerts[i].startsAt, currentTime] }, nodeName: node, nodeAnomalyEvaluation: true },
            order: [['evaluatedAt', 'DESC']],
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const nodeEvaluations: INodeEvaluation[] = await this.nodeEvaluation.findAll(searchQuery);
          console.log('node:', node);
          console.log('nodeEvaluations', JSON.stringify(nodeEvaluations[0]));
          console.log('Node Array length', nodeEvaluations.length);
          if (nodeEvaluations.length > 0) {
            nodeMetricKey = nodeEvaluations[0].nodeMetricKey;
            console.log('nodeMetricKey', nodeMetricKey);
          }
        }
      }

      if (pod != '') {
        if (status === 'firing') {
          const searchQuery = {
            where: { evaluatedAt: { [Op.between]: [alerts[i].startsAt, currentTime] }, podName: node, podAnomalyEvaluation: true },
            order: [['evaluatedAt', 'DESC']],
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const podEvaluations: IPodEvaluation[] = await this.podEvaluation.findAll(searchQuery);
          console.log('Pod Array length', podEvaluations.length);
          if (podEvaluations.length > 0) {
            podMetricKey = podEvaluations[0].podMetricKey;
            console.log('podMetricKey', podMetricKey);
          }
        }
      }

      createSQL = {
        alertId: alertId,
        alertName: labels.alertname || commonLabels.alertname,
        clusterName: labels.clusterName || commonLabels.clusterName || '',
        clusterId: labels.clusterUuid || commonLabels.clusterUuid || '',
        container: labels.container || commonLabels.container || '',
        endpoint: labels.endpoint || commonLabels.endpoint || '',
        job: labels.job || commonLabels.job || '',
        namespace: labels.namespace || commonLabels.namespace || '',
        service: labels.service || commonLabels.service || '',
        severity: labels.severity || commonLabels.severity || '',
        externalUrl: externalURL || '',
        status: status || '',
        instance: labels.instance || '',
        node: labels.node || '',
        pod: labels.pod || '',
        description: annotations.description || '',
        summary: annotations.summary || '',
        startsAt: alerts[i].startsAt || null,
        endsAt: alerts[i].endsAt || null,
        nodeMetricKey: nodeMetricKey || null,
        podMetricKey: podMetricKey || null,
        labels: labels,
      };
      console.log(createSQL);
      bulkCreateSQL[i] = createSQL;
    }

    const createAlert = await this.alert.bulkCreate(bulkCreateSQL);
    if (!createAlert) throw new HttpException(500, `error to insert the alert data to DB`);

    return;
  }

  public async getFiringAlerts(from: string, to: string): Promise<object> {
    //check from / to's format
    if (isEmpty(from) || isEmpty(to)) {
      throw new HttpException(407, 'from and to required for ranged query');
    }
    const alertQuery = { where: { startsAt: { [Op.between]: [from, to] } } };
    const alerts: IAlert[] = await this.alert.findAll(alertQuery);

    return alerts;
  }

  public async postFeedback(alertId: string, feedback: string, feedbackDescription: string): Promise<object> {
    const readAlert: IAlert = await this.alert.findOne({ where: { alertId: alertId } });
    if (!readAlert) {
      throw new HttpException(407, `can't find alert`);
    }
    await this.alert.update({ feedback: feedback, feedbackDescription: feedbackDescription }, { where: { alertId: alertId } });
    const responseMessage = { alertId: alertId, feedback: feedback, feedbackDescription: feedbackDescription };
    return responseMessage;
  }
}

export default AlertService;
