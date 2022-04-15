import { HttpException } from '@/common/exceptions/HttpException';
import { CreateCronScheduleDto } from '../dto/scheduler.dto';
import { isEmpty } from '@/common/utils/util';
import axios from 'axios'; 
import cron from 'node-cron';
import scheduler from 'node-schedule';
import { ISchedule } from '@/common/interfaces/schedule.interface';


//import { ISchedule } from '@/common/interfaces/schedule.interface'
//import DB from '@/database';


class SchedulerService {

  public async CreateCronSchedule(CronRequestData: CreateCronScheduleDto): Promise<ISchedule> {
    if (isEmpty(CronRequestData)) throw new HttpException(400, 'Schedule request data cannot be blank');

    const job_name = CronRequestData.name
    const summary = CronRequestData.summary
    const cronTab = CronRequestData.cronTab; 
    const apiUrl = CronRequestData.apiUrl; 
    const clusterUuid = CronRequestData.clusterUuid; 
    const templateUuid = CronRequestData.templateUuid;
    const apijson = CronRequestData.apijson; 
    
    const apiMessage = {
        name: job_name,
        cluster_uuid: clusterUuid,
        template_uuid: templateUuid,
        steps: [apijson],
        summary: summary };

//       const task = cron.schedule(cronTab, function(){
    const task = scheduler.scheduleJob(job_name, cronTab, function(){                  
         console.log(`Job ${job_name} is inititaed`); 
         console.log(apiUrl);
         axios.post(apiUrl,apiMessage)
          .then
          (
            (response) => {
              const status = response.data.status;
              console.log(`Job ${job_name} is processed`);
            },
            (error) => {
              task.cancel;
              console.log('Job stopped due to unexpoected error: ', error);
            })
        }
    );
    const result: ISchedule = {job_name: job_name};
    return result;
  }
}

export default SchedulerService;