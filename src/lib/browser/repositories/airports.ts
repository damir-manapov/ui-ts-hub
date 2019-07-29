import { BaseBrowserRepository } from '../types/base-repository';
import { IAgent, EEntityName } from '../../shared/types';

export class AirportsRepository extends BaseBrowserRepository<IAgent> {
  public entityName = EEntityName.Airports;
}
