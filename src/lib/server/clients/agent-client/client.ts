import {
    ETicketType,
    IAgentClient,
    IFareBase,
    IFoundTicket,
    ISearchTicketsOptions,
} from '../../../shared/types';

import {
    calculateTicketPrice,
    filterAirportsByCityId,
    getAirports, getById,
    getFlights,
    getIds,
    getSchedules,
    getCommission,
    getFareBases,
} from './utils';

import * as dayjs from 'dayjs';

import { AirportsRepository } from '../../repositories/airports';
import { ClassesRepository } from '../../repositories/classes';
import { FareBasesRepository } from '../../repositories/fare-bases';
import { AirlinesRepository } from '../../repositories/airlines';
import { FlightsRepository } from '../../repositories/flights';
import { ScheduleRepository } from '../../repositories/schedule';
import { SweetcaseCommissionsRepository } from '../../repositories/sweetcase-commissions';
import { AgenciesCommissionsRepository } from '../../repositories/agencies-commissions';
import { CitiesRepository } from '../../repositories/cities';
import { UsersRepository } from '../../repositories/users';
import { PassengersRepository } from '../../repositories/passengers';
import { ClustersRepository } from '../../repositories/clusters';
import { PassengersClustersRepository } from '../../repositories/passengers-clusters';
import { PersonalTariffsRepository } from '../../repositories/personal-tariffs';

export class AgentClient implements IAgentClient {
    public airports = new AirportsRepository();
    public airlines = new AirlinesRepository();
    public agenciesCommissions = new AgenciesCommissionsRepository();
    public cities = new CitiesRepository();
    public classes = new ClassesRepository();
    public fareBases = new FareBasesRepository();
    public flights = new FlightsRepository();
    public schedule = new ScheduleRepository();
    public sweetcaseCommissions = new SweetcaseCommissionsRepository();
    public users = new UsersRepository();
    public passengers = new PassengersRepository();
    public clusters = new ClustersRepository();
    public passengersClusters = new PassengersClustersRepository();
    public personalTariffs = new PersonalTariffsRepository();


