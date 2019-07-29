import { BaseBrowserRepository } from '../types/base-repository';
import { IAgent, EEntityName } from '../../shared/types';

export class AirlinesRepository extends BaseBrowserRepository<IAgent> {
  public entityName = EEntityName.Airlines;
}
