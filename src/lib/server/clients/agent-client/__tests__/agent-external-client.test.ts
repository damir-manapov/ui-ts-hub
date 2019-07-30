import { AgentClient as Client } from '../client';
import { ETicketType } from '../../../../shared/types';

const client = new Client();

test('Заполненный список билетов', async () => {
  // const t = async () => {
  // ### Изначальные условия

  // В таблицу cities добавляем города:
  // - Дубай (dub)
  // - Берлин (ber)

  const dubai = await client.cities.insert({
    name: 'Дубай',
    abbreviation: 'dub',
  });
  const berlin = await client.cities.insert({
    name: 'Берлин',
    abbreviation: 'ber',
  });

  // В таблицу airports добавляем аэропорты:
  // - Дубай, cityId:  dub (DXB)
  // - Берлин, cityId:  ber (BER)
  const dubaiAirport = await client.airports.insert({
    name: 'Дубай',
    cityId: dubai.id,
  });
  const berlinAirport = await client.airports.insert({
    name: 'Берлин',
    cityId: berlin.id,
  });

  // В таблицу airlines добавляем перевозчика:
  // - Delta (delta)
  const deltaAirlenes = await client.airlines.insert({ name: 'Delta' });

  // В таблицу flights добавляем рейсы:
  // - DXB → BER, 3 часа, delta, (flight1)
  // - DXB → BER, 3 часа, delta, (flight2)
  const flight1 = await client.flights.insert({
    departureAirportId: dubaiAirport.id,
    destinationAirportId: berlinAirport.id,
    duration: 180,
    airlineId: deltaAirlenes.id,
  });
  const flight2 = await client.flights.insert({
    departureAirportId: dubaiAirport.id,
    destinationAirportId: berlinAirport.id,
    duration: 180,
    airlineId: deltaAirlenes.id,
  });

  // В таблицу schedule добавляем строки:
  // - flight1, 2019.09.15 13:00
  // - flight2, 2019.09.15 22:00
  await client.schedule.insert({
    departureDate: new Date(2019, 8, 15, 13).toUTCString(),
    flightId: flight1.id,
  });
  await client.schedule.insert({
    departureDate: new Date(2019, 8, 15, 22).toUTCString(),
    flightId: flight2.id,
  });
  // 56

  // В таблицу classes добавляем строки:
  // - Economy (economy)
  const economyClass = await client.classes.insert({ name: 'Economy' });

  // В таблицу fare_basises добавляем строки:

  // economy, isPublic: true, price: 500,
  // amount: 30, flightId: flight1 (NRL09KS)

  // economy, isPublic: true, price: 400,
  // amount: 30, flightId: flight2 (NRL08LS)
  const NRL09KS = await client.fareBases.insert({
    classId: economyClass.id,
    isPublic: true,
    price: 500,
    amount: 30,
    flightId: flight1.id,
  });
  const NRL08LS = await client.fareBases.insert({
    classId: economyClass.id,
    isPublic: true,
    price: 400,
    amount: 30,
    flightId: flight2.id,
  });

  // ### Действие

  // Выполняем поиск билетов из Дубай (DXB) — Берлин (BER) на 2019.09.15
  const ticketList = await client.searchTickets({
    departureCityId: dubai.id,
    destinationCityId: berlin.id,
    departureDate: new Date(2019, 8, 15).toUTCString(),
  });

  // ### Ожидаемый результат
  const expected = [
    // Билет 1:
    // - class: economy
    // - Airline: Delta
    // - DepartureAirport: Дубай (DXB)
    // - destinationAirport: Берлин (BER)
    // - departureDate: 2019.09.15 22:00
    // - arrivalDate: 2019.09.16 1:00
    // - price: 400
    // - oldPrice: 400
    // - isSweet: true
    // - fareBasisId: NRL08LS
    {
      price: 400,
      oldPrice: 400,
      departureAirport: dubaiAirport,
      departureDate: new Date(2019, 8, 15, 22).toUTCString(),
      destinationAirport: berlinAirport,
      destinationDate: new Date(2019, 8, 16, 1).toUTCString(),
      type: ETicketType.Sweet,
      class: economyClass,
      fareBase: NRL08LS,
      airline: deltaAirlenes,
      duration: 180,
    },
    // Билет 2:
    // - class: economy
    // - Airline: Delta
    // - DepartureAirport: Дубай (DXB)
    // - destinationAirport: Берлин (BER)
    // - departureDate: 2019.09.15 22:00
    // - arrivalDate: 2019.09.16 1:00
    // - price: 440
    // - oldPrice: 440
    // - isSweet: false
    // - fareBasisId: NRL08LS
    {
      price: 440,
      oldPrice: 440,
      departureAirport: dubaiAirport,
      departureDate: new Date(2019, 8, 15, 22).toUTCString(),
      destinationAirport: berlinAirport,
      destinationDate: new Date(2019, 8, 16, 1).toUTCString(),
      type: ETicketType.GDS,
      class: economyClass,
      fareBase: NRL08LS,
      airline: deltaAirlenes,
      duration: 180,
    },
    // Билет 3:
    // - class: economy
    // - Airline: Delta
    // - DepartureAirport: Дубай (DXB)
    // - destinationAirport: Берлин (BER)
    // - departureDate: 2019.09.15 13:00
    // - arrivalDate: 2019.09.15 16:00
    // - price: 500
    // - oldPrice: 500
    // - isSweet: true
    // - fareBasisId: NRL09KS
    {
      price: 500,
      oldPrice: 500,
      departureAirport: dubaiAirport,
      departureDate: new Date(2019, 8, 15, 13).toUTCString(),
      destinationAirport: berlinAirport,
      destinationDate: new Date(2019, 8, 15, 16).toUTCString(),
      type: ETicketType.Sweet,
      class: economyClass,
      fareBase: NRL09KS,
      airline: deltaAirlenes,
      duration: 180,
    },
    // Билет 4:
    // - class: economy
    // - Airline: Delta
    // - DepartureAirport: Дубай (DXB)
    // - destinationAirport: Берлин (BER)
    // - departureDate: 2019.09.15 13:00
    // - arrivalDate: 2019.09.15 16:00
    // - price: 550
    // - oldPrice: 550
    // - isSweet: false
    // - fareBasisId: NRL09KS
    {
      price: 550,
      oldPrice: 550,
      departureAirport: dubaiAirport,
      departureDate: new Date(2019, 8, 15, 13).toUTCString(),
      destinationAirport: berlinAirport,
      destinationDate: new Date(2019, 8, 15, 16).toUTCString(),
      type: ETicketType.GDS,
      class: economyClass,
      fareBase: NRL09KS,
      airline: deltaAirlenes,
      duration: 180,
    },
  ];
  expect(ticketList).toHaveLength(4);
  expect(ticketList).toEqual(expected);
  123
});
