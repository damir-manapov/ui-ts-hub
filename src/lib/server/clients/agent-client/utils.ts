import {
  IAgencyCommission,
  IAirport,
  IBaseSchema, IFareBase,
  IFlight,
  ISchedule, ISweetcaseCommision,
} from '../../../shared/types';

import * as dayjs from 'dayjs';

import { ScheduleRepository } from '../../repositories/schedule';
import { FlightsRepository } from '../../repositories/flights';
import { AirportsRepository } from '../../repositories/airports';
import { FareBasesRepository } from '../../repositories/fare-bases';

export function getIds(array: IBaseSchema[]): Array<IBaseSchema['id']> {
  return array.map(({ id }) => id);
}

/**
 * Возвращает сущность по ID.
 * @param {Entity[]} entities
 * @param {string} id
 * @returns {Entity}
 */
export function getById<Entity extends IBaseSchema>(id: string) {
  return (item: Entity) => {
    return item.id === id;
  };
}

/**
 * Получает подходящие по дате отправления идентификаторы полетов.
 * @param {ScheduleRepository} repo
 * @param {string} departureDate
 * @returns {Promise<ISchedule[]>}
 */
export async function getSchedules(
  repo: ScheduleRepository,
  departureDate: string,
): Promise<ISchedule[]> {
  // FIXME: Этот костыль нужен для нормальной работы с PouchDB.
  const from = dayjs(departureDate)
    .set('millisecond', 0)
    .set('second', 0)
    .set('minute', 0)
    .set('hour', 0);
  const range: string[] = [];

  for (let i = 0; i < 24 * 60; i++) {
    range.push(dayjs(from).add(i, 'minute').toDate().toUTCString());
  }

  return repo.getList({
    filter: {
      departureDate: {
        $in: range,
      },
    },
  });
}

/**
 * Получает список полетов по их идентификаторам, идентификаторам аэропорта
 * назначения и отправления.
 * @param {FlightsRepository} repo
 * @param flightsIds
 * @param departureAirportIds
 * @param destinationAirportIds
 * @returns {Promise<IFlight[]>}
 */
export async function getFlights(
  repo: FlightsRepository,
  flightsIds: string[],
  departureAirportIds: string[],
  destinationAirportIds: string[],
): Promise<IFlight[]> {
  return repo.getList({
    filter: {
      id: {
        $in: flightsIds,
      },
      departureAirportId: {
        $in: departureAirportIds,
      },
      destinationAirportId: {
        $in: destinationAirportIds,
      },
    },
  });
}

/**
 * Получает базисы исходя из идентификаторов полетов
 * @param {FareBasesRepository} fareBasesRepository
 * @param {string[]} flightsIds
 * @returns {Promise<Array<TWithPouchMeta<IFareBase>>>}
 */
export async function getFareBases(
  fareBasesRepository: FareBasesRepository,
  flightsIds: string[],
): Promise<IFareBase[]> {
  return fareBasesRepository.getList({
    filter: {
      isPublic: true,
      flightId: {
        $in: flightsIds,
      },
    },
  });
}

/**
 * Вычисляет комиссию
 * @param {IAgencyCommission[] | ISweetcaseCommision[]} commissions
 * @returns {IAgencyCommission}
 */
export function getCommission(
  commissions: IAgencyCommission[] | ISweetcaseCommision[],
): IAgencyCommission {
  const now = new Date();
  const defaultResult = {
    id: null,
    percent: 0,
    isActiveAfter: '01-01-1980',
  };

  if (commissions.length === 0) {
    return defaultResult;
  }

  return commissions.reduce((acc, commission) => {
    const commissionDate = new Date(commission.isActiveAfter);
    const accDate = new Date(acc.isActiveAfter);

    // Если дата этой коммиссии больше, но при этом она меньше текущей даты,
    // то возвращаем её
    if (accDate < commissionDate && commissionDate < now) {
      return commission;
    }

    return acc;
  }, defaultResult);
}

/**
 * Получает список аэропортов по идентификаторам городов
 * @param {AirportsRepository} repo
 * @param {string[]} cityIds
 * @returns {Promise<IAirport[]>}
 */
export async function getAirports(
  repo: AirportsRepository,
  cityIds: string[],
): Promise<IAirport[]> {
  return repo.getList({
    filter: {
      cityId: {
        $in: cityIds,
      },
    },
  });
}

/**
 * Фильтрует аэропорты по идентификатору города
 * @param {IAirport[]} airports
 * @param {string} cityId
 * @returns {IAirport[]}
 */
export function filterAirportsByCityId(
  airports: IAirport[],
  cityId: string,
) {
  return airports.filter(item => item.cityId === cityId);
}

/**
 * Вычисляет цену билета
 * @param {number} price
 * @param {number} agencyCommission
 * @param {number} sweetcaseCommission
 * @returns {number}
 */
export function calculateTicketPrice(
  price: number,
  agencyCommission: number,
  sweetcaseCommission: number,
): number {
  return Math.floor(price * agencyCommission * sweetcaseCommission);
}
