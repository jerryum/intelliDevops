import { NextFunction, Request, Response } from 'express';
import AwsService from '@/modules/Costs/services/aws.service';

class AwsController {
  public awsService = new AwsService();

  public getFiringAlerts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const from = req.query.from as string;
      const to = req.query.to as string;

      const getAlerts = await this.awsService.getFiringAlerts(from, to);
      res.status(200).json({ data: getAlerts, message: 'Pullled firing alerts successfully' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public getAwsPricing = async (req: Request, res: Response, next: NextFunction) => {
    const serviceCode = req.params.serviceCode;
    try {
      const data = await this.awsService.getAwsPricing(serviceCode);
      res.status(200).json({ data: data, message: 'success' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
export default AwsController;
