import * as next from 'next';
import * as express from 'express';
import { serverConfig, clientConfig } from './config';
import { routes as nextRoutes } from '../shared/routes';
import { IResponse } from '../shared/types';
import { log, addRoutes } from './utils';
import { api } from './api';
import { mockData } from '../mocks/data';

const app = next({
  dev: serverConfig.env !== 'production',
  dir: './src',
});
const handler = app.getRequestHandler();
const server = express();

addRoutes(app, nextRoutes);

app.prepare().then(async () => {
  // Вставляем моки данных БД.
  await mockData();

  // @ts-ignore
  server.use(express.json());

  server.use('/api', api);

  server.use((_, res: IResponse, callNextHandler) => {
    res.locals.config = clientConfig;

    callNextHandler();
  });

  // Handle request with Next.
  // @ts-ignore
  server.use(handler);

  server.listen(serverConfig.port, () => {
    log(`Ready on port - ${serverConfig.port.toString().yellow.bold}`);
    log(`Current node environment - ${serverConfig.env.yellow.bold}`);
  });
});
