import DB from '@/database';
import SchedulerService from '@/modules/Scheduler/services/scheduler.service'
import { Exception } from 'handlebars';
import { exceptions } from 'winston';
/**
 * @memberof InitialRecordService
 */
class InitialRecordService {
    public scheduler = DB.Scheduler;
    public schedulerServcice = new SchedulerService();

    public async updateScheduler(): Promise<void> {
        try {
            const rescheduleResult = await this.schedulerServcice.scheduleOnStartUp();
            console.log (`Rescheduled services from the previous run:  ${rescheduleResult}`);
    
//            const updateresults = await this.scheduler.update({scheduleStatus: 'CA'}, {where: {scheduleStatus: ["AC"], reRunRequire: false}}); 
//            console.log("Updated schedule jobs from AC status to CA status: ", updateresults);
        }
         catch (error) {
            throw new Exception (error); 
        }    
    }
}

export default InitialRecordService;