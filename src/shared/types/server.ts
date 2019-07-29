import { ServerResponse } from 'http';

export interface IClientConfig {
}

export interface IServerConfig {
  env: string;
  port: number;
}

export interface IResponse extends ServerResponse {
  locals: {
    config: IClientConfig;
  };
}
