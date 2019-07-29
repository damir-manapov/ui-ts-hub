import { IServerConfig, IClientConfig } from '../shared/types';
import { prepareEnvironment } from './utils';

prepareEnvironment();

/**
 * This config is used only by server.
 */
export const serverConfig: IServerConfig = {
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
};

/**
 * Client config will be passed right to client side. So, dont use
 * confidential information here.
 */
export const clientConfig: IClientConfig = {};
