import { IBaseSchema } from './base-schema';

export enum EPassengerType {
  International = 'international',
  LocalRussian = 'local_russian',
  LocalBelarus = 'local_belarus',
}

export enum ETicketType {
  GDS = 'GDS',
  Sweet = 'Sweet',
}

export enum EPaymentMethod {
  Card = 'card',
  Cash = 'cash',
  Split = 'split',
}

/**
 * Агенство
 */
export interface IAgent extends IBaseSchema {
  name: string;
}

/**
 * Аэропорт
 */
export interface IAirport extends IBaseSchema {
  name: string;
  cityId: ICity['id'];
}

/**
 * Аккаунт
 */
export interface IAccount extends IBaseSchema {
  memo: string;
}

/**
 * Авиалиния
 */
export interface IAirline extends IBaseSchema {
  name: string;
}

/**
 * Класс
 */
export interface IClass extends IBaseSchema {
  name: string;
}

/**
 *
 */
export interface IFareBase extends IBaseSchema {
  classId: IClass['id'];
  flightId: IFlight['id'];
  isPublic: boolean;
  price: number;
  amount: number;
}

/**
 * Полет
 */
export interface IFlight extends IBaseSchema {
  departureAirportId: IAirport['id'];
  destinationAirportId: IAirport['id'];
  duration: number;
  airlineId: IAirline['id'];
}

/**
 * Пассажир
 */
export interface IPassenger extends IBaseSchema {
  type: EPassengerType;
  passportID: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
  userId: string;
}

/**
 * Персональный тариф
 */
export interface IPersonalTariff extends IBaseSchema {
  clusterId: ICluster['id'];
  fareBaseId: IFareBase['id'];
}

export interface ICluster extends IBaseSchema {
  name: string;
}

export interface IPassengersCluster extends IBaseSchema {
  passengerId: IPassenger['id'];
  clusterId: ICluster['id'];
}

export interface ISchedule extends IBaseSchema {
  departureDate: string;
  flightId: IFlight['id'];
}

export interface ICity extends IBaseSchema {
  name: string;
  abbreviation: string;
}

export interface ISweetcaseCommision extends IBaseSchema {
  percent: number;
  isActiveAfter: string;
}

export interface IAgencyCommission extends IBaseSchema {
  percent: number;
  isActiveAfter: string;
}

/**
 * Транзакции билетов
 */
export interface ITicketTransaction extends IBaseSchema {
  airlineId: IAirline['id'];
  agencyId: IAgent['id'];
  price: number;
  departureAirportId: IAirport['id'];
  destinationAirportId: IAirport['id'];
  departureDate: string;
  signature: string;
}

/**
 *
 */
export interface ITransferTransaction extends IBaseSchema {
  fromAccountId: IAccount['id'];
  toAccountId: IAccount['id'];
  amount: number;
  signature: string;
}

/**
 * Билет
 */
export interface ITicket extends IBaseSchema {
  flightId: IFlight['id'];
  departureDate: string;
  fareBaseId: IFareBase['id'];
  price: number;
  passengerId: IPassenger['id'];
  agencyId: IAgent['id'];
  ticketTransactionId: ITicketTransaction['id'];
}

/**
 * Пользователь
 */
export interface IUser extends IBaseSchema {
  tokens: number;
  name: string;
}
