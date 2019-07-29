import { BaseServerRepository } from '../types/base-repository';
import { IFareBase, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const fareBasesDB = createDB<IFareBase>(EEntityName.FareBases);

export class FareBasesRepository extends BaseServerRepository<IFareBase> {
  protected db = fareBasesDB;
  public entityName = EEntityName.FareBases;
}
