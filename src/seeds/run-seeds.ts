// import * as uuid from 'uuid';
// // import { accountsDB } from '../repositories/accounts';
// import { agentsDB } from '../repositories/agents';
// import { airlinesDB } from '../repositories/airlines';
// import { airportsDB } from '../repositories/airports';
// import { fareBasesDB } from '../repositories/fare-basises';
// import { flightsDB } from '../repositories/flights';
// import { passengersDB } from '../repositories/passengers';
// // import { personalTariffsDB } from '../repositories/personal-tariffs';
// // import { schedulesDB } from '../repositories/schedule';
// import { tariffsDB } from '../repositories/tariffs';
// import { ticketTransactionsDB } from '../repositories/ticket-transactions';
// import { ticketsDB } from '../repositories/tickets';
// import { transferTransactionsDB }
// from '../repositories/transfer-transactions';
//
// import {
//   EClass,
//   EFareBase, EPassengerType,
//   IAgent,
//   IAirline, IAirport,
//   IFareBase, IPassenger, ITariff, ITicket, ITicketTransaction,
// } from '../types';
//
// import {
//   getRandomEntity,
//   fillDatabase,
//   fetchEntities,
//   generateEntities,
// } from './utils';
//
// async function processAirports() {
//   await fillDatabase<IAirport>(airportsDB, [{
//     id: 'SVO',
//     name: 'Sheremetyevo International Airport',
//   }, {
//     id: 'TBS',
//     name: 'Tbilisi International Airport',
//   }, {
//     id: 'LIS',
//     name: 'Lisbon International Airport',
//   }, {
//     id: 'KBP',
//     name: 'Boryspil International Airport',
//   }, {
//     id: 'LCA',
//     name: 'Larnaka International Airport',
//   }, {
//     id: 'SYD',
//     name: 'Sydney International Airport',
//   }, {
//     id: 'AKL',
//     name: 'Auckland International Airport',
//   }, {
//     id: 'DMK',
//     name: 'Don Mueang International Airport',
//   }, {
//     id: 'LAX',
//     name: 'Los Angeles International Airport',
//   }]);
// }
//
// async function processTariffs() {
//   await fillDatabase<ITariff>(tariffsDB, [{
//     id: 'business',
//     price: 500,
//     public: true,
//   }, {
//     id: 'business discount',
//     price: 430,
//     public: false,
//   }, {
//     id: 'economy',
//     price: 200,
//     public: true,
//   }, {
//     id: 'economy plus',
//     price: 220,
//     public: true,
//   }, {
//     id: 'economy discount',
//     price: 175,
//     public: false,
//   }]);
// }
//
// async function processAirlines() {
//   await fillDatabase<IAirline>(airlinesDB, [{
//     id: '1',
//     name: 'American Airlines',
//   }, {
//     id: '2',
//     name: 'Turkish Airlines',
//   }, {
//     id: '3',
//     name: 'Dubai Airlines',
//   }]);
// }
//
// async function processAgents() {
//   await fillDatabase<IAgent>(agentsDB, [{
//     id: '1',
//     name: 'TEZ Tour',
//   }, {
//     id: '2',
//     name: 'Rest Pono',
//   }]);
// }
//
// async function processFareBases() {
//   await fillDatabase<IFareBase>(fareBasesDB, [{
//     id: EFareBase.L1OW,
//     class: EClass.Economy,
//     public: true,
//     price: 100,
//     amount: 5,
//   }, {
//     id: EFareBase.N1OW,
//     class: EClass.Economy,
//     public: true,
//     price: 120,
//     amount: 5,
//   }, {
//     id: EFareBase.Z1OW,
//     class: EClass.Economy,
//     public: true,
//     price: 140,
//     amount: 5,
//   }, {
//     id: EFareBase.B1OW,
//     class: EClass.Business,
//     public: true,
//     price: 200,
//     amount: 5,
//   }, {
//     id: EFareBase.M1OW,
//     class: EClass.Business,
//     public: true,
//     price: 220,
//     amount: 5,
//   }, {
//     id: EFareBase.C1OW,
//     class: EClass.Business,
//     public: true,
//     price: 240,
//     amount: 5,
//   }, {
//     id: EFareBase.L2OW,
//     class: EClass.Economy,
//     public: false,
//     price: 90,
//     amount: 5,
//   }, {
//     id: EFareBase.N2OW,
//     class: EClass.Economy,
//     public: false,
//     price: 110,
//     amount: 5,
//   }, {
//     id: EFareBase.Z2OW,
//     class: EClass.Economy,
//     public: false,
//     price: 130,
//     amount: 5,
//   }, {
//     id: EFareBase.B2OW,
//     class: EClass.Business,
//     public: false,
//     price: 190,
//     amount: 5,
//   }, {
//     id: EFareBase.M2OW,
//     class: EClass.Business,
//     public: false,
//     price: 210,
//     amount: 5,
//   }, {
//     id: EFareBase.C2OW,
//     class: EClass.Business,
//     public: false,
//     price: 230,
//     amount: 5,
//   }]);
// }
//
// async function processTicketTransactions() {
//   const airlines = await fetchEntities(airlinesDB);
//   const airports = await fetchEntities(airportsDB);
//   const agencies = await fetchEntities(agentsDB);
//
//   function generateTicketTransaction(): ITicketTransaction {
//     return {
//       id: uuid(),
//       airline: getRandomEntity(airlines).id,
//       agent: getRandomEntity(agencies).id,
//       passengerHash: uuid(),
//       price: Math.random() * 10000,
//       departure: getRandomEntity(airports).id,
//       destination: getRandomEntity(airports).id,
//       departureDate: new Date().toUTCString(),
//       signature: uuid(),
//       endorsements: [],
//       deletedAt: null,
//     };
//   }
//
//   await fillDatabase<ITicketTransaction>(
//     ticketTransactionsDB,
//     generateEntities<ITicketTransaction>(generateTicketTransaction, 5),
//   );
// }
//
// async function processTickets() {
//   const flights = await fetchEntities(flightsDB);
//   const fareBases = await fetchEntities(fareBasesDB);
//   const agencies = await fetchEntities(agentsDB);
//   const passengers = await fetchEntities(passengersDB);
//   const transactions = await fetchEntities(transferTransactionsDB);
//   let id = 0;
//
//   function generateTicket(): ITicket {
//     id++;
//
//     return {
//       id: id.toString(),
//       flight: getRandomEntity(flights).id,
//       departureDate: new Date().toString(),
//       fareBase: getRandomEntity(fareBases).id,
//       price: Math.random() * 10000,
//       passenger: getRandomEntity(passengers).id,
//       agency: getRandomEntity(agencies).id,
//       transactionId: getRandomEntity(transactions).id,
//       deletedAt: null,
//     };
//   }
//
//   await fillDatabase<ITicket>(
//     ticketsDB,
//     generateEntities<ITicket>(generateTicket, 5),
//   );
// }
//
// async function processPassengers() {
//   await fillDatabase<IPassenger>(
//     passengersDB,
//     [{
//       id: '1',
//       type: EPassengerType.International,
//       passportID: '921751299',
//       firstName: 'Morozov',
//       lastName: 'Pavel',
//       patronymic: 'Kudrjavcev',
//       birthDate: new Date().toUTCString(),
//       linkedPassengers: [],
//     }, {
//       id: '2',
//       type: EPassengerType.LocalRussian,
//       passportID: '4441223',
//       firstName: 'Proskova',
//       lastName: 'Nina',
//       patronymic: 'Vasilievna',
//       birthDate: new Date().toUTCString(),
//       linkedPassengers: [],
//     }, {
//       id: '3',
//       type: EPassengerType.LocalBelarus,
//       passportID: '5234123',
//       firstName: 'Kanonov',
//       lastName: 'Maxim',
//       patronymic: 'Anotonovich',
//       birthDate: new Date().toUTCString(),
//       linkedPassengers: [],
//     }],
//   );
// }
//
// async function processFlights() {
//   function generateFlight(from: string, to: string) {
//     return {
//       id: `${from} / ${to}`,
//       departure: from,
//       destination: to,
//     };
//   }
//
//   await fillDatabase(flightsDB, [{
//     ...generateFlight('SVO', 'TBS'),
//     duration: 120,
//   }, {
//     ...generateFlight('TBS', 'LIS'),
//     duration: 150,
//   }, {
//     ...generateFlight('KBP', 'LCA'),
//     duration: 70,
//   }]);
// }
//
// export async function runSeeds() {
//   // Сначала статичные справочники
//   await processAirports();
//   await processTariffs();
//   await processAirlines();
//   await processAgents();
//   await processFareBases();
//   await processPassengers();
//   await processFlights();
//
//   await processTicketTransactions();
//   await processTickets();
// }
