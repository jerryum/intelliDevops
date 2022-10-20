import { Router } from 'express';
import { Routes } from '@/common/interfaces/routes.interface';
import MlmodelsController from '@/modules/Mlmodels/controllers/mlmodels.controller';
//import AuthService from '@/modules/UserTenancy/services/auth.service';
import authMiddleware from '@/modules/ApiGateway/middlewares/auth.middleware';

class MlmodelsRoute implements Routes {
  public router = Router();
  public mlmodelsController = new MlmodelsController();
  //  public authservice = new AuthService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/model/training/:modelType', authMiddleware, this.mlmodelsController.getModelTrainingHisotry);
  }
}

export default MlmodelsRoute;
