import { BaseServerRepository } from '../types/base-repository';
import { ICity, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const citiesDB = createDB<ICity>(EEntityName.Cities);

export class CitiesRepository extends BaseServerRepository<ICity> {
  protected db = citiesDB;
  public entityName = EEntityName.Cities;
}
