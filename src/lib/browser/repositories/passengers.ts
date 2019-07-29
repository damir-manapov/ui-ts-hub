import { BaseBrowserRepository } from '../types/base-repository';
import { IPassenger, EEntityName } from '../../shared/types';

export class PassengersRepository extends BaseBrowserRepository<IPassenger> {
  public entityName = EEntityName.Passengers;
}
