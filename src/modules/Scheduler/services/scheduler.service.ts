import { HttpException } from '@/common/exceptions/HttpException';
import { CreateCronScheduleDto, ICancelScheduledCronTaskDto } from '../dtos/scheduler.dto';
import { isEmpty } from '@/common/utils/util';

import axios from 'axios'; 
import MyScheduler from 'node-schedule';
import { IScheduleResponse,ISchedule } from '@/common/interfaces/schedule.interface';

import DB from '@/database';
import config from '@/config';


//import { schedule } from 'node-cron';

class SchedulerService {
  public scheduler = DB.Scheduler;

  public async getScheduledCronTaskbyapiId(apiId: number): Promise<ISchedule> {
    if (isEmpty(apiId)) throw new HttpException(400, 'Missing apiId');
    
    const getScheduledCronTask: ISchedule = await this.scheduler.findOne({ where: { scheduleId: apiId } });
    if (!getScheduledCronTask) throw new HttpException(404, "can't find the apiId information in the database");

    console.log(getScheduledCronTask);

    const target_job= MyScheduler.scheduledJobs[apiId];
    if (!target_job) throw new HttpException(409, "the job is not in crontab");
    return getScheduledCronTask;
  }

  public async cancelScheduledCronTask(apiId: number) {
    if (isEmpty(apiId)) throw new HttpException(400, 'Missing apiId');

    try {
      const target_job = MyScheduler.scheduledJobs[apiId]; 
      target_job.cancel();
      console.log("job cancelled");
    } catch(error)
      {throw new HttpException(400, 'Fail to cancel the requested schedule ');}; 

    const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
    await this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: apiId } }).then(
      (result: any) => {
        console.log('cancelled job - db updated', result);
      },
      (error: any) => {
        console.log('cancelled job - db update failed', error);
        throw new HttpException(409, "can't update status of scheduler db");
      },
    );
  }

  public async CreateCronSchedule(CronRequestData: CreateCronScheduleDto): Promise<IScheduleResponse> {
    if (isEmpty(CronRequestData)) throw new HttpException(401, 'Scheduling request data cannot be blank');

    try {
      const x_auth_token = config.auth.sudory_x_auth_token;
      const { name, summary, apiBody, apiUrl, cronTab } = CronRequestData;
      
      var apiMessage = {};
      var responseData;

      const uuid = require('uuid'); 
      const apiId = uuid.v1();

      apiMessage = { name, summary,  ...apiBody};
      const apiHeader = {headers: {'x_auth_token': x_auth_token}};
      console.log(apiMessage);
      console.log(apiId);  
      const task = MyScheduler.scheduleJob(apiId, cronTab, function(){                  
          console.log(`Job ${apiId} is inititaed, name: ${name}, crontab: ${cronTab} `); 
          axios.post(apiUrl,apiMessage,apiHeader)
          .then
            (
              (response) => {
                const status = response.data.status;
                responseData=response.data;
                console.log(`Job ${apiId} is processed, name: ${name}, crontab: ${cronTab}`, status);   
              },
              (error) => {
                  task.cancel();
                  console.log(`Job ${apiId} cancelled due to unexpoected error: ${error}, name: ${name}, crontab: ${cronTab}`);  
                  throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
              } // error
            ) // close of .then 
          } // close of schedulejob function
      );  //close of scheduleJob

      await this.scheduler.create(
        {
          scheduleId: apiId,
          scheduleName: name,
          scheduleSummary: summary,
          scheduleCronTab: cronTab,
          scheduleApiUrl: apiUrl,
          scheduleApiBody: apiBody,
          createdAt: new Date(),
          scheduleStatus: "AC"
        }) 
      .then (
        (result) => {
            console.log("Job saved in database ", apiId);
        },
        (error) => {
          console.log("Job request can't be saved due to database related error: ", error);
          throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
        });

        const result: IScheduleResponse = {scheduleKey: apiId, responseData: responseData};
        return result;
    } catch (error) // eond of try   
    {throw new HttpException(500, 'Fail to create the requested schedule '); }; 
  } // end of CreateCronSchedule
 
  public sleep (ms) {
    return new Promise((resolve)=> {
        setTimeout (resolve, ms); 
    }); 
  }
} 

export default SchedulerService;
