import DB from '@/database';
import SchedulerService from '@/modules/Scheduler/services/scheduler.service'
import { Exception } from 'handlebars';
import { exceptions } from 'winston';
import config from "@/config";
/**
 * @memberof InitialRecordService
 */
class InitialRecordService {
    public scheduler = DB.Scheduler;
    public schedulerService = new SchedulerService();

  public async insertInitialRecords(): Promise<void> {
    const { schedules: scheduleList } = config.initialRecord;

    //insert/update Schedule
    let scheduleDataList = [];
    // let scheduleLength = scheduleList.length;
    for (const scheduleObj of scheduleList) {
      //TODO: have to find schedule columns data
      // I don't know how make scheduleID make,
      scheduleDataList.push({
        ...scheduleObj,
        createdAt: new Date(),
      });
    }

    try {
      await this.scheduler.bulkCreate(scheduleDataList,{
          fields: ["scheduleName", "scheduleId", "createdAt", "scheduleApiUrl", "scheduleCronTab", "scheduleApiBody", "reRunRequire"],
          updateOnDuplicate: ["scheduleName"]
        }
      );

    } catch (error) {
      console.log("bulk create error: ", error)
    }

  }

  public async updateScheduler(): Promise<void> {
      try {
          const rescheduleResult = await this.schedulerService.scheduleOnStartUp();
          console.log (`Rescheduled services from the previous run:  ${rescheduleResult}`);

          const updateresults = await this.scheduler.update({scheduleStatus: 'CA'}, {where: {scheduleStatus: ["AC"], reRunRequire: false}});
          console.log("Updated schedule jobs from AC status to CA status: ", updateresults);
      }
       catch (error) {
          throw new Exception (error);
      }
  }
}

export default InitialRecordService;
