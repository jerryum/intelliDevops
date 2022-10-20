import { Router } from 'express';
import { Routes } from '@/common/interfaces/routes.interface';

import AlertController from '@/modules/Alerts/controllers/alerts.controller';
import { IAlertFeedback } from '@/modules/Alerts/dtos/alerts.dto';
//import AuthService from '@/modules/UserTenancy/services/auth.service';
import authMiddleware from '@/modules/ApiGateway/middlewares/auth.middleware';
import validationMiddleware from '@/common/middlewares/validation.middleware';

class AlertRoute implements Routes {
  public router = Router();
  public schedulerController = new AlertController();
  //  public authservice = new AuthService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/webhook/alerts', authMiddleware, this.schedulerController.processAlertManagerWebhook);
    this.router.post('/alerts/feedback', authMiddleware, validationMiddleware(IAlertFeedback, 'body'), this.schedulerController.postFeedback);
    this.router.get('/alerts', authMiddleware, this.schedulerController.getFiringAlerts);
  }
}

export default AlertRoute;
