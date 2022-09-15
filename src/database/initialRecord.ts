import DB from '@/database';
import SchedulerService from '@/modules/Scheduler/services/scheduler.service'
import {Exception} from 'handlebars';
import {exceptions} from 'winston';
import config from "@/config";

/**
 * @memberof InitialRecordService
 */
class InitialRecordService {
  public scheduler = DB.Scheduler;
  public schedulerService = new SchedulerService();

  public async insertInitialRecords(): Promise<void> {

    // insert, update nc-notification schedule
    const {notificationSchedules: notiScheduleList, notificationUrl: notiUrl} = config.initialRecord;

    //insert/update nc-notification Schedule
    let notiScheduleDataList = [];

    for (const scheduleObj of notiScheduleList) {
      let url = notiUrl + scheduleObj.scheduleUrlPath
      notiScheduleDataList.push({
        ...scheduleObj,
        scheduleApiUrl: url,
        createdAt: new Date(),
      });
    }

    try {
      await this.scheduler.bulkCreate(notiScheduleDataList, {
          fields: ["scheduleName", "createdAt", "scheduleApiUrl", "scheduleCronTab", "scheduleApiBody", "scheduleStatus", "reRunRequire"],
        }
      );

    } catch (error) {
      console.log("bulk create error: ", error)
    }
  }

  public async updateScheduler(): Promise<void> {
    try {
      const rescheduleResult = await this.schedulerService.scheduleOnStartUp();
      console.log(`Rescheduled services from the previous run:  ${rescheduleResult}`);

      const updateresults = await this.scheduler.update({scheduleStatus: 'CA'}, {
        where: {
          scheduleStatus: ["AC"],
          reRunRequire: false
        }
      });
      console.log("Updated schedule jobs from AC status to CA status: ", updateresults);
    } catch (error) {
      throw new Exception(error);
    }
  }
}

export default InitialRecordService;
