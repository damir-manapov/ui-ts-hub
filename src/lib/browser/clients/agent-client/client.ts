import axios from 'axios';
import * as qs from 'querystring';

import {
  EAgentClientRoutes,
  IAgentClient,
  IFoundTicket,
  ISearchTicketsOptions,
} from '../../../shared/types';

import { getAgentClientMethodRoute } from '../../../shared/utils';

import { CitiesRepository } from '../../repositories/cities';
import { UsersRepository } from '../../repositories/users';

export class AgentClient implements IAgentClient {
  public cities = new CitiesRepository();
  public users = new UsersRepository();

  private httpClient = axios.create({
    baseURL: '/api',
  });

  /**
   * Производит поиск билетов.
   * @param options
   */
  public searchTickets = async (
    options: ISearchTicketsOptions,
  ): Promise<IFoundTicket[]> => {
    const {
      departureCityId,
      destinationCityId,
      departureDate,
    } = options;
    const query = qs.stringify({
      departureCityId,
      destinationCityId,
      departureDate,
    });
    const url = getAgentClientMethodRoute(EAgentClientRoutes.SearchTickets)
      + `?${query}`;
    const { data } = await this.httpClient.get<IFoundTicket[]>(url);

    return data;
  };

  // /**
  //  * Осуществляет покупку билета.
  //  * @param options
  //  */
  // public buyTicket = async (
  //   // options: IBuyTicketOptions,
  // ): Promise<IBuyTicketResult> => {
  //   return {
  //     PNR: uuid(),
  //     hash: uuid(),
  //   };
  // };
  //
  // /**
  //  * Возвращает информацию о проданных билетах.
  //  */
  // public getStatistics = async (): Promise<IGetStatisticsResult> => {
  //   return {} as IGetStatisticsResult;
  // };
}
