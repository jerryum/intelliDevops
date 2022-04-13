import 'dotenv/config';
import App from '@/app';
import ApiGatewayRoute from '@/modules/ApiGateway/routes/index.route';

const app = new App([new ApiGatewayRoute()]);

app.listen();
