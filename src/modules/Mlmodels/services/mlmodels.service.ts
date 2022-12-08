import DB from '@/database';
import { INodeTrainingRead, IPvcTrainingRead } from '@/modules/Mlmodels/dtos/mlmodels.dto';
import { IPodTrainingRead } from '@/modules/Mlmodels/dtos/mlmodels.dto';
import { isEmpty } from 'lodash';
import { HttpException } from '@/common/exceptions/HttpException';
import { IAlert } from '@/common/interfaces/alerts.interface';

const { Op } = require('sequelize');
class MlmodelService {
  public nodeTraining = DB.NodeTraining;
  public podTraining = DB.PodTraining;
  public pvcTraining = DB.PvcTraining;
  public alert = DB.Alert;

  public async getModelTrainingHisotry(from: string, to: string, modelType: string): Promise<object> {
    //check from / to's format
    if (isEmpty(from) || isEmpty(to)) {
      throw new HttpException(407, 'from and to required for ranged query');
    }
    let result = [];
    //modelType = node or pod or pvc
    if (modelType == 'node') {
      const nodeQuery = { where: { trainingTimestamp: { [Op.between]: [from, to] } } };
      const trainingHistoryNode: INodeTrainingRead[] = await this.nodeTraining.findAll(nodeQuery);
      result = trainingHistoryNode;
    } else if (modelType === 'pod') {
      const podQuery = { where: { trainingTimestamp: { [Op.between]: [from, to] } } };
      const trainingHistoryPod: IPodTrainingRead[] = await this.podTraining.findAll(podQuery);
      result = trainingHistoryPod;
    } else if (modelType === 'pvc') {
      const pvcQuery = { where: { trainingTimestamp: { [Op.between]: [from, to] } } };
      const trainingHistoryPvc: IPvcTrainingRead[] = await this.pvcTraining.findAll(pvcQuery);
      result = trainingHistoryPvc;
    }

    return result;
  }
}

export default MlmodelService;
