import { NextFunction, Request, Response } from 'express';
import AlertService from '@/modules/Alerts/services/alerts.service';
//import { IAlert } from '@/common/interfaces/alerts.interface';

class AlertController {
  public alertService = new AlertService();

  public processAlertManagerWebhook = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('webhookbody', req.body);
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

  public getFiringAlerts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const from = req.query.from as string;
      const to = req.query.to as string;

      const getAlerts = await this.alertService.getFiringAlerts(from, to);
      res.status(200).json({ data: getAlerts, message: 'Pullled firing alerts successfully' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public postFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { alertId, feedback, feedbackDescription } = req.body;
      console.log(req.body);
      const getAlerts = await this.alertService.postFeedback(alertId, feedback, feedbackDescription);
      res.status(200).json({ data: getAlerts, message: 'Updated alerts feedback successfully' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
export default AlertController;
