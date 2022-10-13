import { HttpException } from '@/common/exceptions/HttpException';
import { CreateCronScheduleDto } from '../dtos/scheduler.dto';
import { isEmpty } from '@/common/utils/util';

import axios from 'axios';
import MyScheduler from 'node-schedule';
import { IScheduleResponse, ISchedule } from '@/common/interfaces/schedule.interface';

import DB from '@/database';
import config from '@/config';

const { Op } = require('sequelize');

class SchedulerService {
  public scheduler = DB.Scheduler;

  public async getScheduledCronTaskBySchedulerId(scheduleId: string): Promise<object> {
    if (isEmpty(scheduleId)) throw new HttpException(400, 'Missing schedulerId');

    let getScheduledCronTask: ISchedule = await this.scheduler.findOne({ where: { scheduleId: scheduleId } });
    if (!getScheduledCronTask) throw new HttpException(404, "can't find the schedulerId information in the database");
    const scheduleStatus = getScheduledCronTask.scheduleStatus;
    const target_job = MyScheduler.scheduledJobs[scheduleId];

    if (!target_job) {
      if (scheduleStatus == 'AC') {
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
        getScheduledCronTask = await this.scheduler.findOne({ where: { scheduleId: scheduleId } });
      } //end of if scheduleStatus==AC
    } // end of if !target_job

    return getScheduledCronTask;
  }

  public async getScheduledCronTaskByAccountId(accountId: string): Promise<ISchedule[]> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Missing accountId');

