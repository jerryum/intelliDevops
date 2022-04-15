import { HttpException } from '@/common/exceptions/HttpException';
import { CreateCronScheduleDto } from '../dtos/scheduler.dto';
import { isEmpty } from '@/common/utils/util';
import axios from 'axios'; 
//import cron from 'node-cron';
import scheduler from 'node-schedule';
import { ISchedule, IScheduleResponse } from '@/common/interfaces/schedule.interface';
import DB from '@/database';
//import { NOW } from 'sequelize';


//import { ISchedule } from '@/common/interfaces/schedule.interface'
//import DB from '@/database';


class SchedulerService {
  public scheduler = DB.Scheduler; 

  public async CreateCronSchedule(CronRequestData: CreateCronScheduleDto): Promise<IScheduleResponse> {
    if (isEmpty(CronRequestData)) throw new HttpException(400, 'Scheduling request data cannot be blank');

    const cronTab = CronRequestData.cronTab;
    const apiUrl = CronRequestData.apiUrl;
    const {name, summary, apiBody} = CronRequestData;
    var apiKey = 0;
    var apiKeyString = "";
    var cancelFlag = 0;

    await this.scheduler.create(
          {
            scheduleName: name,
            scheduleSummary: summary,
            scheduleCronTab: cronTab,
            scheduleApiUrl: apiUrl,
            scheduleApiBody: apiBody,
            createdAt: new Date(),
          }) 
        .then (
           (result) => {
               apiKey = result.scheduleKey;
               apiKeyString = apiKey.toString(); 
               console.log(apiKey);
           },
           (error) => {
            console.log("Job can't be saved due to unexpoected error: ", error);
            throw new HttpException(407, 'Scheduling request cannot be saved due to unexpoected error');
           });

    let apiMessage = {};
    
    apiMessage = { name, summary,  ...apiBody};
    //apiMessage = { name, summary};

    const task = scheduler.scheduleJob(apiKeyString, cronTab, function(){                  
         console.log(`Job ${apiKey} is inititaed`); 
         
         axios.post(apiUrl,apiMessage)
          .then
          (
            (response) => {
              const status = response.data.status;
              console.log(`Job ${apiKey} is processed`, status);
            },
            (error) => {
                task.cancel();
                cancelFlag = 1;     
                console.log(`#######################Job ${apiKey} cancelled due to unexpoected error: `, error);
            })
        }
    );
     
    if (cancelFlag === 1) {
        await this.scheduler.update(
            {cancelledAt: new Date(), },
            {where: {scheduleKey: apiKey}},
        )
        .then (
            (result: any) => {console.log("#########################db updated - cancelled job", result); },
            (error: any)  => {console.log("db update failed - cancelled job", error);} 
        );
    };

    const result: IScheduleResponse = {jobKey: apiKey};
    return result;
  }
}

export default SchedulerService;