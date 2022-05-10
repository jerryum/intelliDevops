import { NextFunction, Request, Response } from 'express';
import { CreateCronScheduleDto } from '@/modules/Scheduler/dtos/scheduler.dto';
import SchedulerService from '@/modules/Scheduler/services/scheduler.service';
import { IScheduleResponse, ISchedule } from '@/common/interfaces/schedule.interface';

class SchedulerController {
  public schedulerService = new SchedulerService();


  public createCronSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, summary, cronTab, apiUrl, apiBody } = req.body;
      const createCronRequest: CreateCronScheduleDto = { name, summary, cronTab, apiUrl, apiBody };
      const responseCronCreate = await this.schedulerService.CreateCronSchedule(createCronRequest);
      res.status(200).json({ data: responseCronCreate, message: 'Schedule request has been initiated' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public cancelCronScheduleByapiId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiId = req.body.apiId;
      const scheduledTask = await this.schedulerService.getScheduledCronTaskbyapiId(apiId);

      if (!scheduledTask) {
        return res.sendStatus(404);
      }

      await this.schedulerService.cancelScheduledCronTask(apiId);
      res.status(200).json({ message: `Scheduled cron task ${apiId} request has been cancelled` });
    } catch (error) {
      next(error);
    }
  };

  public getScheduledCronByapiId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const apiId = Number(req.params.apiId);
      const scheduledCronTask: ISchedule = await this.schedulerService.getScheduledCronTaskbyapiId(apiId);

      if (scheduledCronTask) {
        res.status(200).json({ data: scheduledCronTask, message: 'success' });
        return;
      } else {
        res.status(404).json({ message: `Scheduled cron task id(${apiId}) not found` });
        return;
      }
    } catch (error) {
      next(error);
    }
  };
}

export default SchedulerController;
