// tslint:disable:max-line-length
import * as uuid from 'uuid';

import {
  IAgencyCommission,
  IAirline,
  IAirport,
  ICity,
  IClass,
  IFareBase, IFlight, ISchedule, ISweetcaseCommision, IUser,
} from '../lib/shared/types';

import * as dayjs from 'dayjs';

import { getRandomEntity, getRandomValueFromTo } from '../shared/utils/misc';

import { airportsDB } from '../lib/server/repositories/airports';
import { airlinesDB } from '../lib/server/repositories/airlines';
import { classesDB } from '../lib/server/repositories/classes';
import { fareBasesDB } from '../lib/server/repositories/fare-bases';
import { citiesDB } from '../lib/server/repositories/cities';
import { flightsDB } from '../lib/server/repositories/flights';
import { usersDB } from '../lib/server/repositories/users';
import { agenciesCommissionsDB } from '../lib/server/repositories/agencies-commissions';
import { sweetcaseCommissionsDB } from '../lib/server/repositories/sweetcase-commissions';
import { schedulesDB } from '../lib/server/repositories/schedule';

function extendDefaultEntity(name: string) {
  return {
    id: uuid(),
    name,
  };
}

function extendWithId<Entity extends {}>(entity: Entity) {
  return {
    id: uuid(),
    ...entity,
  };
}

async function mockDictionaries() {
  // Города и аэропорты
  const cities = [{
    name: 'Тюмень',
    abbreviation: 'TYU',
    airports: ['Рощино'],
  }, {
    name: 'Москва',
    abbreviation: 'MSC',
    airports: ['Домодедово', 'Шереметьево'],
  }].map(extendWithId);

  // Последней валидной комиссией будет 8%
  const agenciesCommissionsRows = [5, 8].map((percent, idx) => ({
    id: uuid(),
    percent,
    isActiveAfter: dayjs()
      .set('minute', 0)
      .set('hour', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .subtract(1, 'day')
      .add(idx, 'day')
      .toDate()
      .toUTCString(),
  }));
  await agenciesCommissionsDB.bulkDocs<IAgencyCommission>(agenciesCommissionsRows);

  // Последней валидной комиссией будет 3%
  const sweetCommissionsRows = [1, 3].map((percent, idx) => ({
    id: uuid(),
    percent,
    isActiveAfter: dayjs()
      .set('minute', 0)
      .set('hour', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .subtract(1, 'day')
      .add(idx, 'day')
      .toDate()
      .toUTCString(),
  }));
  await sweetcaseCommissionsDB.bulkDocs<ISweetcaseCommision>(sweetCommissionsRows);

  // Города
  const citiesRows = cities.map(({ airports: cityAirports, ...rest }) => rest);
  await citiesDB.bulkDocs<ICity>(citiesRows);

  // Аэропорты
  const airportsRows = cities.reduce<IAirport[]>((acc, city) => {
    acc.push(
      ...city.airports.map(airport => ({
        id: uuid(),
        name: airport,
        cityId: city.id,
      })),
    );

    return acc;
  }, []);
  await airportsDB.bulkDocs<IAirport>(airportsRows);

  // Авиалинии
  const airlinesRows = [
    'Ямальские Авиалинии', 'S7', 'Lufthansa', 'Аэрофлот', 'Dexter', 'Aurora',
  ].map(extendDefaultEntity);
  await airlinesDB.bulkDocs<IAirline>(airlinesRows);

  // Пользователи
  const usersRows = [{
    name: 'Дамир Манапов',
    tokens: 560,
  }, {
    name: 'Владислав Кибенко',
    tokens: 0,
  }].map(item => ({ ...item, id: uuid() }));
  await usersDB.bulkDocs<IUser>(usersRows);

  // Классы
  const classesRows = ['Business', 'Economy', 'Premium'].map(extendDefaultEntity);
  await classesDB.bulkDocs<IClass>(classesRows);

  return {
    airports: airportsRows,
    airlines: airlinesRows,
    classes: classesRows,
  };
}

async function mockDependentData(
  airports: IAirport[],
  airlines: IAirline[],
  classes: IClass[],
) {
  // Информация о полетах
  const flights = new Array(1000).fill(null).map(() => ({
    id: uuid(),
    departureAirportId: getRandomEntity(airports).id,
    destinationAirportId: getRandomEntity(airports).id,
    duration: getRandomValueFromTo(120, 360),
    airlineId: getRandomEntity(airlines).id,
  }));

  // Расписание полетов
  const schedule = flights.map((flight, idx) => ({
    id: uuid(),
    departureDate: dayjs()
      .set('minute', 0)
      .set('hour', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .subtract(1, 'day')
      .add(idx * 10, 'minute')
      .toDate()
      .toUTCString(),
    flightId: flight.id,
  }));
  const fareBases = flights.reduce((acc, flight) => {
    // Для каждого полета создаем по 2 экземпляра каждого класса с рандомными
    // ценами
    for (let i = 0; i < 2; i++) {
      acc.push(
        ...classes.map(classItem => ({
          id: uuid(),
          classId: classItem.id,
          isPublic: getRandomEntity([false, true]),
          price: getRandomValueFromTo(200, 1000),
          amount: getRandomValueFromTo(1, 10),
          flightId: flight.id,
        })),
      );
    }

    return acc;
  }, []);

  await fareBasesDB.bulkDocs<IFareBase>(fareBases);
  await flightsDB.bulkDocs<IFlight>(flights);
  await schedulesDB.bulkDocs<ISchedule>(schedule);
}

async function mockData() {
  const { classes, airlines, airports } = await mockDictionaries();
  await mockDependentData(airports, airlines, classes);
}

export { mockData };
