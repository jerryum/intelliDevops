import { Router } from 'express';
import { Routes } from '@/common/interfaces/routes.interface';
import AlertController from '@/modules/Alerts/controllers/alerts.controller';
//import AuthService from '@/modules/UserTenancy/services/auth.service';
import authMiddleware from '@/modules/ApiGateway/middlewares/auth.middleware';

class AlertRoute implements Routes {
  public router = Router();
  public schedulerController = new AlertController();
  //  public authservice = new AuthService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/alertWebhook', authMiddleware, this.schedulerController.processAlertManagerWebhook);
  }
}

export default AlertRoute;
