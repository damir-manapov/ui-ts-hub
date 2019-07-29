import { BaseBrowserRepository } from '../types/base-repository';
import { IFlight, EEntityName } from '../../shared/types';

export class FlightsRepository extends BaseBrowserRepository<IFlight> {
  public entityName = EEntityName.Flights;
}
