import { BaseServerRepository } from '../types/base-repository';
import { IPersonalTariff, EEntityName } from '../../shared/types';
import { createDB } from '../utils/create-db';

export const personalTariffsDB = createDB<IPersonalTariff>(
  EEntityName.PersonalTariffs,
);

export class PersonalTariffsRepository
  extends BaseServerRepository<IPersonalTariff> {
  protected db = personalTariffsDB;
  public entityName = EEntityName.PersonalTariffs;
}
