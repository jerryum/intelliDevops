import { NextFunction, Request, Response } from 'express';
import AlertService from '@/modules/Alerts/services/alerts.service';
//import { IAlert } from '@/common/interfaces/alerts.interface';

class AlertController {
  public alertService = new AlertService();

  public processAlertManagerWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { receiver, status, groupLabels, commonLabels, commonAnnotations, externalURL, version, groupKey } = req.body;
      let alerts = [];
      alerts = req.body.alerts;
      const responseCronCreate = await this.alertService.processAlertManagerWebhook(
        receiver,
        status,
        alerts,
        groupLabels,
        commonLabels,
        commonAnnotations,
        externalURL,
        version,
        groupKey,
      );
      res.status(200).json({ data: responseCronCreate, message: 'Alertmanager webhook request is well processed' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
export default AlertController;
