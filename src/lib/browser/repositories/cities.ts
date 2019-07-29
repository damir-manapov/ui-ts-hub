import { BaseBrowserRepository } from '../types/base-repository';
import { ICity, EEntityName } from '../../shared/types';

export class CitiesRepository extends BaseBrowserRepository<ICity> {
  public entityName = EEntityName.Cities;
}
