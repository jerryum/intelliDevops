import { Router } from 'express';
import { Routes } from '@/common/interfaces/routes.interface';

import AwsController from '@/modules/Costs/controllers/aws.controller';
import { IAlertFeedback } from '@/modules/Alerts/dtos/alerts.dto';
//import AuthService from '@/modules/UserTenancy/services/auth.service';
import authMiddleware from '@/modules/ApiGateway/middlewares/auth.middleware';
import validationMiddleware from '@/common/middlewares/validation.middleware';

class AwsRoute implements Routes {
  public router = Router();
  public awsController = new AwsController();
  //  public authservice = new AuthService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/awsprice/:serviceCode', authMiddleware, this.awsController.getAwsPricing);
  }
}

export default AwsRoute;
