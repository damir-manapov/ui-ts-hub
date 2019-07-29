import { BaseBrowserRepository } from '../types/base-repository';
import { IFareBase, EEntityName } from '../../shared/types';

export class FareBasesRepository extends BaseBrowserRepository<IFareBase> {
  public entityName = EEntityName.FareBases;
}
