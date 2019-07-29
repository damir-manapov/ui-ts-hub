import { BaseBrowserRepository } from '../types/base-repository';
import { IAgent, EEntityName } from '../../shared/types';

export class AgentsRepository extends BaseBrowserRepository<IAgent> {
  public entityName = EEntityName.Agents;
}
