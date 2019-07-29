import {
  ETicketType,
  IAirline,
  IAirport,
  ICity,
  IClass,
  IFareBase,
  IUser,
} from './entities';
import { ISharedBaseRepository } from './base-repository';

interface IFoundTicket {
  price: number;
  oldPrice?: number;
  departureAirport: IAirport;
  departureDate: string;
  destinationAirport: IAirport;
  destinationDate: string;
  type: ETicketType;
  class: IClass;
  fareBase: IFareBase;
  airline: IAirline;
  duration: number;
}

interface ISearchTicketsOptions {
  departureCityId: string;
  destinationCityId: string;
  departureDate: string;
  limit?: number;
}
//
// interface ITicketBuyInformation {
//   ticket: ICachedTicket;
//   userId: IUser['id'];
//   firstName: string;
//   lastName: string;
//   passportId: string;
//   birthDate: string;
// }

interface IAgentClient {
  cities: ISharedBaseRepository<ICity>;
  users: ISharedBaseRepository<IUser>;

  searchTickets(options: ISearchTicketsOptions): Promise<IFoundTicket[]>;

  // buyTicket(buyInformation: ITicketBuyInformation): Promise<boolean>;
}

export { IAgentClient, IFoundTicket, ISearchTicketsOptions };
