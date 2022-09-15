import { Router } from 'express';
import { Routes } from '@/common/interfaces/routes.interface';
import SchedulerController from '@/modules/Scheduler/controllers/scheduler.controller';
//import AuthService from '@/modules/UserTenancy/services/auth.service';
import authMiddleware from '@/modules/ApiGateway/middlewares/auth.middleware';

class SchedulerRoute implements Routes {
  public router = Router();
  public schedulerController = new SchedulerController();
  //  public authservice = new AuthService();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/scheduler', authMiddleware, this.schedulerController.createCronSchedule);
    this.router.get('/scheduler/:schedulerId', authMiddleware, this.schedulerController.getScheduledCronBySchedulerId);
    this.router.get('/scheduler/account/:accountId', authMiddleware, this.schedulerController.getScheduledCronByAccountId);
    this.router.get(
      '/scheduler/scheduleName/:scheduleName/cluster/:clusterId',
      authMiddleware,
      this.schedulerController.getScheduledCronByNameByClusterId,
    );
    this.router.get('/scheduler/cluster/:clusterId', authMiddleware, this.schedulerController.getScheduledCronByClusterId);
    this.router.get('/scheduler/cluster/all/:clusterId', authMiddleware, this.schedulerController.getAllCronByClusterId);
    this.router.get('/scheduler/account/all/:accountId', authMiddleware, this.schedulerController.getAllCronByAccountId);
    this.router.delete('/scheduler/:schedulerId', authMiddleware, this.schedulerController.cancelCronScheduleBySchedulerId);
    this.router.delete('/scheduler/account/:accountId', authMiddleware, this.schedulerController.cancelCronScheduleByAccountId);
    this.router.delete('/scheduler/cluster/:clusterId', authMiddleware, this.schedulerController.cancelCronScheduleByClusterId);
  }
}

export default SchedulerRoute;
