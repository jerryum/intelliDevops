import DB from '@/database';
import SchedulerService from '@/modules/Scheduler/services/scheduler.service';
import { Exception } from 'handlebars';
import config from '@/config';
import { ISchedule } from '@common/interfaces/schedule.interface';
import { v1 } from 'uuid';
/**
 * @memberof InitialRecordService
 */
class InitialRecordService {
  public scheduler = DB.Scheduler;
  public schedulerService = new SchedulerService();

  public async insertInitialRecords(): Promise<void> {
    // insert, update nc-notification schedule
    const notiScheduleDataList = [];

    try {
      await this.scheduler.bulkCreate(notiScheduleDataList, {
        fields: ['scheduleName', 'createdAt', 'scheduleApiUrl', 'scheduleId', 'scheduleCronTab', 'scheduleApiBody', 'scheduleStatus', 'reRunRequire'],
      });
    } catch (error) {
      throw new Exception(error);
    }
  }

  public async updateScheduler(): Promise<void> {
    try {
      const rescheduleResult = await this.schedulerService.scheduleOnStartUp();
      console.log(`Rescheduled services from the previous run:  ${rescheduleResult}`);

      const updateresults = await this.scheduler.update({ scheduleStatus: 'CA' }, { where: { scheduleStatus: ['AC'], reRunRequire: false } });
      console.log('Updated schedule jobs from AC status to CA status: ', updateresults);
    } catch (error) {
      throw new Exception(error);
    }
  }
}

export default InitialRecordService;
