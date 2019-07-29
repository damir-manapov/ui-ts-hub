import { BaseBrowserRepository } from '../types/base-repository';
import { IPersonalTariff, EEntityName } from '../../shared/types';

export class PersonalTariffsRepository
  extends BaseBrowserRepository<IPersonalTariff> {
  public entityName = EEntityName.PersonalTariffs;
}
