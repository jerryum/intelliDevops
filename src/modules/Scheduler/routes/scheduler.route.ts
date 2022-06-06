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
    this.router.delete('/scheduler', authMiddleware, this.schedulerController.cancelCronScheduleBySchedulerId);

  }
}

export default SchedulerRoute;