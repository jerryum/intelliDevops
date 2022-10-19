import DB from '@/database';
import AlertService from '@/modules/Alerts/services/alerts.service';
import { Exception } from 'handlebars';
//import config from '@/config';
//import { v1 } from 'uuid';
/**
 * @memberof InitialRecordService
 */
class InitialRecordService {
  public alert = DB.Alert;
  public alertService = new AlertService();

  public async insertInitialRecords(): Promise<void> {
    // insert, update nc-notification schedule
  }

  public async updateScheduler(): Promise<void> {
    try {
    } catch (error) {
      throw new Exception(error);
    }
  }
}

export default InitialRecordService;
