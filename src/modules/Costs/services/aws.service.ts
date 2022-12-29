import { HttpException } from '@/common/exceptions/HttpException';
import DB from '@/database';
//import config from '@/config';
import { isEmpty } from '@/common/utils/util';
import { IAlertCommonLabels } from '@/modules/Alerts/dtos/alerts.dto';
import { IAlert } from '@/common/interfaces/alerts.interface';
import { INodeEvaluation } from '@/common/interfaces/nodeEvaluation.interface';
import { NodeEvaluationModel } from '@/modules/Alerts/models/nodeEvaluation.model';
import { PodEvaluationModel } from '@/modules/Alerts/models/podEvaluation.model';
import { PvcEvaluationModel } from '@/modules/Alerts/models/pvcEvaluation.model';
//import alertsModel from '../models/alerts.model';
import { PricingClient, DescribeServicesCommand } from '@aws-sdk/client-pricing';

const { Op } = require('sequelize');
class AwsService {
  public alert = DB.Alert;
  public nodeEvaluation = DB.NodeEvaluation;
  public podEvaluation = DB.PodEvaluation;

  public async getFiringAlerts(from: string, to: string): Promise<object> {
    //check from / to's format
    if (isEmpty(from) || isEmpty(to)) {
      throw new HttpException(407, 'from and to required for ranged query');
    }
    const alertQuery = {
      where: { startsAt: { [Op.between]: [from, to] } },
      include: [
        { model: NodeEvaluationModel, required: false },
        { model: PodEvaluationModel, required: false },
        { model: PvcEvaluationModel, required: false },
      ],
    };
    const alerts: IAlert[] = await this.alert.findAll(alertQuery);

    return alerts;
  }

  public async getAwsPricing(serviceCode: string): Promise<object> {
    let data;
    try {
      const client = new PricingClient({ region: 'us-east-1' });
      const params = { ServiceCode: serviceCode };
      const command = new DescribeServicesCommand(params);
      console.log(command);

      data = await client.send(command);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    return data;
  }
}

export default AwsService;
