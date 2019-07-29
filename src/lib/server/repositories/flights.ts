import { BaseServerRepository } from '../types/base-repository';
import { IFlight, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const flightsDB = createDB<IFlight>(EEntityName.Flights);

export class FlightsRepository extends BaseServerRepository<IFlight> {
  protected db = flightsDB;
  public entityName = EEntityName.Flights;
}
