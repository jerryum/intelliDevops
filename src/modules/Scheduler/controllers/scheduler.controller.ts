import { NextFunction, Request, Response } from 'express';
import { CreateCronScheduleDto } from '@/modules/Scheduler/dtos/scheduler.dto';
import SchedulerService from '@/modules/Scheduler/services/scheduler.service';
import { IScheduleResponse, ISchedule } from '@/common/interfaces/schedule.interface';

class SchedulerController {
  public schedulerService = new SchedulerService();


  public createCronSchedule = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, summary, cronTab, apiUrl, apiBody, scheduleFrom, scheduleTo, reRunRequire, timezone} = req.body;
      const createCronRequest: CreateCronScheduleDto = { name, summary, cronTab, apiUrl, apiBody, scheduleFrom, scheduleTo, reRunRequire, timezone };
      const responseCronCreate = await this.schedulerService.CreateCronSchedule(createCronRequest);
      res.status(200).json({ data: responseCronCreate, message: 'Schedule request has been initiated' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  public cancelCronScheduleBySchedulerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schedulerId = req.params.schedulerId;
      const scheduledTask = await this.schedulerService.getScheduledCronTaskBySchedulerId(schedulerId);

      if (!scheduledTask) {
        return res.sendStatus(404);
      }

      await this.schedulerService.cancelScheduledCronTask(schedulerId);
      res.status(200).json({ message: `Scheduled cron task ${schedulerId} request has been cancelled` });
    } catch (error) {
      next(error);
    }
  };

  public cancelCronScheduleByAccountId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = req.params.accountId;
      const scheduledTask = await this.schedulerService.getScheduledCronTaskBySchedulerId(accountId);

      if (!scheduledTask) {
        return res.sendStatus(404);
      }

      await this.schedulerService.cancelScheduledCronTaskUnderAccountId(accountId);
      res.status(200).json({ message: `Scheduled cron task under accountId ${accountId} request has been cancelled` });
    } catch (error) {
      next(error);
    }
  };

  public cancelCronScheduleByClusterId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clusterId = req.params.clusterId;
      const scheduledTask = await this.schedulerService.getScheduledCronTaskBySchedulerId(clusterId);

      if (!scheduledTask) {
        return res.sendStatus(404);
      }

      await this.schedulerService.cancelScheduledCronTaskUnderClusterId(clusterId);
      res.status(200).json({ message: `Scheduled cron task under accountId ${clusterId} request has been cancelled` });
    } catch (error) {
      next(error);
    }
  };


  public getScheduledCronBySchedulerId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const schedulerId = req.params.schedulerId;
      console.log (req.params.schedulerId);
      const scheduledCronTask: ISchedule = await this.schedulerService.getScheduledCronTaskBySchedulerId(schedulerId);

      if (scheduledCronTask) {
        res.status(200).json({ data: scheduledCronTask, message: 'success' });
        return;
      } else {
        res.status(404).json({ message: `Scheduled cron task id(${schedulerId}) not found` });
        return;
      }
    } catch (error) {
      next(error);
    }
  };

  public getScheduledCronByAccountId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accountId = req.params.accountId;
      console.log (req.params.accountId);
      const scheduledCronTask: ISchedule[] = await this.schedulerService.getScheduledCronTaskByAccountId(accountId);

      if (scheduledCronTask) {
        res.status(200).json({ data: scheduledCronTask, message: 'success' });
        return;
      } else {
        res.status(404).json({ message: `Scheduled cron task under account id(${accountId}) not found` });
        return;
      }
    } catch (error) {
      next(error);
    }
  };  

  public getScheduledCronByClusterId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const clusterId = req.params.clusterId;
      console.log (req.params.clusterId);
      const scheduledCronTask: ISchedule[] = await this.schedulerService.getScheduledCronTaskByClusterId(clusterId);

      if (scheduledCronTask) {
        res.status(200).json({ data: scheduledCronTask, message: 'success' });
        return;
      } else {
        res.status(404).json({ message: `Scheduled cron task under cluster id(${clusterId}) not found` });
        return;
      }
    } catch (error) {
      next(error);
    }
  };  



}

export default SchedulerController;
