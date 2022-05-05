import 'dotenv/config';
import App from '@/app';
import ApiGatewayRoute from '@/modules/ApiGateway/routes/index.route';
import SchedulerRoute from './modules/Scheduler/routes/scheduler.route';

const app = new App([
    new ApiGatewayRoute(),
    new SchedulerRoute()
]);

app.listen();
