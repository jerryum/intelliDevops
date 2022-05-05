import { NextFunction, Request, Response } from 'express';
import { CreateCronScheduleDto } from '@/modules/Scheduler/dtos/scheduler.dto'
import SchedulerService from '@/modules/Scheduler/services/scheduler.service';
import { IScheduleResponse, ISchedule } from '@/common/interfaces/schedule.interface';

class SchedulerController {
  public schedulerService = new SchedulerService();
  
  public createCronSchedule =async (req:Request, res:Response, next: NextFunction) => {
    try {

       const name = req.body.name;
       const summary = req.body.summary;
       const cronTab = req.body.cronTab;
       const apiUrl = req.body.apiUrl;
       const apiBody = req.body.apiBody;
    
       const createCronRequest: CreateCronScheduleDto = {name,summary, cronTab, apiUrl, apiBody};
       const responseCronCreate:IScheduleResponse = await this.schedulerService.CreateCronSchedule (createCronRequest);
       console.log("response$$$$$$$$$",responseCronCreate); 
       res.status(200).json ({ data: responseCronCreate, message: 'Schedule request has been initiated'});

    } catch (error) {
      console.log(error); 
      next (error);
    }
  };


  public cancelCronScheduleByApiKey =async (req:Request, res:Response, next: NextFunction) => {
    try {
       
        const apiKey = req.body.apiKey;
        const scheduledTask = await this.schedulerService.getScheduledCronTaskbyApiKey(apiKey); 

        if (!scheduledTask) {
            return res.sendStatus(404);
          }

        await this.schedulerService.cancelScheduledCronTask (apiKey);
        res.status(200).json ({ message: `Scheduled cron task ${apiKey} request has been cancelled`});
 
     } catch (error) {
       next (error);
     }



  };

  public getScheduledCronByApiKey =async (req:Request, res:Response, next: NextFunction) => {
    try {
       
        const apiKey = req.body.apiKey;
        const scheduledCronTask: ISchedule = await this.schedulerService.getScheduledCronTaskbyApiKey(apiKey); 

        if (scheduledCronTask) {
            res.status(200).json({ data: scheduledCronTask, message: 'success' });
            return;
          } else {
            res.status(404).json({ message: `Scheduled cron task id(${apiKey}) not found` });
            return;
          }
 
     } catch (error) {
       next (error);
     }



  };


}

export default SchedulerController
