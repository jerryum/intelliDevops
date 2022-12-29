import 'dotenv/config';
import App from '@/app';
import ApiGatewayRoute from '@/modules/ApiGateway/routes/index.route';
import AlertRoute from './modules/Alerts/routes/alerts.route';
import MlmodelsRoute from './modules/Mlmodels/routes/mlmodels.route';
import AwsRoute from './modules/Costs/routes/aws.route';

const app = new App([new ApiGatewayRoute(), new AlertRoute(), new MlmodelsRoute(), new AwsRoute()]);

app.listen();
