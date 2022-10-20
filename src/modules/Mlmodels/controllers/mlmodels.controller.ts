import { NextFunction, Request, Response } from 'express';
import MlmodelService from '@/modules/Mlmodels/services/mlmodels.service';
//import { IAlert } from '@/common/interfaces/alerts.interface';

class MlmodelController {
  public mlmodelService = new MlmodelService();

  public getModelTrainingHisotry = async (req: Request, res: Response, next: NextFunction) => {
    try {
      //console.log('req body----------', req.body);
      const from = req.query.from as string;
      const to = req.query.from as string;
      const modelType = req.params.modelType;
      const responseCronCreate = await this.mlmodelService.getModelTrainingHisotry(from, to, modelType);
      res.status(200).json({ data: responseCronCreate, message: 'Provide ML model training history' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
export default MlmodelController;
