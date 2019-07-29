import { BaseServerRepository } from '../types/base-repository';
import { IPassenger, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const passengersDB = createDB<IPassenger>(EEntityName.Passengers);

export class PassengersRepository extends BaseServerRepository<IPassenger> {
  protected db = passengersDB;
  public entityName = EEntityName.Passengers;
}
