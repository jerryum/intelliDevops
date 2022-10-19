import { NextFunction, Request, Response } from 'express';
import AlertService from '@/modules/Alerts/services/alerts.service';
//import { IAlert } from '@/common/interfaces/alerts.interface';

class AlertController {
  public alertService = new AlertService();

  public processAlertManagerWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { alertStatus, alertAnnotations, alertLabels } = req.body;
      const responseCronCreate = await this.alertService.processAlertManagerWebhook(alertStatus, alertAnnotations, alertLabels);
      res.status(200).json({ data: responseCronCreate, message: 'Schedule request has been initiated' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
export default AlertController;
