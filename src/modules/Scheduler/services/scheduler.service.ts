import { HttpException } from '@/common/exceptions/HttpException';
import { CreateCronScheduleDto } from '../dtos/scheduler.dto';
import { isEmpty } from '@/common/utils/util';

import axios from 'axios';
import MyScheduler from 'node-schedule';
import { IScheduleResponse,ISchedule } from '@/common/interfaces/schedule.interface';

import DB from '@/database';
import config from '@/config';


//import { schedule } from 'node-cron';

class SchedulerService {
  public scheduler = DB.Scheduler;
  

  public async getScheduledCronTaskBySchedulerId(scheduleId: string): Promise<object> {
    if (isEmpty(scheduleId)) throw new HttpException(400, 'Missing schedulerId');

    const getScheduledCronTask: ISchedule = await this.scheduler.findOne({ where: { scheduleId: scheduleId } });
    if (!getScheduledCronTask) throw new HttpException(404, "can't find the schedulerId information in the database");
    let scheduleStatus = getScheduledCronTask.scheduleStatus; 
    const target_job= MyScheduler.scheduledJobs[scheduleId];
    
    if (!target_job) {
      if (scheduleStatus=='AC') {
        let updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
        this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: scheduleId } }).then(
          (result: any) => {
            console.log('cancelled job - db updated', result);
          },
          (error: any) => {
            console.log('cancelled job - db update failed', error);
            throw new HttpException(409, "can't update status of scheduler db");
          },
        );
      } //end of if scheduleStatus==AC 

      throw new HttpException(409, "the job is not in crontab");
    } // end of if !target_job 
    
    return getScheduledCronTask;
  }

  public async getScheduledCronTaskByAccountId(accountId: string): Promise<ISchedule[]> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Missing accountId');

    let filteredScheduledCronTasks = [];
    let i = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { accountId: accountId, scheduleStatus: 'AC' } });
    if (!allScheduledCronTasks) throw new HttpException(404, `can't find the scheduled task under the account id ${accountId} information in the database`);

    allScheduledCronTasks.forEach((job) => {
      let scheduleId = job.scheduleId;
      let target_job= MyScheduler.scheduledJobs[scheduleId];
      if (target_job) {
        filteredScheduledCronTasks[i] = job;
      }
      else { 
        const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
        this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: scheduleId } }).then(
          (result: any) => {
            console.log('cancelled job - db updated', result);
          },
          (error: any) => {
            console.log('cancelled job - db update failed', error);
            throw new HttpException(409, "can't update status of scheduler db");
          },
        );
      }
      i++;
    });
    return filteredScheduledCronTasks;
  }

  public async getScheduledCronTaskByClusterId(clusterId: string): Promise<ISchedule[]> {
    if (isEmpty(clusterId)) throw new HttpException(400, 'Missing accountId');

    let filteredScheduledCronTasks=[];
    let i = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: clusterId, scheduleStatus: 'AC'  } });
    if (!allScheduledCronTasks) throw new HttpException(404, `can't find the scheduled task under the cluster id ${clusterId} information in the database`);

    allScheduledCronTasks.forEach((job) => {
      let scheduleId = job.scheduleId;
      let target_job= MyScheduler.scheduledJobs[scheduleId];
      if (target_job) {
        filteredScheduledCronTasks[i] = job;
      }
      else { 
        const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
        this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: scheduleId } }).then(
          (result: any) => {
            console.log('cancelled job - db updated', result);
          },
          (error: any) => {
            console.log('cancelled job - db update failed', error);
            throw new HttpException(409, "can't update status of scheduler db");
          },
        );
      }
      i++;
    });
    return filteredScheduledCronTasks;
  }


  public async cancelScheduledCronTask(schedulerId: string) {
    if (isEmpty(schedulerId)) throw new HttpException(400, 'Missing schedulerId');

    try {
      const target_job = MyScheduler.scheduledJobs[schedulerId];
      if (target_job) {
        target_job.cancel();
        console.log("job cancelled");
      }
    } catch(error)
      {throw new HttpException(400, 'Fail to cancel the requested schedule ');};

    const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
    await this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: schedulerId } }).then(
      (result: any) => {
        console.log('cancelled job - db updated', result);
      },
      (error: any) => {
        console.log('cancelled job - db update failed', error);
        throw new HttpException(409, "can't update status of scheduler db");
      },
    );
  }

  public async cancelScheduledCronTaskUnderAccountId(accountId: string): Promise<ISchedule[]> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Missing accountId');

    let filteredScheduledCronTasks;
    let i = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { accountId: accountId } });
    if (!allScheduledCronTasks) throw new HttpException(404, `can't find the scheduled task under the account id ${accountId} information in the database`);

    allScheduledCronTasks.forEach((job) => {
      let scheduleId = job.scheduleId;
      let target_job= MyScheduler.scheduledJobs[scheduleId];
      if (target_job) {
        target_job.cancel();

        const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
        this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: scheduleId } }).then(
          (result: any) => {
            console.log('cancelled job - db updated', result);
          },
          (error: any) => {
            console.log('cancelled job - db update failed', error);
            throw new HttpException(409, "can't update status of scheduler db");
          },
        );
      }
      i++;
    });
    return filteredScheduledCronTasks;
  }  

  public async cancelScheduledCronTaskUnderClusterId(clusterId: string): Promise<ISchedule[]> {
    if (isEmpty(clusterId)) throw new HttpException(400, 'Missing accountId');

    let filteredScheduledCronTasks;
    let i = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: clusterId } });
    if (!allScheduledCronTasks) throw new HttpException(404, `can't find the scheduled task under the cluster id ${clusterId} information in the database`);

    allScheduledCronTasks.forEach((job) => {
      let scheduleId = job.scheduleId;
      let target_job= MyScheduler.scheduledJobs[scheduleId];
      if (target_job) {
        target_job.cancel();

        const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
        this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: scheduleId } }).then(
          (result: any) => {
            console.log('cancelled job - db updated', result);
          },
          (error: any) => {
            console.log('cancelled job - db update failed', error);
            throw new HttpException(409, "can't update status of scheduler db");
          },
        );
      }
      i++;
    });
    return filteredScheduledCronTasks;
  }    

  public async CreateCronSchedule(CronRequestData: CreateCronScheduleDto): Promise<IScheduleResponse> {
    if (isEmpty(CronRequestData)) throw new HttpException(401, 'Scheduling request data cannot be blank');

    try {
      const x_auth_token = config.auth.sudory_x_auth_token;
      const { name, summary, apiBody, apiUrl, cronTab, scheduleFrom, scheduleTo, reRunRequire, timezone, accountId, clusterId } = CronRequestData;
      console.log (CronRequestData);
      var apiMessage = {};
      var responseData;

      //need to convert the input start and end time to UTC time (using timezone information)

      const uuid = require('uuid');
      const schedulerId = uuid.v1();

      apiMessage = { name, summary,  ...apiBody};
      const apiHeader = {headers: {'x_auth_token': x_auth_token}};
      console.log(apiMessage);
      console.log(schedulerId);
      const task = MyScheduler.scheduleJob(schedulerId, {start: scheduleFrom, end: scheduleTo, rule: cronTab, tz: timezone}, function(){
          console.log(`Job ${schedulerId} is inititaed, name: ${name}, crontab: ${cronTab}`);
          axios.post(apiUrl,apiMessage,apiHeader)
          .then
            (
              (response) => {
                const status = response.data.status;
                responseData=response.data;
                console.log(`Job ${schedulerId} is processed, name: ${name}, crontab: ${cronTab}`, status);
              },
              (error) => {
                  task.cancel();
                  console.log(`Job ${schedulerId} cancelled due to unexpoected error: ${error}, name: ${name}, crontab: ${cronTab}`);
                  throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
              } // error
            ) // close of .then
          } // close of schedulejob function
      );  //close of scheduleJob
   
      await this.scheduler.create(
          {
            scheduleId: schedulerId,
            scheduleName: name,
            scheduleSummary: summary,
            scheduleCronTab: cronTab,
            scheduleApiUrl: apiUrl,
            scheduleApiBody: apiBody,
            scheduleFrom: scheduleFrom,
            scheduleTo: scheduleTo,
            reRunRequire: reRunRequire,
            createdAt: new Date(),
            timezone: timezone,
            accountId: accountId,
            clusterId: clusterId,
            scheduleStatus: "AC"
          })
        .then (
           (result) => {
            console.log("Job saved in database ", schedulerId);
            },
            (error) => {
          console.log("Job request can't be saved due to database related error: ", error);
          throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
        });

        const result: IScheduleResponse = {scheduleKey: schedulerId, responseData: responseData};
    return result;
    } catch (error) // eond of try
    {throw new HttpException(500, 'Fail to create the requested schedule '); };
  } // end of CreateCronSchedule


  public async scheduleOnStartUp(): Promise<any> {

      try {
          console.log("Starting jobs on startup");
          let allScheduledTasks: Array<ISchedule> = await this.scheduler.findAll({ where: { scheduleStatus: "AC", reRunRequire: true } });
          console.log("All suspended & scheduled tasks: ", allScheduledTasks);
          
          const x_auth_token = config.auth.sudory_x_auth_token;

          var apiMessage = {};
          var responseData=[];

          const apiHeader = {headers: {'x_auth_token': x_auth_token}};

          allScheduledTasks.forEach((job) => {
            let uuid = require('uuid');
            let schedulerId = uuid.v1();

            let scheduleName = job.scheduleName;
            let scheduleSummary = job.scheduleSummary; 
            apiMessage = { scheduleName, scheduleSummary,  ...job.scheduleApiBody};
            const task = MyScheduler.scheduleJob(schedulerId, {start: job.scheduleFrom, end: job.scheduleTo, rule: job.scheduleCronTab, tz: job.timezone}, function(){
                      console.log(`Job ${schedulerId} is inititaed, name: ${job.scheduleName}, crontab: ${job.scheduleCronTab} `);
                      axios.post(job.scheduleApiUrl,apiMessage,apiHeader)
                      .then
                        (
                          (response) => {
                            const status = response.data.status;
                            responseData.push(response.data);
                            console.log(`Job ${schedulerId} is processed, name: ${job.scheduleName}, crontab: ${job.scheduleCronTab}`, status);
                          },
                          (error) => {
                              task.cancel();
                              console.log(`Job ${schedulerId} cancelled due to unexpoected error: ${error}, name: ${job.scheduleName}, crontab: ${job.scheduleCronTab}`);
                              throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
                          } // error
                        ) // close of .then
                      } // close of schedulejob function
                  );  //close of scheduleJob

                  this.scheduler.create(
                    {
                      scheduleId: schedulerId,
                      scheduleName: job.scheduleName,
                      scheduleSummary: job.scheduleSummary,
                      scheduleCronTab: job.scheduleCronTab,
                      scheduleApiUrl: job.scheduleApiUrl,
                      scheduleApiBody: job.scheduleApiBody,
                      scheduleFrom: job.scheduleFrom,
                      scheduleTo: job.scheduleTo,
                      reRunRequire: job.reRunRequire,
                      createdAt: new Date(),
                      timezone: job.timezone,
                      scheduleStatus: "AC"
                    })
                  .then (
                     (result) => {
                      console.log("Job saved in database ", schedulerId);
                      },
                      (error) => {
                    console.log("Job request can't be saved due to database related error: ", error);
                    throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
                  });

                  this.scheduler.update({scheduleStatus: 'CA'}, {where: {scheduleStatus: ["AC"], scheduleId: job.scheduleId}}); 
                }); // end of forEach
      } catch(error){
        throw new HttpException(400, 'Fail to cancel the requested schedule ');
      };
      return responseData;
    }
}

export default SchedulerService;
