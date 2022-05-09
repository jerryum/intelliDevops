import DB from '@/database';
/**
 * @memberof InitialRecordService
 */
class InitialRecordService {
    public scheduler = DB.Scheduler;
    public async updateScheduler(): Promise<void> {
        const updateresults = await this.scheduler.update({scheduleStatus: 'CA'}, {where: {scheduleStatus: "AC"}}); 
        console.log("Updated schedule jobs from AC status to CA status: ", updateresults);
    }
}

export default InitialRecordService;