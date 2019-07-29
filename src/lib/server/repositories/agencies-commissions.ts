import { BaseServerRepository } from '../types/base-repository';
import { IAgencyCommission, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

const entityName = EEntityName.AgenciesCommissions;
const db = createDB<IAgencyCommission>(entityName);

class AgenciesCommissionsRepository
  extends BaseServerRepository<IAgencyCommission> {
  protected db = db;
  public entityName = entityName;
}

export { db as agenciesCommissionsDB, AgenciesCommissionsRepository };
