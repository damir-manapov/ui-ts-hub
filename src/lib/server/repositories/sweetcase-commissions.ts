import { BaseServerRepository } from '../types/base-repository';
import { ISweetcaseCommision, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

const entityName = EEntityName.SweetcaseCommissions;
const db = createDB<ISweetcaseCommision>(entityName);

class SweetcaseCommissionsRepository
  extends BaseServerRepository<ISweetcaseCommision> {
  protected db = db;
  public entityName = entityName;
}

export { db as sweetcaseCommissionsDB, SweetcaseCommissionsRepository };
