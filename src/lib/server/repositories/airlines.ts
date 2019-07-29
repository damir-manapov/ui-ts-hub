import { BaseServerRepository } from '../types/base-repository';
import { createDB } from '../utils/create-db';
import { IAirline, EEntityName } from '../../shared/types';

export const airlinesDB = createDB<IAirline>(EEntityName.Airlines);

export class AirlinesRepository extends BaseServerRepository<IAirline> {
  protected db = airlinesDB;
  public entityName = EEntityName.Airlines;
}