    const filteredScheduledCronTasks = [];
    let i = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { accountId: accountId, scheduleStatus: 'AC' } });
    if (!allScheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the account id ${accountId} information in the database`);

    allScheduledCronTasks.forEach(job => {
      const scheduleId = job.scheduleId;
      const target_job = MyScheduler.scheduledJobs[scheduleId];
      if (target_job) {
        filteredScheduledCronTasks[i] = job;
        i++;
      } else {
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
    });
    return filteredScheduledCronTasks;
  }

  public async getAllCronTaskByClusterId(clusterId: string): Promise<ISchedule[]> {
    if (isEmpty(clusterId)) throw new HttpException(400, 'Missing clusterId');

    const scheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: clusterId, scheduleStatus: 'AC' } });
    if (!scheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the cluster id ${clusterId} information in the database`);

    scheduledCronTasks.forEach(job => {
      const scheduleId = job.scheduleId;
      const target_job = MyScheduler.scheduledJobs[scheduleId];
      if (!target_job) {
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
    });

    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: clusterId } });
    if (!allScheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the cluster id ${clusterId} information in the database`);

    return allScheduledCronTasks;
  }

  public async getAllCronTaskByAccountId(accountId: string): Promise<ISchedule[]> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Missing accountId');

    const scheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: accountId, scheduleStatus: 'AC' } });
    if (!scheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the account id ${accountId} information in the database`);

    scheduledCronTasks.forEach(job => {
      const scheduleId = job.scheduleId;
      const target_job = MyScheduler.scheduledJobs[scheduleId];
      if (!target_job) {
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
    });

    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { accountId: accountId } });
    if (!allScheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the account id ${accountId} information in the database`);

    return allScheduledCronTasks;
  }

  public async getScheduledCronTaskByClusterId(clusterId: string): Promise<ISchedule[]> {
    if (isEmpty(clusterId)) throw new HttpException(400, 'Missing clusterId');

    const filteredScheduledCronTasks = [];
    let i = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: clusterId, scheduleStatus: 'AC' } });
    if (!allScheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the cluster id ${clusterId} information in the database`);

    allScheduledCronTasks.forEach(job => {
      const scheduleId = job.scheduleId;
      const target_job = MyScheduler.scheduledJobs[scheduleId];
      if (target_job) {
        filteredScheduledCronTasks[i] = job;
        i++;
      } else {
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
    });
    return filteredScheduledCronTasks;
  }

  public async cancelScheduledCronTask(schedulerId: string) {
    if (isEmpty(schedulerId)) throw new HttpException(400, 'Missing schedulerId');

    try {
      const target_job = MyScheduler.scheduledJobs[schedulerId];
      if (target_job) {
        target_job.cancel();
        console.log('job cancelled');
      }
    } catch (error) {
      throw new HttpException(400, 'Fail to cancel the requested schedule ');
    }

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

  public async cancelScheduledCronTaskUnderAccountId(accountId: string): Promise<object> {
    if (isEmpty(accountId)) throw new HttpException(400, 'Missing accountId');

    const filteredScheduledCronTasks = [];
    let no = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { accountId: accountId, scheduleStatus: 'AC' } });
    if (!allScheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the account id ${accountId} information in the database`);

    allScheduledCronTasks.forEach(job => {
      const scheduleId = job.scheduleId;
      const scheduleName = job.scheduleName;
      const target_job = MyScheduler.scheduledJobs[scheduleId];
      if (target_job) target_job.cancel();

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
      filteredScheduledCronTasks[no] = { no, scheduleId, scheduleName };
      no++;
    });

    return filteredScheduledCronTasks;
  }

  public async cancelScheduledCronTaskUnderClusterId(clusterId: string): Promise<object> {
    if (isEmpty(clusterId)) throw new HttpException(400, 'Missing accountId');

    const filteredScheduledCronTasks = [];
    let no = 0;
    const allScheduledCronTasks: ISchedule[] = await this.scheduler.findAll({ where: { clusterId: clusterId, scheduleStatus: 'AC' } });
    if (!allScheduledCronTasks)
      throw new HttpException(404, `can't find the scheduled task under the clusterId ${clusterId} information in the database`);

    allScheduledCronTasks.forEach(job => {
      const scheduleId = job.scheduleId;
      const scheduleName = job.scheduleName;
      const target_job = MyScheduler.scheduledJobs[scheduleId];
      if (target_job) target_job.cancel();

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
      filteredScheduledCronTasks[no] = { no, scheduleId, scheduleName };
      no++;
    });
    return filteredScheduledCronTasks;
  }

  public async CreateCronSchedule(CronRequestData: CreateCronScheduleDto): Promise<IScheduleResponse> {
    if (isEmpty(CronRequestData)) throw new HttpException(401, 'Scheduling request data cannot be blank');

    try {
      //const x_auth_token = config.auth.sudory_x_auth_token;
      const { name, summary, apiBody, apiUrl, apiType, cronTab, scheduleFrom, scheduleTo, reRunRequire, timezone, accountId, clusterId } =
        CronRequestData;
      //console.log (CronRequestData);
      let apiMessage = {};
      let responseData;

      //need to convert the input start and end time to UTC time (using timezone information)

      const uuid = require('uuid');
      const schedulerId = uuid.v1();

      apiMessage = { name, summary, ...apiBody };
      //const apiHeader = {headers: {'x_auth_token': x_auth_token}};

      const task = MyScheduler.scheduleJob(
        schedulerId,
        { start: scheduleFrom, end: scheduleTo, rule: cronTab, tz: timezone },
        function () {
          console.log(`Job ${schedulerId} is inititaed, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId}`);
          switch (apiType) {
            case 'POST' || 'post':
              axios.post(apiUrl, apiMessage).then(
                response => {
                  const status = response.data.status;
                  responseData = response.data;
                  console.log(`Job ${schedulerId} is processed, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId} `, status);
                },
                error => {
                  //task.cancel();
                  console.log(
                    `Job ${schedulerId} failed due to unexpoected error: ${error}, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId}`,
                  );
                }, // error
              ); // close of .then
              break;
            case 'GET' || 'get':
              axios.get(apiUrl).then(
                response => {
                  const status = response.data.status;
                  responseData = response.data;
                  console.log(`Job ${schedulerId} is processed, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId} `, status);
                },
                error => {
                  //task.cancel();
                  console.log(
                    `Job ${schedulerId} failed due to unexpoected error: ${error}, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId}`,
                  );
                }, // error
              ); // close of .then
              break;
            case 'PUT' || 'put':
              axios.put(apiUrl, apiMessage).then(
                response => {
                  const status = response.data.status;
                  responseData = response.data;
                  console.log(`Job ${schedulerId} is processed, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId} `, status);
                },
                error => {
                  //task.cancel();
                  console.log(
                    `Job ${schedulerId} failed due to unexpoected error: ${error}, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId}`,
                  );
                }, // error
              ); // close of .then
              break;
            case 'DELETE' || 'delete':
              axios.delete(apiUrl).then(
                response => {
                  const status = response.data.status;
                  responseData = response.data;
                  console.log(`Job ${schedulerId} is processed, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId} `, status);
                },
                error => {
                  //task.cancel();
                  console.log(
                    `Job ${schedulerId} failed due to unexpoected error: ${error}, name: ${name}, crontab: ${cronTab}, clusterId: ${clusterId}`,
                  );
                }, // error
              ); // close of .then

              break;
            default:
              console.log('Wrong api type', apiType);
              break;
          }
        }, // close of schedulejob function
      ); //close of scheduleJob

      await this.scheduler
        .create({
          scheduleId: schedulerId,
          scheduleName: name,
          scheduleSummary: summary,
          scheduleCronTab: cronTab,
          scheduleApiType: apiType,
          scheduleApiUrl: apiUrl,
          scheduleApiBody: apiBody,
          scheduleFrom: scheduleFrom,
          scheduleTo: scheduleTo,
          reRunRequire: reRunRequire,
          createdAt: new Date(),
          timezone: timezone,
          accountId: accountId,
          clusterId: clusterId,
          scheduleStatus: 'AC',
        })
        .then(
          result => {
            console.log('Job saved in database ', schedulerId);
          },
          error => {
            console.log("Job request can't be saved due to database related error: ", error);
            //throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
          },
        );

      const result: IScheduleResponse = { scheduleKey: schedulerId, responseData: responseData };
      return result;
    } catch (
      error // eond of try
    ) {
      throw new HttpException(500, 'Fail to create the requested schedule ');
    }
  } // end of CreateCronSchedule

  public async getScheduledCronTaskByNameByClusterId(scheduleName: string, clusterId: string): Promise<ISchedule> {
    if (isEmpty(scheduleName)) throw new HttpException(400, 'Missing schedulerId');
    if (isEmpty(clusterId)) throw new HttpException(400, 'Missing schedulerId');

    const getScheduledCronTask: ISchedule = await this.scheduler.findOne({
      where: { scheduleName: scheduleName, clusterId: clusterId, scheduleStatus: 'AC' },
    });
    if (!getScheduledCronTask) throw new HttpException(404, "can't find the active schedule information from the database");

    const target_job = MyScheduler.scheduledJobs[getScheduledCronTask.scheduleId];

    if (!target_job) {
      const updateDataSet = { updatedAt: new Date(), cancelledAt: new Date(), scheduleStatus: 'CA' };
      this.scheduler.update({ ...updateDataSet }, { where: { scheduleId: getScheduledCronTask.scheduleId } }).then(
        (result: any) => {
          console.log('cancelled job - db updated', result);
          throw new HttpException(404, "can't find the active schedule infomration from the database");
        },
        (error: any) => {
          console.log('cancelled job - db update failed', error);
          throw new HttpException(409, "No active schedule, DB & schedule status out of sync and can't update status of scheduler db");
        },
      );
    } // end of if !target_job

    return getScheduledCronTask;
  }

  public async scheduleOnStartUp(): Promise<any> {
    const msWait = parseInt(config.msWait);
    //const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
    console.log('Starting jobs on startup');
    try {
      const allScheduledTasks: Array<ISchedule> = await this.scheduler.findAll({ where: { scheduleStatus: 'AC', reRunRequire: true } });
      const scheduleId = allScheduledTasks.map(a => a.scheduleId);
      const x_auth_token = config.auth.sudory_x_auth_token;
      // eslint-disable-next-line no-var
      var responseData = [];
      const apiHeader = { headers: { x_auth_token: x_auth_token } };

      allScheduledTasks.forEach((job, i) => {
        setTimeout(() => {
          const uuid = require('uuid');
          const newSchedulerId = uuid.v1();
          const task = MyScheduler.scheduleJob(
            newSchedulerId,
            { start: job.scheduleFrom, end: job.scheduleTo, rule: job.scheduleCronTab, tz: job.timezone },
            function () {
              console.log(
                `Job ${newSchedulerId} is inititaed, name: ${job.scheduleName}, crontab: ${job.scheduleCronTab}, cluster: ${job.clusterId} `,
              );
              axios.post(job.scheduleApiUrl, job.scheduleApiBody, apiHeader).then(
                response => {
                  const status = response.data.status;
                  responseData.push(response.data);
                  console.log(
                    `Job ${newSchedulerId} is processed, name: ${job.scheduleName}, crontab: ${job.scheduleCronTab}, cluster: ${job.clusterId}`,
                    status,
                  );
                },
                error => {
                  task.cancel();
                  console.log(
                    `Job ${newSchedulerId} cancelled due to unexpoected error: ${error}, name: ${job.scheduleName}, crontab: ${job.scheduleCronTab}, cluster: ${job.clusterId}`,
                  );
                }, // error
              ); // close of .then
            }, // close of schedulejob function
          ); //close of scheduleJob
          this.scheduler
            .create({
              scheduleId: newSchedulerId,
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
              scheduleStatus: 'AC',
              clusterId: job.clusterId,
              accountId: job.accountId,
            })
            .then(
              result => {
                console.log('Job saved in database ', newSchedulerId);
              },
              error => {
                console.log("Job request can't be saved due to database related error: ", error);
                //throw new HttpException(500, 'Scheduling request cannot be saved due to unexpoected error');
              },
            );
        }, i * msWait); //end of setTimeOut
      }); // end of forEach

      const updateData = {
        scheduleStatus: 'CA',
        cancelled_at: new Date(),
        updatedAt: new Date(),
      };

      const queryIn = {
        where: {
          scheduleStatus: 'AC',
          scheduleId: { [Op.in]: scheduleId },
        },
      };

      this.scheduler.update(updateData, queryIn);
    } catch (error) {
      throw new HttpException(400, 'Fail to cancel the requested schedule');
    }
    return responseData;
  }
}

export default SchedulerService;
