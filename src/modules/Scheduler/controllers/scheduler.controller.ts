import { NextFunction, Request, Response } from 'express';
import { CreateCronScheduleDto } from '@/modules/Scheduler/dtos/scheduler.dto'
import SchedulerService from '@/modules/Scheduler/services/scheduler.service';

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

       const responseCronCreate = await this.schedulerService.CreateCronSchedule (createCronRequest);
       res.status(200).json ({ data: responseCronCreate, message: 'Schedule request has been initiated'});

    } catch (error) {
      next (error);
    }

  };

}

export default SchedulerController
