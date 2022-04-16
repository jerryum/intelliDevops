import { HttpException } from '@/common/exceptions/HttpException';
import { CreateCronScheduleDto, ICancelScheduledCronTaskDto } from '../dtos/scheduler.dto';
import { isEmpty } from '@/common/utils/util';
import axios from 'axios'; 
import scheduler from 'node-schedule';
import { IScheduleResponse,ISchedule } from '@/common/interfaces/schedule.interface';
import DB from '@/database';
import { schedule } from 'node-cron';


class SchedulerService {
  public scheduler = DB.Scheduler; 


  public async getScheduledCronTaskbyApiKey(apiKey: number): Promise<ISchedule> {

    if (isEmpty(apiKey)) throw new HttpException(400, 'Missing apiKey');

    const getScheduledCronTask: ISchedule = await this.scheduler.findOne({ where: { scheduleKey: apiKey } });
    if (!getScheduledCronTask) throw new HttpException(409, "can't find the apiKey information in the database");

    //console.log(getScheduledCronTask);

    const target_job= scheduler.scheduledJobs[apiKey];
    if (!target_job) throw new HttpException(409, "the job is not in crontab");
    
    return getScheduledCronTask;
  }



  public async cancelScheduledCronTask(apiKey: number) {

    if (isEmpty(apiKey)) throw new HttpException(400, 'Missing apiKey');
 
    try {
         const target_job = scheduler.scheduledJobs[apiKey]; 
         target_job.cancel();
         console.log("job cancelled");
    } catch(error)
      {throw new HttpException(400, 'Fail to cancel the requested schedule ');}; 

    const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(),}
    await this.scheduler.update({...updateDataSet},{ where: { scheduleKey: apiKey }})
    .then (
        (result: any) => {console.log("cancelled job - db updated", result); },
        (error: any)  => {console.log("cancelled job - db update failed", error);
                          throw new HttpException(409, "can't update status of scheduler db");} 
    );

  }




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
            {updatedAt: new Date(), cancelledAt: new Date(), },
            {where: {scheduleKey: apiKey}},
        )
        .then (
            (result: any) => {console.log("#########################db updated - cancelled job", result); },
            (error: any)  => {console.log("db update failed - cancelled job", error);} 
        );
    };

    const result: IScheduleResponse = {scheduleKey: apiKey};
    return result;
  }
}

export default SchedulerService;