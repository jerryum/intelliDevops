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
    const {schedules: scheduleList} = config.initialRecord;

    //insert/update Schedule
    let scheduleDataList = [];
    let uuid = require('uuid');

    // let scheduleLength = scheduleList.length;
    for (const scheduleObj of scheduleList) {
      scheduleDataList.push({
        ...scheduleObj,
        createdAt: new Date(),
        scheduleId: uuid.v1(),
      });
    }

    try {
      await this.scheduler.bulkCreate(scheduleDataList, {
          fields: ["scheduleName", "scheduleId", "createdAt", "scheduleApiUrl", "scheduleCronTab", "scheduleApiBody", "reRunRequire"],
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
