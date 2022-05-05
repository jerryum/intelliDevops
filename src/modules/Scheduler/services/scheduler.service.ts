import { HttpException } from '@/common/exceptions/HttpException';
import { CreateCronScheduleDto, ICancelScheduledCronTaskDto } from '../dtos/scheduler.dto';
import { isEmpty } from '@/common/utils/util';
import axios from 'axios'; 
import MyScheduler from 'node-schedule';
import { IScheduleResponse,ISchedule } from '@/common/interfaces/schedule.interface';
import DB from '@/database';
import config from '@/config';
import { response } from 'express';
//import { schedule } from 'node-cron';

class SchedulerService {
  public scheduler = DB.Scheduler; 

  public async getScheduledCronTaskbyApiKey(apiKey: number): Promise<ISchedule> {

    if (isEmpty(apiKey)) throw new HttpException(400, 'Missing apiKey');
    
    const getScheduledCronTask: ISchedule = await this.scheduler.findOne({ where: { scheduleKey: apiKey } });
    if (!getScheduledCronTask) throw new HttpException(404, "can't find the apiKey information in the database");

    console.log(getScheduledCronTask);

    const target_job= MyScheduler.scheduledJobs[apiKey];
    if (!target_job) throw new HttpException(409, "the job is not in crontab");
    
    return getScheduledCronTask;
  }

  public async cancelScheduledCronTask(apiKey: number) {

    if (isEmpty(apiKey)) throw new HttpException(400, 'Missing apiKey');
 
    try {
         const target_job = MyScheduler.scheduledJobs[apiKey]; 
         target_job.cancel();
         console.log("job cancelled");
    } catch(error)
      {throw new HttpException(400, 'Fail to cancel the requested schedule ');}; 

    const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: "CA" }
    await this.scheduler.update({...updateDataSet},{ where: { scheduleKey: apiKey }})
    .then (
        (result: any) => {console.log("cancelled job - db updated", result); },
        (error: any)  => {console.log("cancelled job - db update failed", error);
                          throw new HttpException(410, "can't update status of scheduler db");} 
    );

  }

  public async CreateCronSchedule(CronRequestData: CreateCronScheduleDto): Promise<IScheduleResponse> {
    
    if (isEmpty(CronRequestData)) throw new HttpException(401, 'Scheduling request data cannot be blank');

    try {
        const x_auth_token = config.auth.sudory_x_auth_token; 
        const cronTab = CronRequestData.cronTab;
        const apiUrl = CronRequestData.apiUrl;
        const {name, summary, apiBody} = CronRequestData;
        var apiKey = 0;
        var apiKeyString = "";
        var cancelFlag = 0;
        var apiMessage = {};
        var responseData;

        await this.scheduler.create(
              {
                scheduleName: name,
                scheduleSummary: summary,
                scheduleCronTab: cronTab,
                scheduleApiUrl: apiUrl,
                scheduleApiBody: apiBody,
                createdAt: new Date(),
                scheduleStatus: "DR"
              }) 
            .then (
              (result) => {
                  apiKey = result.scheduleKey;
                  apiKeyString = apiKey.toString(); 
                  console.log("Job request saved in database as DRAFT status, apiKey: ", apiKey);
              },
              (error) => {
                console.log("Job request can't be saved due to database related error: ", error);
                throw new HttpException(407, 'Scheduling request cannot be saved due to unexpoected error');
              });
        
        apiMessage = { name, summary,  ...apiBody};
        const apiHeader = {headers: {'x_auth_token': x_auth_token}};
        const task = MyScheduler.scheduleJob(apiKeyString, cronTab, function(){                  
            console.log(`Job ${apiKey} is inititaed`); 
             axios.post(apiUrl,apiMessage,apiHeader)
              .then
              (
                (response) => {
                  const status = response.data.status;
                  responseData=response.data;
                  console.log(`Job ${apiKey} is processed`, status);
                },
                (error) => {
                    task.cancel();
                    cancelFlag = 1;
                    console.log(`Job ${apiKey} cancelled due to unexpoected error: `, error);
                }
              ) // close of .then 
            }
        );  //close of scheduleJob

        if (cancelFlag === 1) {
            await this.scheduler.update(
                {updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: "CA" },
                {where: {scheduleKey: apiKey}},
            )
            .then (
                (result: any) => {
                  console.log("db updated - cancelled job", result); 
                  throw new HttpException(412, 'Scheduling request cannot be processed due to unexpoected error');

                },
                (error: any)  => {
                  console.log("db update failed - cancelled job", error);
                  throw new HttpException(413, 'Scheduling request cannot be processed due to unexpoected error, DB status update is also failed');
                } 
            );
        } else {
            await this.scheduler.update(
            {updatedAt: new Date(), scheduleStatus: "AC", },
            {where: {scheduleKey: apiKey}}
            ) 
            .then (
                (result: any) => {console.log("db updated", result); },
                (error: any)  => {
                                    console.log("job is cancelled duto database issue", error);
                                    task.cancel();
                                    throw new HttpException(414, 'Scheduling request cannot be processed due to database error');
                                  } 
            ); 
        } // end of else  
        
        const result: IScheduleResponse = {scheduleKey: apiKey, responseData: responseData};
        return result;
      
    } catch (error) // eond of try   
    {throw new HttpException(400, 'Fail to create the requested schedule '); }; 
  } // end of CreateCronSchedule
 
  public sleep (ms) {
    return new Promise((resolve)=> {
        setTimeout (resolve, ms); 
    }); 
  }

}  

export default SchedulerService;