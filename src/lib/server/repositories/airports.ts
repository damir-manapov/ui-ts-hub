import { BaseServerRepository } from '../types/base-repository';
import { IAirport, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const airportsDB = createDB<IAirport>(EEntityName.Airports);

export class AirportsRepository extends BaseServerRepository<IAirport> {
  protected db = airportsDB;
  public entityName = EEntityName.Airports;
}
