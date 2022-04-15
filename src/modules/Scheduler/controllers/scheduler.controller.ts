import { NextFunction, Request, Response } from 'express';
import { CreateCronScheduleDto } from '@/modules/Scheduler/dto/scheduler.dto'
import SchedulerService from '@/modules/Scheduler/services/scheduler.service';

class SchedulerController {
  public schedulerService = new SchedulerService();
  
  public createCronSchedule =async (req:Request, res:Response, next: NextFunction) => {
    try {
       
       const name = req.body.name;
       const summary = req.body.summary;
       const cronTab = req.body.crontab;
       const apiUrl = req.body.apiurl;
       const clusterUuid = req.body.apiparams.param1;
       const templateUuid = req.body.apiparams.param2;
       const receiveChannel =req.body.apiparams.param3;
       const apijson = req.body.apijson;
  
       const createCronRequest: CreateCronScheduleDto = {name,summary, apijson, cronTab, apiUrl, clusterUuid, templateUuid, receiveChannel};

       const responseCronCreate = await this.schedulerService.CreateCronSchedule (createCronRequest);
       res.status(200).json ({ data: responseCronCreate, message: 'Schedule request has been initiated'});

    } catch (error) {
      next (error);
    }  

  };

}

export default SchedulerController
