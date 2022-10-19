import { HttpException } from '@/common/exceptions/HttpException';
import DB from '@/database';
//import config from '@/config';
import { isEmpty } from '@/common/utils/util';
//import { IAlert } from '@/common/interfaces/alerts.interface';

class AlertService {
  public alert = DB.Alert;

  public async processAlertManagerWebhook(alertStatus: string, alertAnnotations: object, alertLabels: object): Promise<object> {
    if (isEmpty(alertStatus)) throw new HttpException(400, 'Missing alert status');
    if (isEmpty(alertAnnotations)) throw new HttpException(401, 'Missing alert status');
    if (isEmpty(alertLabels)) throw new HttpException(401, 'Missing alert status');
    /*
    const scheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: clusterId, scheduleStatus: 'AC' } });
    if (!scheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the cluster id ${clusterId} information in the database`);
*/
    return;
  }
}

export default AlertService;
