import { BaseServerRepository } from '../types/base-repository';
import { createDB } from '../utils/create-db';
import { IAgent, EEntityName } from '../../shared/types';

export const agentsDB = createDB<IAgent>(EEntityName.Agents);

export class AgentsRepository extends BaseServerRepository<IAgent> {
  protected db = agentsDB;
  public entityName = EEntityName.Agents;
}