    /**
     * Производит поиск билетов.
     * @param options
     */
    public searchTickets = async (
        options: ISearchTicketsOptions,
    ): Promise<IFoundTicket[]> => {
        let { limit } = options;
        const {
            departureDate,
            departureCityId,
            destinationCityId,
        } = options;

        if (typeof limit !== 'number' || limit <= 0) {
            limit = 20;
        }

        // В первую очередь получаем список полетов, которые выполняются в эту дату
        // чтобы минимизировать поисковую нагрузкую
        const schedule = await getSchedules(this.schedule, departureDate);

        // Если такие полеты не найдены, нет смысла осуществлять дальнейшие
        // манипуляции.
        if (schedule.length === 0) {
            return [];
        }
        let flightsIds = schedule.map(item => item.flightId);

        // Получаем список аэропортов для городов отправления и назначения
        const airports = await getAirports(
            this.airports,
            [departureCityId, destinationCityId],
        );
        const departureAirportsIds = getIds(
            filterAirportsByCityId(airports, departureCityId),
        );
        const destinationAirportsIds = getIds(
            filterAirportsByCityId(airports, destinationCityId),
        );

        // Сюда попадают полеты, отфильтрованные по дате вылета, а так же городам
        const flights = await getFlights(
            this.flights,
            flightsIds,
            departureAirportsIds,
            destinationAirportsIds,
        );
        // Обновляем массив полетов
        flightsIds = getIds(flights);

        const [
            agenciesCommissions,
            airlines,
            classes,
            sweetcaseCommissions,
        ] = await Promise.all([
            this.agenciesCommissions.getList(),
            this.airlines.getList(),
            this.classes.getList(),
            this.sweetcaseCommissions.getList(),
        ]);

        // Находим комиссии агенств и Sweetcase.
        const agencyCommission = getCommission(agenciesCommissions);
        const sweetCommission = getCommission(sweetcaseCommissions);
        const formattedAgencyCommission = (1 + agencyCommission.percent / 100);
        const formattedSweetCommission = (1 + sweetCommission.percent / 100);

        // Находим подходящие базисы
        const fareBases = await getFareBases(this.fareBases, flightsIds);

        // Формируем список билетов исходя из базисов
        const tickets = flights.reduce<IFoundTicket[]>((accFlights, flight) => {
            // Необходимо найти для каждого полета все его базисы. Должно быть так
            // что для каждого полета должно быть не более 1 базиса на 1 класс полета.
            // Каждый базис должен быть самым дешевым для комбинации полет - класс.
            const flightFareBases = fareBases.reduce<IFareBase[]>(
                (accFlightFareBases, fareBasis) => {
                    // Проверяем, соответствует ли базис этому полету
                    if (fareBasis.flightId === flight.id) {
                        // Находим, был ли раньше этот базис добавлен в аккумулятор
                        const foundFareBasis = accFlightFareBases.find(item => {
                            return item.classId === fareBasis.classId;
                        });

                        // Если он был добавлен и его цена больше текущего, то удаляем
                        // его из очереди и добавляем текущий.
                        if (foundFareBasis) {
                            if (foundFareBasis.price > fareBasis.price) {
                                accFlightFareBases.splice(
                                    accFlightFareBases.indexOf(foundFareBasis),
                                    1,
                                    fareBasis,
                                );
                            }
                        } else {
                            // Если он найден не был, то просто добавляем.
                            accFlightFareBases.push(fareBasis);
                        }
                    }

                    return accFlightFareBases;
                },
                [],
            );
            const departureAirport = airports
                .find(getById(flight.departureAirportId));
            const destinationAirport = airports
                .find(getById(flight.destinationAirportId));
            const airline = airlines.find(getById(flight.airlineId));
            const flightSchedule = schedule.find(item => item.flightId === flight.id);

            // После того, как все базисы для текущего полета найдены, необходимо
            // для каждого из них сгенерировать запись, будто бы один базис - один
            // полет. Ставим пометку о том, что этот полет создан нашим проектом.
            const sweetCaseFlights = flightFareBases.map<IFoundTicket>(fb => {
                const price = calculateTicketPrice(
                    fb.price,
                    formattedAgencyCommission,
                    formattedSweetCommission,
                );

                return {
                    price,
                    oldPrice: price,
                    departureAirport,
                    departureDate: flightSchedule.departureDate,
                    destinationAirport,
                    destinationDate: dayjs(flightSchedule.departureDate)
                        .add(flight.duration, 'minute')
                        .toDate()
                        .toUTCString(),
                    type: ETicketType.Sweet,
                    class: classes.find(getById(fb.classId)),
                    fareBase: fb,
                    airline,
                    duration: flight.duration,
                };
            });

            // Расчитываем билеты НЕ из нашего сервиса. Добавляем к ценникам по 10%
            const duplicateFlights = sweetCaseFlights.map(item => ({
                ...item,
                type: ETicketType.GDS,
                price: Math.floor(item.price * 1.1),
                oldPrice: Math.floor(item.oldPrice * 1.1),
            }));

            accFlights.push(
                ...sweetCaseFlights,
                ...duplicateFlights,
            );

            return accFlights;
        }, []);

        // Сортируем билеты по возрастанию цены.
        return tickets.sort((a, b) => a.price - b.price).slice(0, limit);
    };


    /**
     * Производит поиск билетов.
     * @param userId
     * @param options
     */
    public searchTicketsForUser = async (
        userId: string,
        options: ISearchTicketsOptions,
    ): Promise<IFoundTicket[]> => {
        console.log(userId, options)
        return []
    };

    // /**
    //  * Осуществляет покупку билета.
    //  * @param buyInformation
    //  */
    // public buyTicket = async (
    //   buyInformation: ITicketBuyInformation,
    // ): Promise<boolean> => {
    //
    // };
    //
    // /**
    //  * Возвращает информацию о проданных билетах.
    //  */
    // public getStatistics = async (): Promise<IGetStatisticsResult> => {
    //   return {} as IGetStatisticsResult;
    // };
}
