import 'dotenv/config';
import App from '@/app';
import ApiGatewayRoute from '@/modules/ApiGateway/routes/index.route';
import AlertRoute from './modules/Alerts/routes/alerts.route';

const app = new App([new ApiGatewayRoute(), new AlertRoute()]);

app.listen();
